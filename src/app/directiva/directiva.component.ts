import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent implements OnInit {

  listaCurso : string[] = ['Type', 'Javascript', 'Java', 'Angular', 'C#'];
  constructor() { }

  ngOnInit() {
  }

}
