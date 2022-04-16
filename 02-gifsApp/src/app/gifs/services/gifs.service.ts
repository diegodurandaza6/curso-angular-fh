import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'jH890Zj3OgMNGzID0gbywFtCm9c9fmGm';
  private servicioURL:string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: any[] = [];//TODO: Cambiar any por su tipo
  
  get historial() {
    return [...this._historial];
  }

  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){
    // }
  }
  
  buscarGifs(query: string) {
    query = query.trim().toUpperCase();
    let indexHistorial = this._historial.findIndex(item => item == query);
    if (indexHistorial != -1) {
      this._historial.splice(indexHistorial, 1);
    }
    this._historial.unshift(query);
    if (this._historial.length > 5) {
      this._historial.pop();
    }

    localStorage.setItem('historial', JSON.stringify(this._historial))

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

      // console.log(params.toString())

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
    .subscribe((resp) => {
      // console.log(resp.data);
      this.resultados = resp.data
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    });
  }
}
