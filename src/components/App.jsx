import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from 'antd';
import logo from '../assets/logo.svg'

import {initMap, resetMap, toggleBasemap} from '../libs/map'
import layerList from "../libs/sources";
import { BsArrowsCollapseVertical, BsArrowsExpandVertical, BsMap   } from "react-icons/bs";

import InfoWindow from './infoWindow'

//#css
import './App.css'
import 'ol/ol.css';

const urlParams = new URLSearchParams(window.location.search);
const hideBanner = urlParams.get('hidebanner') != null && urlParams.get('hidebanner') === "1"

export default function App() {
  let layerNames = Object.keys(layerList);
  let [activeMap, setactiveMap] = useState( layerNames[1] );
  let [collapsedSide, setCollapsedSide] = useState(false);
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
            icon: <span >{layer.year}</span> ,
            label: layer.shortname, 
            title:layer.title}} )

  let { Header, Content, Sider } = Layout;

  return (
  <Layout style={{ minHeight: '100vh' }}>
    <InfoWindow activemap={activeMap} open={openModal} setOpen={() => setOpenModal(false)} />
    <Header style={{ padding: 0, height: hideBanner? '0px':'60px', width:'100vw', backgroundImage: `url(${logo})`, backgroundSize: '100% 100%' }} >
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

        <div><Button style={{bottom: 0, position: 'absolute', alignItems: 'center'}}
            className="menuHideShowButton" type="primary"
            icon={<BsMap  />} 
            
            onClick={() => toggleBasemap() } >
            {collapsedSide? '': 'Achtergrond aan/uit'}
        </Button></div>
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
