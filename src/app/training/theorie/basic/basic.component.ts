import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-basic',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss'
})
export class BasicComponent implements OnInit {
  topics: { id: number; title: string; description: string }[] = [];
  blogpost: { id: number;  title: string; text: string }[] = [];
  selectedPost: { id: number; title: string; text: string } | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTopics();
    this.loadBlogPosts();
    this.checkLogin()
  }

  checkLogin() {
    let name = localStorage.getItem('name');
    if (!name) {
      this.router.navigate(['/login']);
    }
  }

  home() {
    this.router.navigate(['/training']);
  }

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

  loadBlogPosts() {
    this.blogpost = [
      {
        id: 1,
        title: 'Grundregeln des 10-Finger-Schreibens',
        text: `Das 10-Finger-System basiert darauf, dass jeder Finger einer bestimmten Reihe und Tasten zugeordnet ist.
        Die Grundreihe besteht aus A, S, D, F (linke Hand) und J, K, L, ; (rechte Hand). Stelle sicher, dass du immer von der
        Grundreihe aus startest. Am Anfang ist Genauigkeit wichtiger als Geschwindigkeit. Schaue nicht auf die Tastatur,
        sondern trainiere dein Muskelgedächtnis, indem du regelmäßig übst.`
      },
      {
        id: 2,
        title: 'Tipps zur Handhaltung und Positionierung',
        text: `Eine korrekte Haltung reduziert Ermüdung und verbessert die Effizienz. Deine Hände sollten leicht gewölbt sein,
        mit den Fingern auf der Grundreihe. Vermeide, deine Handgelenke direkt auf der Tischplatte oder Tastatur abzulegen.
        Sitze gerade, mit einem 90-Grad-Winkel in deinen Ellbogen, und positioniere den Bildschirm auf Augenhöhe, um Nackenschmerzen
        zu vermeiden.`
      },
      {
        id: 3,
        title: 'Vorteile des 10-Finger-Systems',
        text: `Durch das 10-Finger-System kannst du deine Tippgeschwindigkeit und -genauigkeit drastisch steigern.
        Gleichzeitig entlastest du deine Hände, da die Arbeit gleichmäßig auf alle Finger verteilt wird. Du kannst dich
        vollständig auf den Inhalt konzentrieren, da du nicht mehr nach unten auf die Tastatur schauen musst. Für Berufe
        wie Programmierer oder Schriftsteller ist diese Fähigkeit nahezu unverzichtbar.`
      }
    ];
  }

  openTopic(topicId: number) {
    this.selectedPost = this.blogpost.find(post => post.id === topicId) || null;
  }

  closePost() {
    this.selectedPost = null;
  }

}
