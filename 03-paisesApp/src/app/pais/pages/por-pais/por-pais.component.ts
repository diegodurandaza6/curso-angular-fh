import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor:pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias:boolean = false

  constructor(private paisService: PaisService) { }

  buscar(event: string) {
    this.mostrarSugerencias = false;
    this.termino = event;
    this.hayError = false;
    console.log(this.termino)
    this.paisService.buscarPais(this.termino)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.paises = resp;
        }, error: (err) => {
          this.hayError = true;
          this.paises = [];
        }
      });
  }

  sugerencias(termino: string) {
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(termino)
    .subscribe(
      pais => this.paisesSugeridos = pais.splice(0,3),
      (err) => this.paisesSugeridos = []
    )
  }

  buscarSugerido(termino:string){
    this.buscar(termino);
  }
}
