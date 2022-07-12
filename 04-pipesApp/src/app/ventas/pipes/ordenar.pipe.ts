import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/ventas.interfaces';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(heroes: Heroe[], ordenPor: string = 'sin valor'): Heroe[] {
    if (ordenPor === 'nombre') {
      return heroes.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1)
    } else if (ordenPor === 'volar') {
      return heroes.sort((a, b) => (a.vuela > b.vuela) ? 1 : -1)
    }
    else if (ordenPor === 'color') {
      return heroes.sort((a, b) => (a.color > b.color) ? 1 : -1)
    }
    else {
      return heroes;
    }
  }

}
