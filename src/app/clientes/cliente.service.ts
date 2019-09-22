import { Injectable } from '@angular/core';
import { formatDate, DatePipe} from '@angular/common';

// import {CLIENTES} from './clientes.json';
import {Cliente} from './cliente';
import {of, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/trabajadores';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router:Router) { }

  getClientes(page : number): Observable<any>{
    // return of(CLIENTES);
    console.log(' llegué '  + page);
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map( (response : any) => {

        (response.content as Cliente[]).map((cliente : Cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');

          let datePipe = new DatePipe('es');
          cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          return cliente;
        });
        return response;
      })
    );
  }

  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post(this.urlEndPoint,cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError( e => {
        if(e.status == 500){
          return throwError(e);
        }
        Swal.fire({
          title: 'Error al guardar',
          text: e.error.mensaje,
          type: 'error',
          confirmButtonText: 'Cachis'
        });
        return throwError(e);
      })
    );

  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(err => {
        this.router.navigate(['/clientes']);
        // console.log(err.error.mensaje);
        Swal.fire({
          title: `Error al recoger la informacion ${id}`,
          text: err.error.mensaje,
          type: 'error',
          confirmButtonText: 'Cachis'
        });
        return throwError(err);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        if(e.status == 500){
          return throwError(e);
        }
        Swal.fire({
          title: 'Error al editar',
          text: e.error.mensaje,
          type: 'error',
          confirmButtonText: 'Cachis'
        });
        return throwError(e);
      })
    );
  }

  delete(id: number):  Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        // console.log(err.error.mensaje);
        Swal.fire({
          title: `Error al borrar trabajador ${id}`,
          text: e.error.mensaje,
          type: 'error',
          confirmButtonText: 'Pos que se le va a hacer'
        });
        return throwError(e);
      })
    );
  }

}
