import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { PlacesService } from '../../services';
import { MapService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef

  constructor(private placesService: PlacesService, private mapService: MapService) { }
  ngAfterViewInit(): void {
    console.log(this.placesService.useLocation);
    if ( !this.placesService.useLocation ) throw Error('no hay data placesServices');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 14 // starting zoom
      });

      const popup = new Popup()
      .setHTML(`<h6>Estoy aqui pendejo!</h6>
      <span>No estoy membolatado ando por aca</span>`
      );
      new Marker({color: 'red'}).setLngLat(this.placesService.useLocation)
      .setPopup(popup).addTo(map);

      this.mapService.setMap(map);
  }

}
