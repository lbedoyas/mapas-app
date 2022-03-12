import { Component, OnInit } from '@angular/core';
import { Feature } from '../../interfaces/IPlaces';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor(private placesServices: PlacesService, private mapService: MapService) { }

  get isLoadingPlaces(): boolean {
    return this.placesServices.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesServices.places;
  }

  flyTo(place: Feature ) {
    this.selectedId =  place.id;
    const [ lng, lat ] = place.center;
    this.mapService.flyTo([lng, lat]);
  }


}
