import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-basic',
  imports: [
    NgForOf
  ],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss'
})
export class BasicComponent implements OnInit {
  topics: { id: number; title: string; description: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTopics();
  }

  home() {
    this.router.navigate(['/training']);
  }

  openTopic(topicId: number) {
    console.log(`Opening topic with ID: ${topicId}`);
  }


  /*TODO: Später über JSON einbinden!!*/
  loadTopics() {
    this.topics = [
      {
        id: 1,
        title: 'Grundregeln des 10-Finger-Schreibens',
        description: 'Lerne die wichtigsten Regeln für das effiziente Tippen mit dem 10-Finger-System. Von der richtigen Startposition bis zu Bewegungsabläufen.'
      },
      {
        id: 2,
        title: 'Tipps zur Handhaltung und Positionierung',
        description: 'Erfahre, wie du deine Hände, Handgelenke und deinen Körper richtig positionierst, um bequem und ergonomisch zu tippen.'
      },
      {
        id: 3,
        title: 'Vorteile des 10-Finger-Systems',
        description: 'Entdecke die Vorteile des 10-Finger-Schreibens, von schnellerem Tippen bis zu weniger Ermüdung bei langen Schreibsessions.'
      }
    ];
  }
}
