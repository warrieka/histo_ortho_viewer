# Colorize black and white aerial photos with AI

This is the demo website for the results of my aerial image colorisations an restoration algorithm.

## Installation on your local device using `npm`

Make sure you have [nodejs](https://nodejs.org/en/download/) installed. 

```sh
git pull <this repo>
cd <reponame>
npm i
npm run build
npm run preview
```
`npm run build` The production builds will be created in the **dist/** folder. 

`npm run preview` will run a preview of the production build on <http://localhost:4173>.

`run start` will start the developement server on <http://localhost:5173>. 

## Create a docker image for deployemt

Make sure you have [docker](https://docs.docker.com/get-docker/) installed. 

```sh
docker image build -t histo_ortho .
docker compose up -d
```

This will create the image and run on port 80: <http://127.0.0.1>.

To install a ssl-certificate for your site edit the [dockerfile](dockerfile) and the [nginx config (default.conf)](default.conf) and replace **yourdomain.com** by your domain before building. 

To Push to dockerhub, change username in the [compose.yml](compose.yml) if your are not me, then:
```sh
docker compose push
```