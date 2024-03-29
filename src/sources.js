import GeoTIFF from 'ol/source/GeoTIFF';
import XYZ from 'ol/source/XYZ';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';

const webMercator = getProjection('EPSG:3857');
const webmercatorExtent = webMercator.getExtent();
const size = getWidth(webmercatorExtent) / 256;
const resolutions = new Array(20);
const matrixIds = new Array(20);
for (let z = 0; z < 20; ++z) {
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

export let antwerp_1940_1944_grey = new WMTS({
  //info: https://geo.api.vlaanderen.be/OKZ/wmts?request=getcapabilities&service=wmts&version=1.0.0
  url: 'https://tiles.arcgis.com/tiles/1KSVSmnHT2Lw9ea6/arcgis/rest/services/Luchtfotomozaiek_jaren_40/MapServer/WMTS',
  attributions: [""],
  crossOrigin: 'anonymous',
  layer: 'Luchtfotomozaiek_jaren_40',
  matrixSet: 'default028mm',
  format: 'image/jpgpng',
  projection: webMercator,
  tileGrid: new WMTSTileGrid({
    origin: getTopLeft(webmercatorExtent),
    resolutions: resolutions,
    matrixIds: matrixIds,
  }),
  style: 'default',
  wrapX: true,
  webmercatorExtent,
});

let ngi1939 =	new XYZ({
  url: "https://www.ngi.be/tiles/arcgis/rest/services/seamless_carto__default__3857__800/MapServer/tile/{z}/{y}/{x}",
  minZoom: 7 , maxZoom: 17, 
  projection: webMercator,   crossOrigin: 'anonymous',
  attributions: [
    "NGI: <a href='https://www.ngi.be/website/gebruiksvoorwaarden-cartoweb-be'>gebruiksvoorwaarden</a>"
  ]
});

export let ngi1969 = new XYZ({
  url: 'https://www.ngi.be/tiles/arcgis/rest/services/seamless_carto__default__3857__1100/MapServer/tile/{z}/{y}/{x}',
  minZoom: 7, maxZoom: 17,
  projection: webMercator, crossOrigin: 'anonymous',
  attributions: [
    "NGI: <a href='https://www.ngi.be/website/gebruiksvoorwaarden-cartoweb-be'>gebruiksvoorwaarden</a>",
  ],
});

export let gent1955grey = new XYZ({
    url: 'https://geo.gent.be/geoserver/gwc/service/wmts/rest/SG-E-BasislagenLuchtfotos:OrthofotoGent1955WebMercator/raster/SG-WEB%20MERCATOR/SG-WEB%20MERCATOR:{z}/{y}/{x}?format=image/png',
    minZoom: 7,
    maxZoom: 20,
    projection: webMercator,
    crossOrigin: 'anonymous',
    attributions: [
      "© Vlaamse overheid, Departement Mobiliteit en Openbare Werken, afdeling Algemene Technische Ondersteuning, cel fotogrammetrie",
    ],
});
  
export let vlaanderen1971grey = new WMTS({
    //info: https://geo.api.vlaanderen.be/OKZ/wmts?request=getcapabilities&service=wmts&version=1.0.0
    url: 'https://geo.api.vlaanderen.be/OKZ/wmts',
    attributions: ["1971 © Vlaamse Overheid, <a href='https://overheid.vlaanderen.be/Webdiensten-Gebruiksrecht'>gebruiksvoorwaarden</a>"],
    crossOrigin: 'anonymous',
    layer: 'okzpan71vl',
    matrixSet: 'GoogleMapsVL',
    format: 'image/png',
    projection: webMercator,
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(webmercatorExtent),
      resolutions: resolutions,
      matrixIds: matrixIds,
    }),
    style: '',
    wrapX: true,
    webmercatorExtent,
});

export let antwerp_1940_1944_rbg = new GeoTIFF({
  sources: [
    {
      url: 'https://storage.googleapis.com/histortho/antwerp_luchtfoto_1940_1945_web.tif',
    },
  ],
  convertToRGB: 'auto',
  normalize: true,
});
  
export let vlaanderen1971rbg = new GeoTIFF({
    sources: [
      {
        url: 'https://storage.googleapis.com/histortho/1970SR_rbg.tif',
      },
    ],
    convertToRGB: 'auto',
    normalize: true,
});
  
export  let gent1955rbg = new GeoTIFF({
    sources: [
      {
        url: 'https://storage.googleapis.com/histortho/gent_1955_color.tif',
      },
    ],
    convertToRGB: 'auto',
    normalize: true
});

const layerList = {
    "Gent 1955":{
        "title": 'Orthofotomozaïek Gent, grootschalig, zwart-wit, 25cm, 1955',
        "about": "Deze zwartwit luchtfoto van Gent is van 1955 en had een grondresolutie van 10cm,maar dit werd opgeschaald naar 25cm om performantie redenen.  Hij werd ingekleurd met mijn AI-algoritme. Hij is ook wat gesmooth om de korreligheid te verwijderen.",
        "description": "De teams Stadsarcheologie en Data & Informatie van stad Gent ontwikkelden deze mozaiek op basis van 2.100 luchtfoto's,  afkomstig uit een vergeten luchtfotocollectie. Net na de Tweede Wereldoorlog nam de overheid duizenden luchtfotos gemaaktter ondersteuning van de grootschalige infrastructuurwerken die in ons land gepland stonden. Eens de projecten gerealiseerd waren, verloren ze hun nut en bleven zin ide kast liggen. De opname werd uitgevoerd door het Ministerie Mobiliteit en Openbare Werken, afdeling Fotogrammetrie.",
        "url": 'https://stad.gent/nl/cultuur-vrije-tijd/cultuur/hoe-zag-jouw-buurt-eruit-de-jaren-50',
        "source_grey": gent1955grey,
        "source_rbg": gent1955rbg,
        "basemap": null,
        "xy": [415515 , 6629926], "zoom": 12, "maxzoom": 19
    },
    "Vlaanderen 1970":{
        "title": 'Orthofotomozaïek Vlaanderen, kleinschalig, zwart-wit, 1m, 1971',
        "about": "Deze zwartwit luchtfoto van Vlaanderen is van 1971 en heeft een grondresolutie van 1m. Hij werd ingekleurd met mijn AI-algoritme.  Hij is ook wat gesmooth om de korreligheid te verwijderen.",
        "description": "De orthofotomozaïek is samengesteld uit luchtopnamen die tijdens het zomerseizoen van 1971 ingewonnen werden. Ze toont een gebiedsdekkende orthofotobedekking van het Vlaamse Gewest, inclusief het Brussels Hoofdstedelijk Gewest met een grondresolutie van 1 m. De opname werd uitgevoerd door Eurosense in opdracht van Agentschap voor Geografische Informatie.",
        "url": "https://www.vlaanderen.be/datavindplaats/catalogus/orthofotomozaiek-kleinschalig-zomeropnamen-panchromatisch-1971-vlaanderen",
        "source_grey": vlaanderen1971grey,
        "source_rbg": vlaanderen1971rbg,
        "basemap": null,
        "xy": [487549, 6657367], "zoom": 12, "maxzoom": 17
    },
    "Antwerpen 1940-1945":{
      "title": 'Orthofotomozaïek Antwerpen, zwart-wit, heterogeen bronnen, 5 tot 1m, 1940-1945',
      "about": "Deze zwartwit luchtfoto van Antwerpen is samengesteld uit verschildende heterogene luchtfoto's met belichting grondresolutie van ongeveer 5 tot 1 meter. Hij werd ingekleurd met mijn AI-algoritme.  Hij is ook bewerkt om belichting te matchen, korreligheid te verwijderen en de resolutie verhogen, hiervoor werd ondermeer ESRGAN algoritme gebruikt (\": Enhanced Super-Resolution Generative Adversarial Networks\" Xintao Wang et al. (2018)) .",
      "description": "De orthofotomozaïek is samengesteld uit luchtopnamen door genomen door verschillende verkenningsvliegtuigen gedurende de 2de wereldoorlog, met als doel om als achtergrond te dienen op Antwerpen herdenkt.",
      "url": "https://www.antwerpenherdenkt.be/nieuwe-pagina",
      "source_grey": antwerp_1940_1944_grey,
      "source_rbg": antwerp_1940_1944_rbg,
      "basemap": null,
      "xy": [487549, 6657367], "zoom": 12, "maxzoom": 17
  }
}

export default layerList;
