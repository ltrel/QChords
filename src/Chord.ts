export class Note {
  letterIndex: number;
  accidentalIndex: number;

  constructor(letterIndex, accidentalIndex) {
    this.letterIndex = letterIndex
    this.accidentalIndex = accidentalIndex;
  }

  static fromStr(noteStr: string): Note {
    const letterIndex = noteStr.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    if (letterIndex < 0 || letterIndex > 6) throw new Error("Invalid note letter");

    let accidentalIndex;
    if (noteStr.length == 1) accidentalIndex = 1;
    else if (noteStr[1] == 'b') accidentalIndex = 0;
    else if (noteStr[1] == '#') accidentalIndex = 2;
    else throw new Error("Invalid accidental");

    return new Note(letterIndex, accidentalIndex);
  }

  printLetter(): string {
    return String.fromCharCode(this.letterIndex + 'A'.charCodeAt(0))
  }

  printAccidental(): string {
    switch (this.accidentalIndex) {
      case 0:
        return 'b';
      case 1:
        return '';
      case 2:
        return '#';
    }
  }

  print(): string {
    return this.printLetter() + this.printAccidental();
  }
}

const chordTypes = [
  // short form
  "maj",
  "min",
  "maj7",
  "min7",
  "dom7",
  // other triads
  "dim",
  "aug",
  // other sevenths
  "dim7",
  "min7b5",
  "maj7#5",
  "aug7",
  "minmaj7",
  // sus
  "sus4",
  "sus2",
  // sixths
  "maj6",
  "min6",
  "maj69",
  "min69",
  // ninths
  "maj9",
  "min9",
  "dom9",
  // extended
  "min11",
  "maj7#11",
  "dom13",
  "alt",
  // add9
  "majadd9",
  "minadd9",
]

const renderedChordTypes = [
  // short form
  "",
  "m",
  "Δ7",
  "m7",
  "7",
  // other triads
  "dim",
  "+",
  // other sevenths
  "dim7",
  "m7b5",
  "Δ7#5",
  "+7",
  "mΔ7",
  // sus
  "sus4",
  "sus2",
  // sixths
  "6",
  "m6",
  "6/9",
  "m6/9",
  // ninths
  "Δ9",
  "m9",
  "9",
  // extended
  "m11",
  "Δ7#11",
  "13",
  "alt",
  // add9
  "add9",
  "madd9",
]

export class Chord {
  root: Note;
  chordType: string;

  constructor(root: Note, chordType: string) {
    this.root = root;
    this.chordType = chordType;
  }

  renderChordType(): string {
    return renderedChordTypes[chordTypes.indexOf(this.chordType)];
  }
}
