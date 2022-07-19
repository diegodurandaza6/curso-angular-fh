import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {

  @ViewChild('miForm') miForm!: NgForm

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Diego',
    favoritos: [
      { id: 1, nombre: 'Metal Gear' },
      { id: 2, nombre: 'Otra cosa' }
    ]
  }

  nombreValido(): boolean {
    return this.miForm?.controls['nombre']?.invalid && this.miForm?.controls['nombre']?.touched;
  }

  guardar() {
    return console.log('Formulario posteado');
  }

  eliminar(idx: number): void {
    this.persona.favoritos.splice(idx, 1);
  }

  agregarJuego(){
    const nuevoFavorito:Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

}
