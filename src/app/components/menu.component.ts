import { Component, Output, EventEmitter } from '@angular/core';
import {
  faAnglesLeft,
  faMound,
  faCircleExclamation,
  faBook,
  faPenToSquare,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  template: `<div
      (click)="menuClickHandler()"
      class="absolute top-0 z-20 h-screen w-screen bg-black/20"
    ></div>
    <div
      class="absolute top-0 z-30 flex h-screen w-64 flex-col gap-4 bg-white p-5 text-sm text-gray-700"
    >
      <div class="flex justify-between">
        <h1 class="text-base font-medium">Asistente de viaje</h1>
        <button (click)="menuClickHandler()">
          <fa-icon
            [icon]="faAnglesLeft"
            class="text-gray-600 hover:text-gray-800"
            size="lg"
          ></fa-icon>
        </button>
      </div>
      <hr />
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <fa-icon
            [icon]="faMound"
            [fixedWidth]="true"
            class="text-gray-600"
          ></fa-icon>
          <label for="lomadas"> Lomadas </label>
        </div>
        <input id="lomadas" type="checkbox" />
      </div>
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <fa-icon
            [icon]="faCircleExclamation"
            [fixedWidth]="true"
            class="text-gray-600"
          ></fa-icon>
          <label for="señales"> Señales de tránsito </label>
        </div>
        <input id="señales" type="checkbox" />
      </div>
      <hr />
      <button class="group flex w-fit items-center gap-2 hover:text-gray-900">
        <fa-icon
          [icon]="faBook"
          [fixedWidth]="true"
          class="text-gray-600  group-hover:text-gray-800"
        ></fa-icon>
        Leyes vigentes
      </button>
      <button class="group flex w-fit items-center gap-2 hover:text-gray-900">
        <fa-icon
          [icon]="faPenToSquare"
          [fixedWidth]="true"
          class="text-gray-600  group-hover:text-gray-800"
        ></fa-icon>
        Editar mapa
      </button>
      <button class="group flex w-fit items-center gap-2 hover:text-gray-900">
        <fa-icon
          [icon]="faGear"
          [fixedWidth]="true"
          class="text-gray-600  group-hover:text-gray-800"
        ></fa-icon>
        Opciones
      </button>
    </div>`,
})
export class MenuComponent {
  @Output() menuClick: EventEmitter<void> = new EventEmitter();

  faAnglesLeft = faAnglesLeft;
  faMound = faMound;
  faCircleExclamation = faCircleExclamation;
  faBook = faBook;
  faPenToSquare = faPenToSquare;
  faGear = faGear;
  menuClickHandler() {
    this.menuClick.emit();
  }
}
