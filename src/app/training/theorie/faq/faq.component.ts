import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {

  constructor(private router: Router) {
  }

  home() {
    this.router.navigate(['/training']);
  }

  clearLocalStorage() {
    localStorage.removeItem("typingStats");
    localStorage.removeItem("name");
    console.log("Die Einträge 'typingStats' und 'name' wurden aus dem Local Storage gelöscht.");
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

}
