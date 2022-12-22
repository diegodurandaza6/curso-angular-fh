import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from "rxjs/operators";

import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  })

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: PaisSmall[] = [];
  cargando:boolean = false;

  constructor(
    private fb: FormBuilder,
    private ps: PaisesService
  ) { }

  ngOnInit(): void {
    this.regiones = this.ps.regiones;

    //Cuando cambie la region -- Opcional
    // this.miFormulario.get('region')?.valueChanges
    // .subscribe(region => {
    //   console.log(region);
    //   this.ps.getPaisesPorRegion(region)
    //   .subscribe(paises => {
    //     this.paises = paises;
    //     console.log(this.paises)
    //   })
    // });

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.cargando = true;
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap(region => this.ps.getPaisesPorRegion(region))
      )
      .subscribe(paises => {
        this.paises = paises;
        this.cargando = false;
      });

    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap((_) => {
          this.cargando = true;
          this.miFormulario.get('frontera')?.reset('');
        }),
        switchMap(codigo_pais => this.ps.getPaisPorCodigo(codigo_pais)),
        switchMap(pais => this.ps.getPaisesPorCodigo(pais?.borders!))
      )
      .subscribe(pais => {
        // this.fronteras = pais?.borders || [];
        this.fronteras = pais;
        this.cargando = false;
      });
  }

  guardar(): void {
    console.log(this.miFormulario.value)
  }

}
