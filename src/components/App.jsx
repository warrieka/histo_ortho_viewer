import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Switch, Tooltip  } from 'antd';

import {initMap, resetMap, toggleBasemap} from '../libs/map'
import layerList from "../libs/sources";
import { BsArrowsCollapseVertical, BsArrowsExpandVertical, BsEnvelope, BsGithub  } from "react-icons/bs";
import { SiJupyter } from "react-icons/si";

import InfoWindow from './infoWindow'

//#css
import './App.css'
import 'ol/ol.css';

const urlParams = new URLSearchParams(window.location.search);
const hideBanner =urlParams.get('hidebanner') === "1"
const collapsed = urlParams.get('collapsed') === "1"

export default function App() {
  let layerNames = Object.keys(layerList);
  let [basemapOn, setbaseMap] =  useState( true );
  let [activeMap, setactiveMap] = useState( layerNames[1] );
  let [collapsedSide, setCollapsedSide] = useState(collapsed);
  let [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    initMap(activeMap);
  }, []);

  useEffect(() => {
    resetMap(activeMap);
  }, [activeMap]);

  let menuItems = layerNames.map( (e) => {
    let layer = layerList[e];
    return {key: e, 
            icon: <span >{layer.year}</span>,
            label: layer.shortname, 
            title:layer.title}} )

  let { Header, Content, Sider } = Layout;

  return (
  <Layout style={{ minHeight: '100vh' }}>
    <InfoWindow activemap={activeMap} open={openModal} setOpen={() => setOpenModal(false)} />

    { !hideBanner ?
    <div style={{"position":"absolute", "top": 0, "right": 0, "zIndex": 99, 
                 "textAlign":'end', "width": 200, "height": 30, 'padding':5 }}>
        <Tooltip title="In deze Jupyter notebook beschrijf ik hoe je zo'n colorisatie model kan trainen." >
          <a target="_blank" style={{"textShadow":"0px 0px 2px #fff"}}  href="./explanation.html"><SiJupyter/> Notebook</a><br/>
        </Tooltip>
        <Tooltip title="Bekijk de code van deze viewer op Github" >
          <a target="_blank" href="https://github.com/warrieka/histo_ortho_viewer"><BsGithub/> Github</a>
        </Tooltip>
      
    </div> : null }

    <Header style={{ height: hideBanner? '0px':'60px', backgroundImage:"url(./logo.svg)",  backgroundSize: "100% 100%" }} >
        
        <div id="appTitle" > 
          <h3>Zwart-Witte luchtfoto's inkleuren met AI</h3>
        </div>

    </Header>


    <Layout>
    <Sider trigger={null} collapsible collapsed={collapsedSide}>
        
    <div className="menuButtons">
            <Button className="menuHideShowButton"  
              type="primary"  
              icon={collapsedSide? 
                <BsArrowsExpandVertical size={20} />: 
                <BsArrowsCollapseVertical size={20} />}
              onClick={() => setCollapsedSide(!collapsedSide) }
            >
            </Button>
     </div>
        
        <Menu
          theme="dark"
          mode="inline"
          onClick={e => setactiveMap(e.key) & setOpenModal(true) } 
          defaultSelectedKeys={[activeMap]}
          items={ menuItems }
        >
        </Menu>

        <div id="bottombuttons" style={{}}  > 
          <Tooltip placement="left" title={collapsedSide? 'Achtergrond kaart aan/uit': null} >
            <Switch id="basemapSwitch" onClick={e => setbaseMap( toggleBasemap(e)) } value={basemapOn} ></Switch>
          </Tooltip>
          <label htmlFor="basemapSwitch" style={{ marginLeft: 4, color:"whitesmoke"}}
            >{collapsedSide? '': 'Achtergrond aan/uit'}</label> 
            <Button icon={<BsEnvelope/>} style={{paddingLeft:2, paddingTop:5}} 
                    type="link" href="mailto:kaywarrie@gmail.com">mail</Button><br/>
        </div>
      </Sider>

      <Content style={{position: 'relative'}}>
        <div className="mapContainer">
          <input id="swipe" type="range" />
          <span id="infoLeft">Ingekleurd met AI</span>
          <span id="infoRight">Originele Orthofoto</span>
          <div id="olmap" />
        </div>
      </Content> 
      </Layout>
  </Layout>)
}
