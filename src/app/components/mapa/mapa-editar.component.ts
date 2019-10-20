import { Component, OnInit, Inject } from '@angular/core';

// Para el dialog
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// Para el formulario del HTML
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {

  forma: FormGroup;

  constructor( public fb: FormBuilder,
               public dialogRef: MatDialogRef<MapaEditarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.forma = fb.group({
        'titulo': data.titulo,
        'desc': data.desc
      });
     }

  ngOnInit() {
  }

  guardarCambios() {
    // Cuando se cierra al modal (pulsado el botón Aceptar del dialogo) envia el contenido del formulario a mapa.component.ts
    this.dialogRef.close(this.forma.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
