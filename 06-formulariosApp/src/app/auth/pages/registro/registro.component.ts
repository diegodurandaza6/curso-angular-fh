import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { emailPattern, nombreApellidoPattern } from 'src/app/shared/validator/validaciones';
import { noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.evs]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]],
  }, {
    validators: [this.vs.camposIguales('password', 'passwordConfirm')]
  })

  get EmailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return 'Email es obligatorio';
    }
    else if(errors?.['pattern']){
      return 'Email sin formato correcto';
    }
    else if(errors?.['emailtomado']){
      return 'Email en uso';
    }
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private evs: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Diego Duran',
      email: 'correo@prueba.com',
      username: 'dduran',
      password: 123456,
      passwordConfirm: 123456
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  emailRequired() {
    return this.miFormulario.get('email')?.errors?.['required'] && this.miFormulario.get('email')?.touched;
  }

  emailFormato() {
    return this.miFormulario.get('email')?.errors?.['pattern'] && this.miFormulario.get('email')?.touched;
  }

  emailTomado() {
    return this.miFormulario.get('email')?.errors?.['emailTomado'] && this.miFormulario.get('email')?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value)
    this.miFormulario.markAllAsTouched();
  }

}
