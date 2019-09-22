import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myBookLibrary';
  curso: string = 'Curso spring cn Angular 7';
  profesor: string = 'Andrés Guzmán';
}
