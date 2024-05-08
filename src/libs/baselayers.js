import XYZ from 'ol/source/XYZ';
import {get as getProjection} from 'ol/proj';
import RasterSource from 'ol/source/Raster.js';

const webMercator = getProjection('EPSG:3857');

// HISTORISCHE KAARTEN 
let ngi1939 =	new XYZ({
    url: "https://wmts.ngi.be/arcgis/rest/services/seamless_carto__default__3857__800/MapServer/tile/{z}/{y}/{x}",
    minZoom: 7 , maxZoom: 17, 
    projection: webMercator,   crossOrigin: 'anonymous',
    attributions: ["NGI: <a href='https://www.ngi.be/website/gebruiksvoorwaarden-cartoweb-be'>gebruiksvoorwaarden</a>"]
});
let ngi1969= new XYZ({
//info: https://wmts.ngi.be/arcgis/rest/services/seamless_carto__default__3857__1300/MapServer  
    url: "https://wmts.ngi.be/arcgis/rest/services/seamless_carto__default__3857__1100/MapServer/tile/{z}/{y}/{x}",
    minZoom: 7 , maxZoom: 17, 
    projection: webMercator, crossOrigin: 'anonymous',
    attributions: ["NGI: <a href='https://www.ngi.be/website/gebruiksvoorwaarden-cartoweb-be'>gebruiksvoorwaarden</a>"]
});
let ngi1981 =	new XYZ({
//info: https://wmts.ngi.be/arcgis/rest/services/seamless_carto__default__3857__1300/MapServer
    url: "https://wmts.ngi.be/arcgis/rest/services/seamless_carto__default__3857__1220/MapServer/tile/{z}/{y}/{x}",
    minZoom: 7 , maxZoom: 17, 
    projection: webMercator, crossOrigin: 'anonymous',
    attributions: ["NGI: <a href='https://www.ngi.be/website/gebruiksvoorwaarden-cartoweb-be'>gebruiksvoorwaarden</a>"]
});
let ngi1989= new XYZ({
//info: https://wmts.ngi.be/arcgis/rest/services/seamless_carto__default__3857__1300/MapServer
    url: "https://wmts.ngi.be/arcgis/rest/services/seamless_carto__default__3857__1300/MapServer/tile/{z}/{y}/{x}",
    minZoom: 7 , maxZoom: 17, 
    projection: webMercator,  crossOrigin: 'anonymous',
    attributions: ["NGI: <a href='https://www.ngi.be/website/gebruiksvoorwaarden-cartoweb-be'>gebruiksvoorwaarden</a>"]
});

let ngi1994= new XYZ({
//info: https://wmts.ngi.be/arcgis/rest/services/seamless_carto__default__3857__1350/MapServer
    url: "https://wmts.ngi.be/arcgis/rest/services/seamless_carto__default__3857__1350/MapServer/tile/{z}/{y}/{x}",
    minZoom: 7 , maxZoom: 17, 
    projection: webMercator,  crossOrigin: 'anonymous',
    attributions: ["NGI: <a href='https://www.ngi.be/website/gebruiksvoorwaarden-cartoweb-be'>gebruiksvoorwaarden</a>"]
});

let nginow = new XYZ({
    //info: https://cartoweb.wmts.ngi.be/1.0.0/WMTSCapabilities.xml
      url: "https://cartoweb.wmts.ngi.be/1.0.0/topo/default/3857/{z}/{y}/{x}.png",
      minZoom: 7 , maxZoom: 17, 
      projection: webMercator,  crossOrigin: 'anonymous',
      attributions: ["NGI: <a href='https://www.ngi.be/website/gebruiksvoorwaarden-cartoweb-be'>gebruiksvoorwaarden</a>"]
  });
  
export const baselayers = [
    {id:"ngi1939", source: ngi1939, name: "NGI Basiskaart, 1939", label: '1939'},
    {id:"ngi1969", source: ngi1969, name: "NGI Basiskaart, 1969", label: '1969'},
    {id:"ngi1981", source: ngi1981, name: "NGI Basiskaart, 1981", label: '1981'},
    {id:"ngi1989", source: ngi1989, name: "NGI Basiskaart, 1989", label: '1989'},
    {id:"ngi2000", source: nginow, name: "NGI Basiskaart, vandaag", label: '2024'},
   ];

export default {
    "ngi1939":  ngi1939,
    "ngi1969":  ngi1969,
    "ngi1981":  ngi1981,
    "ngi1989":  ngi1989,
    "ngi2000":  nginow
}