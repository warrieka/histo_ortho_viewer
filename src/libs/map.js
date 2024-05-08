import Map from 'ol/Map';
import View from 'ol/View';
import ScaleLine from 'ol/control/ScaleLine';
import {getRenderPixel} from 'ol/render.js';
import GLTileLayer from 'ol/layer/WebGLTile';
import TileLayer from 'ol/layer/Tile';
import layerList from "./sources";

const Origaerial = new TileLayer({
  title:'Originele zwartwitte luchtfoto',
});
const AIaerial = new GLTileLayer({
  title: 'Met AI ingekleurde en gerestaureerde orthofoto', 
});

const basemap = new TileLayer({zIndex: -99});

const olmap = new Map({
  layers: [Origaerial, AIaerial, basemap ],
  view: new View({
    center: [415515 , 6629926], //[487549.1, 6657367.9],
    zoom: 12,
    maxZoom: 19,
  }),
});

export function initMap(activeMap){
    let target = document.getElementById("olmap");
    let swipe = document.getElementById('swipe');
    olmap.setTarget(target);
    resetMap(activeMap)

    Origaerial.on('prerender', function (event) {
      const ctx = event.context;
      const mapSize = olmap.getSize();
      const width = mapSize[0] * (swipe.value / 100);
      const tl = getRenderPixel(event, [width, 0]);
      const tr = getRenderPixel(event, [mapSize[0], 0]);
      const bl = getRenderPixel(event, [width, mapSize[1]]);
      const br = getRenderPixel(event, mapSize);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tl[0], tl[1]);
      ctx.lineTo(bl[0], bl[1]);
      ctx.lineTo(br[0], br[1]);
      ctx.lineTo(tr[0], tr[1]);
      ctx.closePath();
      ctx.clip();
    });

    Origaerial.on('postrender', function (event) {
      const ctx = event.context;
      ctx.restore();
    });
    
    swipe.addEventListener('input', function () {
      olmap.render();
    });

    let scaleBar = new ScaleLine({bar: true})
    olmap.addControl(scaleBar);
    return olmap;
}

export const toggleBasemap = function() {
    let onoff = !basemap.getVisible()
    basemap.setVisible(onoff);
    return onoff;
}

export function resetMap(activeMap){
    let new_view = new View({
      center: layerList[activeMap]["xy"],
      zoom: layerList[activeMap]["zoom"],
      maxZoom: layerList[activeMap]["maxzoom"]
    })
    Origaerial.setSource(  layerList[activeMap].source_grey );
    AIaerial.setSource(  layerList[activeMap].source_rbg ); 
    basemap.setSource( layerList[activeMap].basemap);

    olmap.setLayers([AIaerial, Origaerial ]);
    if (layerList[activeMap].basemap !== null){
      olmap.addLayer(basemap);
    }
    olmap.setView(new_view);
} 
