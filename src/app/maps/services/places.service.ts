import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClient';
import { Feature, IPlaces } from '../interfaces/IPlaces';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?:[number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get IsUserLocationReady(): boolean{
    return !!this.useLocation;
  }
  constructor(private placesApi: PlacesApiClient) {
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
    if (this.useLocation) throw Error('No hay userLocation');
    this.isLoadingPlaces = true;
    const url = `/${query}.json`;
    this.placesApi.get<IPlaces>(url, {
      params: {
        proximity: this.useLocation!.join(',')
      }
    })
    .subscribe((resp) => {
      console.log(resp.features);
      this.isLoadingPlaces = false;
      this.places = resp.features;
    });
  }
}
