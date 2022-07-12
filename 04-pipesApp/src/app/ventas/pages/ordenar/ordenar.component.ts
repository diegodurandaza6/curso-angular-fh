import { Component, OnInit } from '@angular/core';
import { Color, Heroe } from '../../interfaces/ventas.interfaces';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html'
})
export class OrdenarComponent {

  ordenPor: string = 'sin valor';
  enMayuscula: boolean = false;
  heroes: Heroe[] = [
    {
      nombre: 'Superman',
      vuela: true,
      color: Color.azul
    },
    {
      nombre: 'Batman',
      vuela: false,
      color: Color.negro
    },
    {
      nombre: 'Robin',
      vuela: false,
      color: Color.verde
    },
    {
      nombre: 'Daredevil',
      vuela: false,
      color: Color.rojo
    },
    {
      nombre: 'Linternaverde',
      vuela: true,
      color: Color.verde
    }
  ];

  toggleMayuscula() {
    this.enMayuscula = !this.enMayuscula
  }

  ordenarPor(ordenPor: string) {
    this.ordenPor = ordenPor;
  }

}
