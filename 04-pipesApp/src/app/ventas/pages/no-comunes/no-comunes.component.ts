import { Component } from '@angular/core';

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
    }
    this.clientes.pop();
  }
}
