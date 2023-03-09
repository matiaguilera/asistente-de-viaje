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
  template: `<app-route-finder
      [startPoint]="startPoint"
      [endPoint]="endPoint"
      (menuClick)="menuClickHandler()"
    />
    <ng-container *ngIf="showMenu">
      <app-menu
        (menuClick)="menuClickHandler()"
        (editClick)="editClickHandler()"
      />
    </ng-container>
    <ng-container *ngIf="showLogin">
      <app-menu (menuClick)="menuClickHandler()"/>
    </ng-container>
    <ng-container *ngIf="showEditForm">
      <app-contribute-form (cancelClick)="editClickHandler()" />
    </ng-container>
    <app-map
      [startPoint]="startPoint"
      [endPoint]="endPoint"
      (mapClick)="onMapClick($event)"
    />`,
})
export class AppComponent {
  isFirst = true;
  startPoint: any;
  endPoint: any;
  showMenu = false;
  showLogin = false;
  showEditForm = false;
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
  editClickHandler() {
    this.showEditForm = !this.showEditForm;
  }
  constructor() {}
}
