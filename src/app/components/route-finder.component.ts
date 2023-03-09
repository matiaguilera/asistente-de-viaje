import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DirectionService } from '../services/direction.service';
import { GeocodingService } from '../services/geocoding.service';
import { environment } from '@env/environment';
import {
  faBars,
  faLocationDot,
  faXmark,
  faArrowRightArrowLeft,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-route-finder',
  template: `<div
    class="absolute top-0 z-10 h-44 w-screen bg-white p-5 shadow md:w-96 md:rounded-md md:m-5"
  >
    <div class="flex items-center mb-5 gap-3">
      <button (click)="menuClickHandler()">
        <fa-icon
          class="text-gray-400 hover:text-gray-600"
          size="lg"
          [icon]="faBars"
        ></fa-icon>
      </button>
      <h1 class="font-medium">Indicaciones para llegar</h1>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex flex-auto flex-col gap-3">
        <div class="flex items-center gap-3">
          <fa-icon
            class="text-blue-600"
            size="lg"
            [fixedWidth]="true"
            [icon]="faCircleDot"
          ></fa-icon>
          <div
            class="flex w-full items-center rounded-md bg-slate-100 py-1 px-2"
          >
            <input
              (change)="onChangeOriginHandler($event)"
              placeholder="Selecciona el punto de salida"
              type="text"
              [value]="originValue"
              class="w-full bg-slate-100 focus:outline-none text-sm"
            />
            <ng-container
              *ngIf="originValue !== ''; then thenBlock; else elseBlock"
            ></ng-container>
            <ng-template #thenBlock
              ><button (click)="cleanOrigin()">
                <fa-icon
                  class="text-gray-400 hover:text-gray-600"
                  [fixedWidth]="true"
                  [icon]="faXmark"
                ></fa-icon></button
            ></ng-template>
            <ng-template #elseBlock>
              <fa-icon
                class="text-gray-400 hover:text-gray-600"
                [icon]="faMagnifyingGlass"
                [fixedWidth]="true"
              ></fa-icon>
            </ng-template>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <fa-icon
            class="text-red-600"
            size="lg"
            [fixedWidth]="true"
            [icon]="faLocationDot"
          ></fa-icon>
          <div
            class="flex w-full items-center rounded-md bg-slate-100 py-1 px-2"
          >
            <input
              (change)="onChangeDestinyHandler($event)"
              placeholder="Selecciona el punto de destino"
              type="text"
              [value]="destinyValue"
              class="w-full bg-slate-100 focus:outline-none text-sm"
            />
            <ng-container
              *ngIf="destinyValue !== ''; then thenBlock; else elseBlock"
            ></ng-container>
            <ng-template #thenBlock
              ><button (click)="cleanDestiny()">
                <fa-icon
                  class="text-gray-400 hover:text-gray-600"
                  [icon]="faXmark"
                  [fixedWidth]="true"
                ></fa-icon></button
            ></ng-template>
            <ng-template #elseBlock>
              <fa-icon
                class="text-gray-400 hover:text-gray-600"
                [fixedWidth]="true"
                [icon]="faMagnifyingGlass"
              ></fa-icon>
            </ng-template>
          </div>
        </div>
      </div>
      <button (click)="swapHandler()" class="mr-1 ml-6">
        <fa-icon
          class="text-gray-400 hover:text-gray-600"
          [rotate]="90"
          size="lg"
          [icon]="faArrowRightArrowLeft"
        ></fa-icon>
      </button>
    </div>
  </div> `,
})
export class RouteFinderComponent implements OnChanges {
  @Output() menuClick: EventEmitter<void> = new EventEmitter();
  @Input() startPoint: any = [];
  @Input() endPoint: any = [];

  faBars = faBars;
  faLocationDot = faLocationDot;
  faCircleDot = faCircleDot;
  faXmark = faXmark;
  faArrowRightArrowLeft = faArrowRightArrowLeft;
  faMagnifyingGlass = faMagnifyingGlass;

  isFirst = true;
  counter = 0;
  originValue =
    this.startPoint?.length > 0
      ? this.startPoint[0].toFixed(4) + ', ' + this.startPoint[1].toFixed(4)
      : '';
  destinyValue =
    this.endPoint?.length > 0
      ? this.endPoint[0].toFixed(4) + ', ' + this.endPoint[1].toFixed(4)
      : '';

  menuClickHandler() {
    this.menuClick.emit();
  }

  swapHandler() {
    [this.startPoint, this.endPoint] = [this.endPoint, this.startPoint];
    // this.inputHandler();
    //raise event here
  }
  onChangeOriginHandler(e: any) {
    this.originValue = e.target.value;
    this.geocodingService
      .geocode(e.target.value, environment.mapBoxToken)
      .then((data) => {
        console.log(data);
      });
  }
  onChangeDestinyHandler(e: any) {
    this.destinyValue = e.target.value;
    this.geocodingService
      .geocode(e.target.value, environment.mapBoxToken)
      .then((data) => {
        console.log(data);
      });
  }
  cleanOrigin() {
    this.originValue = '';
  }
  cleanDestiny() {
    this.destinyValue = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startPoint']) {
      this.originValue =
        changes['startPoint'].currentValue?.length > 0
          ? this.startPoint[0].toFixed(4) + ', ' + this.startPoint[1].toFixed(4)
          : '';
    }
    if (changes['endPoint']) {
      this.destinyValue =
        changes['endPoint'].currentValue?.length > 0
          ? this.endPoint[0].toFixed(4) + ', ' + this.endPoint[1].toFixed(4)
          : '';
    }
  }

  constructor(
    private directionService: DirectionService,
    private geocodingService: GeocodingService
  ) {}
}
