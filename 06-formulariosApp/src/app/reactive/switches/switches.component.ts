import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html'
})
export class SwitchesComponent implements OnInit{

  miFormulario: FormGroup = this.fb.group({
    genero:['M', Validators.required],
    notificaciones:['M', Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset({...this.persona, condiciones:false});

    // this.miFormulario.get('condiciones')?.valueChanges.subscribe(newValude => {
    //   console.log(newValude);
    // })

    this.miFormulario.valueChanges.subscribe(({condiciones, ...restoArg}) => {
      this.persona = restoArg;
    });
  }

  guardar(){
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;
    this.persona = formValue;
  }
}
