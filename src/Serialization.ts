import { Chord, Note } from "./Chord";

interface SerializedChart {
    beatsPerBar: number;
    beatType: 'half' | 'quarter' | 'eighth' | 'sixteenth';
    bpm: number;
    chords: Array<{
        root: string;
        chordType: string;
        beats: number;
        bass?: string;
    }>;
}

export function collapseFromMeasures(measures: Chord[][], beatsPerBar: number): SerializedChart {
  const flatBeats = measures.flat();
  const serializedChords = [];

  let beatIndex = 0;
  while (beatIndex < flatBeats.length) {
    const currentChord = flatBeats[beatIndex];
    let currentDuration = 1;
    beatIndex += 1;
    while (!flatBeats[beatIndex] && beatIndex < flatBeats.length) {
      currentDuration += 1;
      beatIndex += 1;
    }
    serializedChords.push({
      root: currentChord.root.print(),
      chordType: currentChord.chordType,
      beats: currentDuration,
    })
  }

  return {
    beatsPerBar: beatsPerBar,
    beatType: 'quarter',
    bpm: 120,
    chords: serializedChords,
  };
}

export function expand(serializedChart: SerializedChart): Chord[][] {
  const flatBeats: Chord[] = [];
  serializedChart.chords.forEach((serializedChord) => {
    flatBeats.push(new Chord(Note.fromStr(serializedChord.root), serializedChord.chordType));
    flatBeats.push(...Array(serializedChord.beats - 1).fill(null));
  });

  const measures: Chord[][] = [];
  flatBeats.forEach((beat, index) => {
    if(index % serializedChart.beatsPerBar == 0) {
      measures.push([])
    }
    measures[measures.length - 1].push(beat)
  })
  return measures;
}
