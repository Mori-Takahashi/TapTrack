import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistik',
  imports: [],
  templateUrl: './statistik.component.html',
  styleUrl: './statistik.component.scss'
})
export class StatistikComponent {
  constructor(private router: Router) {}

  home() {
    this.router.navigate(['/training']).then(r => {});
  }

}
