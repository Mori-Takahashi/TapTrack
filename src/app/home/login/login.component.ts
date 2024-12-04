import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  isNameAvailable: boolean = false;
  storedName: string | null = null;

  ngOnInit() {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    this.storedName = localStorage.getItem('name');
    this.isNameAvailable = this.storedName !== null;
  }

  openWindow() {
    let container = document.getElementById('name_window');
    if (container) {
      container.classList.remove('d-none');
    }
  }

  close() {
    let container = document.getElementById('name_window');
    if (container) {
      container.classList.add('d-none');
    }
  }

  setNameInLogin() {
    let nameElement = document.getElementById('userName') as HTMLInputElement;
    if (nameElement) {
      localStorage.removeItem('name');
      let name = nameElement.value;
      if (name) {
        localStorage.setItem('name', name);
        window.location.href = '/training';
      }
    }
  }
}
