import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contribute-form',
  template: `<div
    class="absolute top-0 z-40 flex h-screen w-screen items-center justify-center bg-black/5"
  >
    <form class="flex flex-col gap-5 rounded-md bg-white p-4 shadow z-50">
      <h2 class="text-lg font-medium">Agrega un punto de interés</h2>
      <p class="italic">El punto será agregado en su ubicación actual.</p>
      <label for="categoria">
        <span>Categoría</span>
        <select id="categoria" class="mt-2 w-full rounded border py-1 px-2">
          <option>Lomada</option>
          <option>Doble raya</option>
        </select>
      </label>

      <label
        htmlFor="pic-upload"
        class="flex items-center mb-3 w-fit cursor-pointer rounded-md border border-gray-700 px-2 py-1 text-gray-700 hover:bg-slate-100"
      >
        <svg
          class="h-4 w-4 fill-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
          />
        </svg>
        <span class="ml-2"> Agregar foto </span>
        <input id="pic-upload" class="hidden" accept="image/*" type="file" />
      </label>
      <hr />
      <div class="flex items-center justify-end gap-3">
        <button
          (click)="cancelClickHandler()"
          class="w-fit rounded border px-4 py-1 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="w-fit rounded bg-gray-600 px-4 py-1 text-white hover:bg-gray-700"
        >
          Enviar
        </button>
      </div>
    </form>
  </div>`,
})
export class ContributeFormComponent {
  @Output() cancelClick: EventEmitter<void> = new EventEmitter();

  cancelClickHandler() {
    this.cancelClick.emit();
  }
}
