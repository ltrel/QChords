import { create } from "zustand";
import { Chord } from "./Chord";

interface EditorState {
  measures: Chord[][];
  beatsPerBar: number;
  updateChord: (measureIndex: number, beatIndex: number, newChord: Chord) => void;
  updateTimeSig: (newBeatsPerBar: number) => void;
  addMeasure: () => void;
  removeMeasure: () => void;
  loadChart: (measures: Chord[][], beatsPerBar: number) => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  measures: [],
  beatsPerBar: 4,

  updateChord: (measureIndex, beatIndex, newChord) =>
    set((state) => {
      const newMeasures = [...state.measures];
      newMeasures[measureIndex][beatIndex] = newChord;
      return { measures: newMeasures };
    }),

  updateTimeSig: (newBeatsPerBar) => set((state) => {
    const diff = newBeatsPerBar - state.beatsPerBar;
    const newMeasures = state.measures.map((measure) => {
      if (diff > 0) {
        return measure.concat(Array(diff).fill(null));
      } else {
        return measure.slice(0, newBeatsPerBar);
      }
    })
    return { measures: newMeasures, beatsPerBar: newBeatsPerBar };
  }),

  addMeasure: () =>
    set((state) => ({ measures: [...state.measures, Array(state.beatsPerBar).fill(null)] })),

  removeMeasure: () =>
    set((state) => ({
      measures: state.measures.slice(0, state.measures.length - 1),
    })),

  loadChart: (measures, beatsPerBar) => set({ measures: measures, beatsPerBar: beatsPerBar }),
}));
