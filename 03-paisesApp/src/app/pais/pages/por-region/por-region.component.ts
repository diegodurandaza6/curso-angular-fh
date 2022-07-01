import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  regionActiva: string = '';
  paises: Country[] = [];
  termino: string = '';
  hayError: boolean = false;

  constructor(private paisService: PaisService) { }

  getClaseCSS(region:string): string{
    return (region === this.regionActiva) ? 'btn btn-sm btn-primary me-2' : 'btn btn-sm btn-outline-primary me-2';
  }

  activarRegion(region:string){
    if (this.regionActiva === region) return;
    this.regionActiva = region;
    //TODO: hacer el llamado al servicio.
    this.paises = [];
    this.paisService.buscarRegion(region).subscribe({
      next: (resp) => {
        // console.log(resp);
        this.paises = resp;
      }, error: (err) => {
        this.hayError = true;
        this.paises = [];
      }
    });
  }
}
