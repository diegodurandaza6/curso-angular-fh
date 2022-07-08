import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html'
})
export class NoComunesComponent {

  // i18nSelect
  nombre: string = 'Diego';
  genero: string = 'masculino';

  invitacionMapa = {
    masculino: 'invitarlo',
    femenino: 'invitarla'
  }

  cambiarPersona(){
        
    if(this.genero == 'femenino'){
      this.genero = 'masculino';
      this.nombre = 'Diego';
    }else{
      this.genero = 'femenino';
      this.nombre = 'Camila';
    }
  }

  //i18nPlural
  clientes: string[] = ['Maria', 'Pedro', 'Juan', 'Diego', 'Camila'];
  clientesMapa = {
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    'other': 'tenemos # clientes esperando'
  }

  borrarCliente(){
    if(this.clientes.length === 0){
      this.clientes = ['Maria', 'Pedro', 'Juan', 'Diego', 'Camila']
    }else{
      this.clientes.pop();
    }
  }

  // KeyValue Pipe
  persona = {
    nombre: 'Diego',
    edad: 32,
    direccion: 'Bucaramanga, Colombia'
  }

  heroes = [
    {
      nombre: 'Superman',
      vuela: true
    },
    {
      nombre: 'Robin',
      vuela: false
    },
    {
      nombre: 'Aquaman',
      vuela: false
    }
  ]

  //Async Pipe
  miObservable = interval(1000);

  valorPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data de promesa');
    }, 3500);
  })
}
