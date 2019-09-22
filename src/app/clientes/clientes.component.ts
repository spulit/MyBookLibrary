import { Component, OnInit } from '@angular/core';
import {Cliente } from './cliente';
// import {CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[];
  paginador: any;

  constructor(private clienteService: ClienteService, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number;
      page = +params.get('page');
      if (!page){
        page = 0;
      }
      this.clienteService.getClientes(page).subscribe(
        response => {this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });
  }

  delete(cliente : Cliente): void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            `Your user ${cliente.nombre} has been deleted.`,
            'success'
          )
          this.clientes = this.clientes.filter(cli => cli !== cliente);
        })
      }
    })
  }

}
