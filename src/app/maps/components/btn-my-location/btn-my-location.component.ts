import { Component, OnInit } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss']
})
export class BtnMyLocationComponent implements OnInit {

  constructor(private mapServices: MapService, private placeServices: PlacesService) { }

  ngOnInit(): void {
  }
  goToMyLocation(): void {
    if(!this.placeServices.IsUserLocationReady) return;
    if(!this.mapServices.isMapReady) return;
    this.mapServices.flyTo( this.placeServices.useLocation! );
  }

}
