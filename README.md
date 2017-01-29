<img width="150" src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" />
<img width="50" src="https://angular.io/resources/images/logos/angular2/angular.svg" />
<img width="50" src="https://www.herokucdn.com/deploy/button.png" />
<img width="150" src="https://www.mlab.com/base/img/mLab-logo-dark.svg" />

## Info
Angular 2 app with nodejs as backend server. Integrated easy deploy to heroku and connected to mLab - mongodb database storage.

## Angular2 Express MongoDB ( Advanced )

- Angular 2 ( 2.x )
- ExpressJS ( 4.x - with compression )
- Mongodb
- Webpack ( angular-cli )

## Concepts

- Redux ( NgRx/Store - with server calls)
- Smart & dumb components
- AOT: Ahead-of-Time compilation
- Advanced routing ( lazy loading, router outlets...)

## Install / Development

```bash
git clone https://github.com/vladotesanovic/angular2-express-starter
cd angular2-express-starter

# Install dependencies
npm install

# start server
npm run start

# Client url: http://localhost:4200
# Application ( epxress ) API: http://localhost:4300
```


## Build / Production

```bash

npm run build

## Deploy dist folder to app server

Structure of dist folder:

/dist/server <-- expressjs
/dist/client <-- angular2

```


