import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query:string){
    this._historial.unshift(query);
    if(this._historial.length > 5)
      this._historial.pop();
    console.log(this._historial);
  }
}
