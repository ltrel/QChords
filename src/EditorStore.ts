import { create } from "zustand";
import { Chord } from "./Chord";

interface EditorState {
  measures: Chord[][];
  update: (measureIndex: number, beatIndex: number, newChord: Chord) => void;
  addMeasure: () => void;
  removeMeasure: () => void;
  loadChart: (chart: Chord[][]) => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  measures: [],
  update: (measureIndex, beatIndex, newChord) =>
    set((state) => {
      const newMeasures = [...state.measures];
      newMeasures[measureIndex][beatIndex] = newChord;
      return { measures: newMeasures };
    }),
  addMeasure: () =>
    set((state) => ({ measures: [...state.measures, Array(4).fill(null)] })),
  removeMeasure: () =>
    set((state) => ({
      measures: state.measures.slice(0, state.measures.length - 1),
    })),
  loadChart: (chart) => set({ measures: chart }),
}));
