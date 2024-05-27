# Colorize black and white aerial photos with AI

This is the demo website to publish the results of my aerial image colorisation an restoration algorithm.

We demo the application of the algoritm on 3 orthophoto mosaic's: 
- A panchromatic orthophoto mosaic of Flanders in 1971, source: [datavindplaats](https://www.vlaanderen.be/datavindplaats/catalogus/orthofotomozaiek-kleinschalig-zomeropnamen-panchromatisch-1971-vlaanderen).
- The city of ghent in the 1950's, Source: [hoe-zag-jouw-buurt-eruit-de-jaren-50](https://stad.gent/nl/cultuur-vrije-tijd/cultuur/hoe-zag-jouw-buurt-eruit-de-jaren-50).
- A orthophoto mosaic of Antwerp derived from military reconnaissance photo's in second world war, the source mosaic was created by me for [antwerpenherdenkt](https://www.antwerpenherdenkt.be/nieuwe-pagina).

## Installation on your local device using `npm`

Make sure you have [nodejs](https://nodejs.org/en/download/) installed. 

```sh
git pull https://github.com/warrieka/histo_ortho_viewer/
cd histo_ortho_viewer
npm i
npm run build
npm run preview
```
`npm run build` The production builds will be created in the **dist/** folder. 

`npm run preview` will run a preview of the production build on <http://localhost:4173>.

`run start` will start the developement server on <http://localhost:5173>. 

## Create a docker image for deployment

Make sure you have [docker](https://docs.docker.com/get-docker/) installed. 

```sh
docker image build -t histo_ortho .
docker compose up -d
```
This will create the image and run on port 80: <http://127.0.0.1>.

To install a ssl-certificate for your site edit the [dockerfile](dockerfile) and the [nginx config (default.conf)](default.conf) and replace **yourdomain.com** by your domain before building. 

To Push to dockerhub, change username in the [compose.yml](compose.yml) if you are not me, then:
```sh
docker compose push
```

## publish demo to github pages 

```sh
git subtree push --prefix dist origin gh-pages 
```
