import { create } from "zustand";

const INITIAL_FORM_DATA = {};

export const useStepStore = create((set) => ({
  step: 1,
  formData: INITIAL_FORM_DATA,

  // Navigation with bounds checking
  nextStep: () =>
    set((state) => ({
      step: state.step < 5 ? state.step + 1 : state.step,
    })),

  prevStep: () =>
    set((state) => ({
      step: state.step > 1 ? state.step - 1 : state.step,
    })),

  setStep: (step) => 
    set(() => ({ 
      step: Math.min(Math.max(step, 1), 5) 
    })),

  // Flattened update: merges all properties into the root formData object
  updateForm: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),

  // Reset to original clean state
  reset: () =>
    set({
      step: 1,
      formData: INITIAL_FORM_DATA,
    }),
}));
