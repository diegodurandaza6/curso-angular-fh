import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private _snackBar:MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => {
        return this.heroesService.getHeroesById(id)
      })
    )
    .subscribe((heroe) => {
      this.heroe = heroe
    });
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0) return;

    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(resp => this.mostrarSnackBar('Registro actualizado!'))
    }else{
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(resp => {
        // console.log('Respuesta crear:', resp)
        this.router.navigate(['/heroes/editar', resp.id])
        this.mostrarSnackBar('Registro creado!')
      })
      
    }
  }

  borrar(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed()
    .pipe(
      switchMap(result => {
          if(result){
            return this.heroesService.borrarHeroe(this.heroe.id!)
          }else{
            return of(false)
          }
      })
    ).subscribe(resp => {if(resp) this.router.navigate(['/heroes'])})

    // dialog.afterClosed().subscribe(
    //   result => {
    //     if(result){
    //       this.heroesService.borrarHeroe(this.heroe.id!)
    //       .subscribe(resp => this.router.navigate(['/heroes']))
    //     }
    //   }
    // )

  }

  mostrarSnackBar(msg:string):void{
    this._snackBar.open(msg, 'ok!', {
      duration: 2500
    })
  }

}
