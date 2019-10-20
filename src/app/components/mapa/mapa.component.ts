import { Component, OnInit } from '@angular/core';
import { Marcador } from '../classes/marcador.class';

import {MatSnackBar} from '@angular/material/snack-bar';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor( private matSnackBar: MatSnackBar, public dialog: MatDialog) {
    if ( localStorage.getItem('marcadores')) {
      // Hay que transformar el String en un objeto de nuevo
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcador( evento ){
    // evento.coords devuelve una latitud y una longitud
    const coords = evento.coords;
    const nuevoMarcador = new Marcador( coords.lat, coords.lng );
    this.marcadores.push( nuevoMarcador );
    this.guardarStorage();

    this.matSnackBar.open('Marcador agregado', 'Cerrar', {
      duration: 2000,
    });
  }

  guardarStorage() {
    // En el localStorage solo se pueden guardar Strings, por eso el JSON.stringify
    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ));
  }

  borrarMarcador(index: number) {
    // Borra del array el elemento indicado con index
    this.marcadores.splice(index, 1);
    this.guardarStorage();
    this.matSnackBar.open('Marcador eliminado', 'Cerrar', {
      duration: 2000,
    });
  }

  editarMarcador( marcador: Marcador ){
      const dialogRef = this.dialog.open( MapaEditarComponent, {
        width: '250px',
        data: {titulo: marcador.titulo, desc: marcador.desc}
      });

      dialogRef.afterClosed().subscribe(resultado => {
        console.log(resultado);

        if ( !resultado ) {
          return;
        }

        marcador.titulo = resultado.titulo;
        marcador.desc = resultado.desc;

        this.guardarStorage();

        this.matSnackBar.open('Marcador actualizado', 'Cerrar', {
          duration: 2000,
        });
      });
    }

}
