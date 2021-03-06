import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
import { ClienteService } from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {Partner} from './partner'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo:string = 'Dar de alta trabajador';
  private errores:string[];
  partners:Partner[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private  activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    this.clienteService.getPartners().subscribe(partners => this.partners = partners)
  }

  public cargarCliente(): void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if (id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: 'Congrats!',
          text: `Trabajador creado con éxito:  ${cliente.nombre}`,
          type: 'success',
          confirmButtonText: 'Cool'
        })
      },
    err => {
      this.errores  =err.error.error as string[];
      console.error('Código de error desde Bckend: ' + err.status);
      console.error(err.error.error);
    });
  }

  public  update(): void{
    this.clienteService.update(this.cliente).subscribe(
      resp => {
      this.router.navigate(['/clientes']);
      Swal.fire({
        title: 'Congrats User updated!',
        text: `${resp.mensaje} : ${resp.cliente.nombre}`,
        type: 'success',
        confirmButtonText: 'Cool'
      })
    },
    err => {
    this.errores  =err.error.errors as string[];
    console.error('Código de error desde Bckend: ' + err.status);
    console.error(err.error.errors);
  })
  }

  compararPartner(partner1: Partner, partner2: Partner) : boolean {
    if (partner1 === undefined && partner2 === undefined){
      return true;
    }
    return partner1 === null || partner2 === null ||partner1 === undefined || partner2 === undefined ? false : partner1.id===partner2.id;
  }

}
