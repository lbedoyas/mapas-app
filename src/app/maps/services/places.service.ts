import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public useLocation?:[number, number];
  get IsUserLocationReady(): boolean{
    return !!this.useLocation;
  }
  constructor(private http: HttpClient) {
    this.getUserLocation();
  }
  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation)
        },
        (err) => {
          alert('No se pudo tener la geolocalizacion');
          console.error(err);
          reject()
        }
      )
    });
  }
  getPlaceByQuery(query: string) {
    this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoibHVjaG9iZWQxIiwiYSI6ImNremRqN3J5MzA1ZTgyb3AwZ3cybmhjbTkifQ.qB2dGXmzKcFvX3d66j_N6w`)
    .subscribe(console.log);
  }
}
