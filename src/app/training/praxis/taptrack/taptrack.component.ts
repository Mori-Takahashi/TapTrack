import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-taptrack',
  imports: [
    NgIf,
    CommonModule,
    FormsModule
  ],
  templateUrl: './taptrack.component.html',
  styleUrl: './taptrack.component.scss'
})
export class TaptrackComponent implements OnInit{
  exercises: { id: number; difficulty: string; description: string; data: string[] | string }[] = [];
  selectedExercise: { id: number; difficulty: string; description: string; data: string[] | string } | null = null;
  countdown: number = 0;
  isTyping: boolean = false;
  userInput: string = '';
  startTime: number = 0;
  stats: { errors: number; speed: number; mostWrongKey: string } | null = null;
  errorCount: { [key: string]: number } = {};


  constructor(private router: Router) {}

  ngOnInit() {
    this.loadExercises();
  }


  home() {
    this.router.navigate(['/training']);
  }







  loadExercises() {
    this.exercises = [
      {
        id: 1,
        difficulty: 'Leicht',
        description: 'Hier sind einfache kleine Wörter.',
        data: ['Haus', 'Baum', 'Auto', 'Katze', 'Hund', 'Brot', 'Tisch', 'Stuhl', 'Lampe', 'Buch']
      },
      {
        id: 2,
        difficulty: 'Mittel',
        description: 'Hier sind einfache kleine Sätze.',
        data: [
          'Die Katze schläft.',
          'Das Auto ist rot.',
          'Ich gehe nach Hause.',
          'Das Wetter ist schön.',
          'Er liest ein Buch.'
        ]
      },
      {
        id: 3,
        difficulty: 'Schwer',
        description: 'Hier sind Sätze mit Komma und Punkt.',
        data: [
          'Wenn ich nach Hause komme, werde ich erst einmal essen.',
          'Das Buch, das ich gelesen habe, war wirklich spannend.',
          'Heute scheint die Sonne, aber morgen soll es regnen.',
          'Ich mag Schokolade, Kekse und Kuchen.',
          'Bevor wir losfahren, sollten wir die Route planen.'
        ]
      },
      {
        id: 4,
        difficulty: 'Random',
        description: '20 zufällige Wörter.',
        data: [
          'Apfel', 'Schule', 'Laptop', 'Fenster', 'Straße', 'Blume', 'Zug', 'Wasser',
          'Stadt', 'Kuchen', 'Gitarre', 'Film', 'Uhr', 'Bleistift', 'Lampe', 'Zebra',
          'Schuhe', 'Telefon', 'Tür', 'Papier'
        ]
      },
      {
        id: 5,
        difficulty: 'Zeitrennen',
        description: 'Hier bekommst du einen Text, den du so schnell wie möglich abtippen musst.',
        data: 'Das 10-Finger-Schreiben ist eine grundlegende Fähigkeit, die es dir ermöglicht, effizient und präzise zu tippen. Mit ausreichend Übung kannst du deine Geschwindigkeit und Genauigkeit stetig verbessern.'
      }
    ];
  }

  selectExercise(id: number) {
    this.selectedExercise = this.exercises.find(exercise => exercise.id === id) || null;
    this.userInput = '';
    this.stats = null;
    this.errorCount = {};
    if (this.selectedExercise) {
      this.startCountdown();
    }
  }

  startCountdown() {
    this.countdown = 3;
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.startTyping();
      }
    }, 1000);
  }

  startTyping() {
    this.isTyping = true;
    this.startTime = performance.now();
  }

  onKeyPress(event: KeyboardEvent) {
    if (!this.isTyping || !this.selectedExercise) return;

    const currentTest = Array.isArray(this.selectedExercise.data)
      ? this.selectedExercise.data.join(' ')
      : this.selectedExercise.data;

    const nextChar = currentTest[this.userInput.length];
    const keyPressed = event.key;

    const ignoredKeys = ['Enter', 'Backspace'];

    if (ignoredKeys.includes(keyPressed)) {
      return;
    }

    if (keyPressed === nextChar) {
      this.userInput += keyPressed;
    } else {
      this.errorCount[keyPressed] = (this.errorCount[keyPressed] || 0) + 1;
    }

    if (this.userInput === currentTest) {
      this.finishTyping(currentTest);
    }
  }

  finishTyping(testText: string) {
    this.isTyping = false;
    const endTime = performance.now();
    const timeTaken = (endTime - this.startTime) / 1000; // in Sekunden

    // Fehleranzahl berechnen (initialer Wert: 0)
    const errors = Object.values(this.errorCount).reduce((acc, curr) => acc + curr, 0);

    // Tippgeschwindigkeit berechnen (Wörter pro Minute)
    const speed = Math.round((testText.length / timeTaken) * 60); // WPM

    // Meist falsch gedrückte Taste bestimmen (optional, wenn Fehler existieren)
    const mostWrongKey = Object.keys(this.errorCount).length > 0
      ? Object.keys(this.errorCount).reduce((a, b) =>
        this.errorCount[a] > this.errorCount[b] ? a : b
      )
      : 'Keine Fehler';

    this.stats = { errors, speed, mostWrongKey };
    this.saveStatistics();
  }

  saveStatistics() {
    const stats = JSON.parse(localStorage.getItem('typingStats') || '[]');
    stats.push({ ...this.stats, timestamp: new Date().toISOString() });
    localStorage.setItem('typingStats', JSON.stringify(stats));
  }

  clearSelection() {
    this.selectedExercise = null;
    this.countdown = 0;
    this.isTyping = false;
  }

  protected readonly Array = Array;
}
