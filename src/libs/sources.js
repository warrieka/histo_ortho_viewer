import GeoTIFF from 'ol/source/GeoTIFF';
import XYZ from 'ol/source/XYZ';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';
import backgrounds from './baselayers';

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
    "Antwerpen 1940-1945":{
      "shortname": "Antwerpen, WOII",
      "year": 1940,
      "title": 'Orthofotomozaïek Antwerpen, zwart-wit, heterogene bronnen, 5 tot 1m, periode 1940-1945',
      "about": "Deze zwart-wit luchtfoto van Antwerpen is samengesteld uit verschillende heterogene luchtfoto's met een grondresolutie variërend van ongeveer 5 tot 1 meter. Ik heb dit beeldmateriaal ingekleurd met mijn colorisatie-algoritme. Daarnaast is de foto bewerkt om de belichting consistent te maken, korreligheid te verwijderen en de resolutie te verhogen. Voor deze verbeteringen is onder andere het ESRGAN-algoritme (\"Enhanced Super-Resolution Generative Adversarial Networks\" door Xintao Wang et al., 2018) gebruikt.",
      "description": "De orthofotomozaïek is samengesteld uit luchtopnamen door genomen door verschillende verkenningsvliegtuigen gedurende de 2de wereldoorlog.",
      "url": "https://www.antwerpenherdenkt.be/nieuwe-pagina",
      "source_grey": antwerp_1940_1944_grey,
      "source_rbg": antwerp_1940_1944_rbg,
      "basemap": backgrounds['ngi1939'],
      "xy": [487549, 6657367], "zoom": 13, "maxzoom": 17
    },
    "Gent 1955-1961":{
        "shortname": "Gent, grootschalig",
        "year": 1955,
        "title": 'Orthofotomozaïek Gent, grootschalig, zwart-wit, 25cm, 1955-1961',
        "about": "Deze zwart-wit luchtfoto van Gent uit 1955 had oorspronkelijk een grondresolutie van 10 cm, maar werd opgeschaald naar 25 cm om de prestaties te verbeteren. Ik heb dit beeldmateriaal ingekleurd met mijn colorisatie-algoritme en gesmooth om de korreligheid te verwijderen.",
        "description": "De teams Stadsarcheologie van de stad Gent en Data & Informatie hebben deze mozaïek ontwikkeld op basis van 2100 luchtfoto's uit een vergeten collectie. Net na de Tweede Wereldoorlog maakte de overheid duizenden luchtfoto's ter ondersteuning van grootschalige infrastructuurwerken die in ons land gepland stonden. Nadat de projecten waren voltooid, verloren de foto's hun nut en bleven ze ongebruikt in archieven liggen. De opnamen werden uitgevoerd door de afdeling Fotogrammetrie van het Ministerie van Mobiliteit en Openbare Werken.",
        "url": 'https://stad.gent/nl/cultuur-vrije-tijd/cultuur/hoe-zag-jouw-buurt-eruit-de-jaren-50',
        "source_grey": gent1955grey,
        "source_rbg": gent1955rbg,
        "basemap":  backgrounds['ngi1969'],
        "xy": [415515 , 6629926], "zoom": 13, "maxzoom": 19
    },
    "Vlaanderen 1971":{
        "shortname": "Vlaanderen, kleinschalig",
        "year": 1971,
        "title": 'Orthofotomozaïek Vlaanderen, kleinschalig, zwart-wit, 1m, 1971',
        "about": "Deze zwart-wit luchtfoto van Vlaanderen uit 1971 heeft een grondresolutie van 1 meter. Ik heb het beeldmateriaal ingekleurd met mijn colorisatie-algoritme en gesmooth om de korreligheid te verwijderen.",
        "description": "De orthofotomozaïek is samengesteld uit luchtfoto's die tijdens de zomer van 1971 zijn gemaakt. Ze biedt een volledige dekking van het Vlaamse Gewest, inclusief het Brussels Hoofdstedelijk Gewest, met een grondresolutie van 1 meter. De opnames werden uitgevoerd door Eurosense in opdracht van de Vlaamse overheid.",
        "url": "https://download.vlaanderen.be/product/1191-orthofotomoza%C3%AFek-kleinschalig-zomeropnamen-panchromatisch-1971-vlaanderen",
        "source_grey": vlaanderen1971grey,
        "source_rbg": vlaanderen1971rbg,
        "basemap":  backgrounds['ngi1981'],
        "xy": [487549, 6657367], "zoom": 12, "maxzoom": 17
    }
}

export default layerList;
