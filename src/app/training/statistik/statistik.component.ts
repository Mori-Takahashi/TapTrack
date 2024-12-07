import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule, NgForOf} from '@angular/common';

@Component({
  selector: 'app-statistik',
  imports: [
    NgForOf,
    CommonModule
  ],
  templateUrl: './statistik.component.html',
  styleUrl: './statistik.component.scss'
})
export class StatistikComponent implements OnInit {
  constructor(private router: Router) {}

  stats: any[] = []; // Daten aus LocalStorage
  level: number = 1; // Aktuelles Level
  xp: number = 0; // Aktuelle XP
  xpToNextLevel: number = 100; // XP für das nächste Level
  totalErrors: number = 0; // Gesamtzahl der Fehler
  averageSpeed: number = 0; // Durchschnittliche WPM
  mostWrongKey: string = 'Keine Fehler'; // Häufigster Fehler
  bestSpeed: number = 0; // Höchste Geschwindigkeit
  allSessions: any[] = []; // Alle gespeicherten Sessions

  ngOnInit() {
    this.loadStatistics();
    this.calculateLevel();
    this.calculateSummary();
  }

  loadStatistics() {
    const savedStats = JSON.parse(localStorage.getItem('typingStats') || '[]');
    this.stats = savedStats;
  }

  calculateXP(difficulty: string, speed: number): number {
    switch (difficulty) {
      case 'Leicht':
        return 5;
      case 'Mittel':
        return 10;
      case 'Schwer':
      case 'Random':
        return 15;
      case 'Zeitrennen':
        return speed < 156 ? 20 : 0;
      case 'Eigene Wörter':
        return 15;
      default:
        return 0;
    }
  }

/*Alt*/
  /*calculateLevel() {
    this.stats.forEach(stat => {
      const xpGained = this.calculateXP(stat.difficulty, stat.speed);
      this.xp += xpGained;

      // Level-Up
      while (this.xp >= this.xpToNextLevel) {
        this.level++;
        this.xp -= this.xpToNextLevel; // XP überschuss bleibt
      }
    });
  }*/

  /*neu*/
  calculateLevel() {
    this.stats.forEach(stat => {
      const xpGained = this.calculateXP(stat.difficulty, stat.speed);
      this.xp += xpGained;

      // Level-Up
      while (this.xp >= this.xpToNextLevel) {
        this.level++;
        this.xp -= this.xpToNextLevel; // Überschüssige XP werden übernommen
      }
    });
  }

  calculateSummary() {
    if (!this.stats.length) return;

    let totalSpeed = 0;
    const errorCounts: { [key: string]: number } = {};

    this.stats.forEach(stat => {
      totalSpeed += stat.speed;
      this.totalErrors += stat.errors;

      if (stat.errors > 0 && stat.mostWrongKey !== 'Keine Fehler') {
        errorCounts[stat.mostWrongKey] = (errorCounts[stat.mostWrongKey] || 0) + 1;
      }

      if (stat.speed > this.bestSpeed) {
        this.bestSpeed = stat.speed;
      }
    });

    this.averageSpeed = Math.round(totalSpeed / this.stats.length);

    if (Object.keys(errorCounts).length > 0) {
      this.mostWrongKey = Object.keys(errorCounts).reduce((a, b) =>
        errorCounts[a] > errorCounts[b] ? a : b
      );
    }

    this.allSessions = this.stats.reverse(); // Jüngste zuerst
  }


  home() {
    this.router.navigate(['/training']).then(r => {});
  }

}
