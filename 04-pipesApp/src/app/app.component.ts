import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pipesApp';
  nombre:string = 'dIeGo DuraN';
  valor: number = 10;
  obj = {
    nombre:'Paula'
  }

  MostrarNombre(){
    console.log("Pruebas")
  }
}
