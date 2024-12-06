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
  customJSON: string = '';


  constructor(private router: Router) {}

  ngOnInit() {
    this.loadExercises();
  }

  overlayOnOff: boolean = true;


  home() {
    this.router.navigate(['/training']);
  }



  loadExercises() {
    this.exercises = [
      {
        id: 1,
        difficulty: 'Leicht',
        description: 'Hier sind einfache kleine Wörter.',
        data: ['Haus', 'Baum', 'Auto', 'Katze', 'Hund']
      },
      {
        id: 2,
        difficulty: 'Mittel',
        description: 'Hier sind einfache kleine Sätze.',
        data: [
          'Die Katze schläft.',
          'Das Auto ist rot.',
          'Ich gehe nach Hause.',
          'Das Wetter ist schön.'
        ]
      },
      {
        id: 3,
        difficulty: 'Schwer',
        description: 'Hier sind Sätze mit Komma und Punkt.',
        data: [
          'Wenn ich nach Hause komme, werde ich erst einmal essen.',
          'Das Buch, das ich gelesen habe, war wirklich spannend.'
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
        data: 'Das 10-Finger-Schreiben ist eine grundlegende Fähigkeit, die es dir ermöglicht, effizient und präzise zu tippen.'
      },
      {
        id: 6,
        difficulty: 'Eigene Wörter',
        description: 'Hier kannst du deine eigenen Wörter oder Sätze als JSON einfügen.',
        data: []
      }
    ];
  }

  selectExercise(id: number) {
    if (id === 6) {
      this.selectedExercise = { id, difficulty: 'Eigene Wörter', description: '', data: '' };
      this.customJSON = '';
      this.overlayOnOff = false;
      this.openCloseOverlay();
    } else {
      this.selectedExercise = this.exercises.find(exercise => exercise.id === id) || null;
      this.userInput = '';
      this.stats = null;
      this.errorCount = {};
      this.overlayOnOff = true;
      this.openCloseOverlay();
      if (this.selectedExercise) {
        this.startCountdown();
      }
    }
  }

  validateCustomJSON() {
    try {
      const parsedJSON = JSON.parse(this.customJSON);

      if (parsedJSON.data && Array.isArray(parsedJSON.data)) {
        this.selectedExercise = {
          id: 6,
          difficulty: 'Eigene Wörter',
          description: 'Benutzerdefiniertes JSON',
          data: parsedJSON.data.join(' ')
        };

        setTimeout(() => {
          this.startCountdown();
          this.overlayOnOff = true;
          this.openCloseOverlay();
        }, 500);
      } else {
        alert('Ungültiges JSON-Format. Es wird ein Array mit dem Schlüssel "data" erwartet.');
      }
    } catch (e) {
      alert('Ungültiges JSON. Bitte überprüfe die Syntax.');
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

    let currentTest = Array.isArray(this.selectedExercise.data)
      ? this.selectedExercise.data.join(' ')
      : this.selectedExercise.data;

    let nextChar = currentTest[this.userInput.length];
    let keyPressed = event.key;

    let ignoredKeys = ['Enter', 'Backspace'];

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
    const timeTaken = (endTime - this.startTime) / 1000;

    const errors = Object.values(this.errorCount).reduce((acc, curr) => acc + curr, 0);
    const speed = Math.round((testText.length / timeTaken) * 60);
    const mostWrongKey = Object.keys(this.errorCount).length > 0
      ? Object.keys(this.errorCount).reduce((a, b) =>
        this.errorCount[a] > this.errorCount[b] ? a : b
      )
      : 'Keine Fehler';

    this.stats = { errors, speed, mostWrongKey };
    this.saveStatistics();
  }

  saveStatistics() {
    if (!this.selectedExercise || !this.stats) return;

    const stats = JSON.parse(localStorage.getItem('typingStats') || '[]');

    stats.push({
      difficulty: this.selectedExercise.difficulty,
      ...this.stats,
      timestamp: new Date().toISOString()
    });

    localStorage.setItem('typingStats', JSON.stringify(stats));
  }

  clearSelection() {
    this.selectedExercise = null;
    this.countdown = 0;
    this.isTyping = false;
    this.customJSON = '';
  }

  openCloseOverlay() {
    setTimeout(() => {
      let element = document.getElementById('overlay');
      console.log('Element gefunden:', element !== null);
      if (element) {
        console.log('OverlayOnOff:', this.overlayOnOff);
        if (this.overlayOnOff) {
          element.classList.remove("d-none");
        } else {
          element.classList.add("d-none");
        }
      }
    }, 200);
  }

  protected readonly Array = Array;
}
