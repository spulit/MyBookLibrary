import { Component, OnInit, Input } from '@angular/core';
import {Cliente} from '../cliente';
import {ClienteService} from '../cliente.service';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import {ModalService} from './modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  private fotoSeleccionada: File;
  progress: number;

  constructor(private clienteService: ClienteService,
    private modalService: ModalService ) { }

  ngOnInit() {

  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progress = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image')<0){
      swal.fire('Error Upload:','File selected must be a picture', 'error');
      this.fotoSeleccionada = null;
    }

  }

  subirFoto(){
    if (!this.fotoSeleccionada){
      swal.fire('Error Upload:','Must to select a picture', 'error');
    }
    else {
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe( event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded/event.total);
      } else if (event.type === HttpEventType.Response){
        let response: any = event.body;
        this.cliente = response.cliente as Cliente;
        swal.fire('La foto se ha subido correctamente',response.mensaje, 'success');
      }
      //this.cliente = cliente;
      //swal.fire('La foto se ha subido correctamente','Con éxito ${this.cliente.foto}', 'success');
    })
    }
  }
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada  =null;
    this.progress = 0;
  }
}
