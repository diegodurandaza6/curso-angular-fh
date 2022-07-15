import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(idHeroe: string): string {
    return `assets/heroes/${idHeroe}.jpg`;
  }

}
