import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;

  usuario = {
    nombrecompleto: {
      nombre: 'roberto',
      apellido: 'agirre'
    },
    correo: 'r@e.es',
    //  pasatiempos: ['Correr', 'Dormir', 'Comer']
  };

  constructor() {
    this.forma = new FormGroup({
      nombrecompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
        apellido: new FormControl('', [Validators.required, this.noAgirre])
      }),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      pasatiempos: new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      username: new FormControl('', Validators.required, this.existeUsuario),
      password1: new FormControl('', Validators.required),
      password2: new FormControl()
    });

    // tienen la misma estructura (el objeto usuario y  el formGroup)
    // this.forma.setValue(this.usuario);
    this.forma.controls.password2.setValidators([
      Validators.required, this.noIgual.bind(this.forma)
    ]);

    // Observador para detectar cambios en el formualrio
    // this.forma.valueChanges.subscribe(data => {
    // Observador para detectar cambios en un campo del formualrio
    this.forma.controls.username.valueChanges.subscribe(data => {
      console.log(data);
    });

    // Subcribirnos al status
    this.forma.controls.username.statusChanges.subscribe(data => {
      console.log(data);
    });

  }

  ngOnInit() {
  }

  agregarPasatiempos() {
    (this.forma.controls.pasatiempos as FormArray).push(
      new FormControl('', Validators.required)
    );
  }

  noAgirre(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'agirre') {
      return {
        noagirre: true
      };
    }
    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    const forma: any = this;
    if (control.value !== forma.controls.password1.value) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'robaguirre') {
            // Mensaje que sale en el errors
            resolve({ existe: true });
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );

    return promesa;
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

    this.forma.reset({
      nombrecompleto: {
        nombre: '',
        apellido: ''
      },
      correo: ''
    });

  }
}
