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
  "maj",
  "min",
  "maj7",
  "min7",
  "dom7",
]

const renderedChordTypes = [
  "",
  "m",
  "Δ7",
  "m7",
  "7"
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
