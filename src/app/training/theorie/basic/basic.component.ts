import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basic',
  imports: [],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss'
})
export class BasicComponent {

  constructor(private router: Router) {}

  home() {
    this.router.navigate(['/training']);
  }
}
