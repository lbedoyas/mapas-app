import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
Mapboxgl.accessToken = 'pk.eyJ1IjoibHVjaG9iZWQxIiwiYSI6ImNremRqN3J5MzA1ZTgyb3AwZ3cybmhjbTkifQ.qB2dGXmzKcFvX3d66j_N6w';

if (!navigator.geolocation) {
  alert('el navegador no soporta el geolocation');
  throw new Error('el navegador no soporta el geolocation');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
