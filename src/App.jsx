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
  let [activeMap, setactiveMap] = useState('Vlaanderen 1970');

  useEffect(() => {
    initMap(activeMap);
  }, []);

  useEffect(() => {
    resetMap(activeMap);
  }, [activeMap]);

  return <>
    <div style={{width:"100vw", height:"100vh", overflow: "hidden"}} className="App">
      <div className="header" style={{'margin': 1}} >
        <label style={{paddingLeft: 5}} htmlFor="layerselect">Foto: </label> 
        <select id="layerselect" defaultValue={activeMap}
                  onChange={e => {
                    setactiveMap(e.target.value);
                    setmodalOpen(true);
                  } } >
          <option value="Vlaanderen 1970">Vlaanderen 1970</option>
          <option value="Gent 1955">Gent 1955</option>
          <option value="Antwerpen 1940-1945">Antwerpen 1940-1945</option>
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
      <p><i>{ layerList[activeMap]["description"] }</i></p>
      <a target="_blank" href={ layerList[activeMap]["url"] }>Meer info</a>
      <center>
        <button style={{'color': 'whitesmoke'}}
                onClick={() => setmodalOpen(false)}>Sluiten</button></center> 
    </Modal> 
  </>
}
