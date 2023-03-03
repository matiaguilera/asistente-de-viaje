import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { MapMouseEvent, EventData } from 'mapbox-gl';
import booleanDisjoint from '@turf/boolean-disjoint';
import lineIntersect from '@turf/line-intersect';
import buffer from '@turf/buffer';
import { DirectionService } from './services/direction.service';
import { GeocodingService } from './services/geocoding.service';
import { speedReducers } from './speed-reducers';

@Component({
  selector: 'app-root',
  template: `<app-route-finder></app-route-finder>
    <ng-container *ngIf="showMenu">
      <app-menu></app-menu>
    </ng-container>
    <app-map (mapClick)="onMapClick($event)"></app-map>`,
})
export class AppComponent {
  isFirst = true;
  startPoint: any = [];
  endPoint: any = [];
  showMenu = true;
  onMapClick(event: MapMouseEvent & EventData) {
    const coords = Object.keys(event.lngLat).map(
      (key) => event.lngLat[key as keyof mapboxgl.LngLat]
    );
    if (this.isFirst) {
      this.startPoint = coords;
      this.isFirst = false;
    } else {
      this.endPoint = coords;
    }
  }
  menuClickHandler() {
    this.showMenu = !this.showMenu;
  }
  constructor() {}
}
