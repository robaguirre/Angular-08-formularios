import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent {

  usuario = {
    nombre: 'Roberto',
    apellido: 'Agirre',
    correo: ''
  };

  constructor() { }


  guardar(f: NgForm) {
    console.log(f);
    console.log(f.value);
    console.log('Usuario', this.usuario);
  }
}
