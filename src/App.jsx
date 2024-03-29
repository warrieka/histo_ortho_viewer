import React, { useState, useEffect } from "react";
import { Modal } from 'react-responsive-modal';
import {initMap, resetMap} from './map'
import layerList from "./sources";
import { FaGithub } from "react-icons/fa";

//#css
import './App.css'
import 'ol/ol.css';
import 'react-responsive-modal/styles.css';

export default function App() {
  let [modalOpen, setmodalOpen] = useState(true);
  let [activeMap, setactiveMap] = useState( "Antwerpen 1940-1945" );

  useEffect(() => {
    initMap(activeMap);
  }, []);

  useEffect(() => {
    resetMap(activeMap);
  }, [activeMap]);

  let layerNames = Object.keys(layerList);
  let layerOptions = layerNames.map(e => 
    <option key={e} value={e}>{e}</option>
  )
  
  return <>
    <div style={{width:"100vw", height:"100vh", overflow: "hidden"}} className="App">
      <div className="header" style={{'margin': 1}} >
        <label style={{paddingLeft: 5}} htmlFor="layerselect">Foto: </label> 
        <select id="layerselect" defaultValue={activeMap}
                  onChange={e => {
                    console.log(e.target.value);
                    setactiveMap(e.target.value);
                    setmodalOpen(true);
                  } } >
          { layerOptions } 
        </select>
        <span style={{paddingLeft:15, display: 'inline-block'}}>
          Zwart-Witte luchtfoto's inkleuren met AI</span>
      <a target="_blank" href="https://github.com/warrieka/histo_ortho_viewer" >
          <FaGithub title="Github"
              style={{"right": 2, "position": 'absolute' }} /></a> 
      </div>
      <input id="swipe" type="range" />
      <div className="mapContainer">
        <span id="infoLeft">Ingekleurd met AI</span>
        <span id="infoRight">Originele Orthofoto</span>
        <div id="olmap" />
      </div>
    </div> 

    <Modal center open={modalOpen} 
           onClose={() => setmodalOpen(false)} 
      >
      <h2>{ layerList[activeMap]["title"] }</h2>
      <p><b>{ layerList[activeMap]["about"] }</b></p>
      <b>Bron:</b>
      <p><i>{ layerList[activeMap]["description"] }</i> </p>

      <center>
        <p><a target="_blank" href={ layerList[activeMap]["url"] }>Meer info over deze bron</a></p>
        <button style={{'color': '#777'}}
                  onClick={() => setmodalOpen(false)}>Sluiten</button>
      </center> 
    </Modal> 
  </>
}
