import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-training',
  imports: [],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit {

  name: string | null = '';

  ngOnInit() {
    this.name = localStorage.getItem('name');
  }


  showOptions() {
    let element = document.getElementById("options");
    if (element) {
      element.classList.add("show-options");
      element.classList.add("slide-in-left");
      element.classList.remove("d-none");
    }
  }

  hideOption() {
    let element = document.getElementById("options");
    if (element) {
      element.classList.remove("slide-in-left");
      element.classList.add("slide-out-left")
      setTimeout(() => {
        element.classList.add("d-none");
        element.classList.remove("show-options");
        element.classList.remove("slide-out-left");
      }, 500);
    }
  }

}
