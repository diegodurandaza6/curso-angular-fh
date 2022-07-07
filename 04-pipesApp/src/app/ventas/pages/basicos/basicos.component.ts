import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent implements OnInit {

  nombreLower: string = 'diego';
  nombreUpper: string = 'DIEGO';
  nombreCompleto: string = 'DiEgO dUrAN';

  fecha: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
