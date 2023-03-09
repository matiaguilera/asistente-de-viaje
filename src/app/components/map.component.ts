import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';
import booleanDisjoint from '@turf/boolean-disjoint';
import lineIntersect from '@turf/line-intersect';
import buffer from '@turf/buffer';
import { speedReducers } from '../speed-reducers';
import { DirectionService } from '../services/direction.service';

@Component({
  selector: 'app-map',
  template: ` <div
      class="absolute px-3 py-1 bottom-1 right-0 rounded-md m-4 hidden md:block monospace shadow text-gray-700 bg-white z-10"
    >
      Longitud: {{ lng }} | Latitud: {{ lat }} | Zoom: {{ zoom }}
    </div>
    <div id="map" class="h-screen w-screen"></div>`,
})
export class MapComponent implements OnChanges {
  @Input() startPoint: number[];
  @Input() endPoint: number[];
  @Input() counter: number;
  @Output() mapClick: EventEmitter<
    mapboxgl.MapMouseEvent & mapboxgl.EventData
  > = new EventEmitter();
  constructor(private directionService: DirectionService) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }
  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v11';
  lat = -25.4938;
  lng = -54.6541;
  zoom = 15;
  drawRoute() {
    if (this.startPoint && this.endPoint) {
      this.directionService
        .getDirections(this.startPoint, this.endPoint, environment.mapBoxToken)
        .then((data) => {
          const route = data.routes[0].geometry.coordinates;
          const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          };
          if (this.map.getSource('route')) {
            let source: any = this.map.getSource('route');
            source.setData(geojson);
          } else {
            this.map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson as any,
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#e81e39',
                'line-width': 5,
                'line-opacity': 0.75,
              },
            });
          }
        });
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['endPoint']) {
      this.drawRoute();
    }
  }
  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.map.setCenter([position.coords.longitude, position.coords.latitude]);
      new mapboxgl.Marker()
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(this.map);
    });
    this.map.on('move', () => {
      this.lng = parseFloat(this.map.getCenter().lng.toFixed(4));
      this.lat = parseFloat(this.map.getCenter().lat.toFixed(4));
      this.zoom = parseFloat(this.map.getZoom().toFixed(2));
    });
    this.map.on('click', (event) => {
      this.mapClick.emit(event);
    });
    let obstacle = buffer(speedReducers as any, 0.04, {
      units: 'kilometers',
    });
    this.map.on('load', () => {
      this.map.addLayer({
        id: 'speedReducers',
        type: 'fill',
        source: {
          type: 'geojson',
          data: obstacle,
        },
        layout: {},
        paint: {
          'fill-color': '#f03b20',
          'fill-opacity': 0,
          'fill-outline-color': '#f03b20',
        },
      });
    });
    speedReducers.features.forEach((item) => {
      const el = document.createElement('img');
      el.src = '/assets/lomada-marker.svg';
      new mapboxgl.Marker(el)
        .setLngLat(item.geometry.coordinates as any)
        .addTo(this.map);
    });
  }
}
