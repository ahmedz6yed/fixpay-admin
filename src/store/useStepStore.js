// src/store/useFormStore.js
import { create } from 'zustand'

export const useFormStore = create((set, get) => ({

  // ── Step Control ──────────────────────────
  currentStep: 1,
  totalSteps: 5,

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  goToStep: (step) => set({ currentStep: step }),

  // ── Form Data (one slice per step) ────────
  personalInfo: { firstName: '', lastName: '', email: '' },
  addressInfo:  { street: '', city: '', country: '' },
  accountInfo:  { username: '', password: '' },
  planInfo:     { plan: 'free' },
  reviewInfo:   { agreed: false },

  // ── Update a specific step's data ─────────
  updateStep: (stepKey, data) =>
    set((state) => ({
      [stepKey]: { ...state[stepKey], ...data },
    })),

  // ── Validation per step ───────────────────
  isStepValid: () => {
    const { currentStep, personalInfo, accountInfo } = get()
    switch (currentStep) {
      case 1: return personalInfo.firstName && personalInfo.email
      case 2: return true  // address optional
      case 3: return accountInfo.username && accountInfo.password.length >= 6
      case 4: return true
      case 5: return true
      default: return false
    }
  },

  // ── Submit ────────────────────────────────
  submitForm: () => {
    const { personalInfo, addressInfo, accountInfo, planInfo } = get()
    const payload = { ...personalInfo, ...addressInfo, ...accountInfo, ...planInfo }
    console.log('Submitting:', payload)
    // call your API here
  },

  // ── Reset ─────────────────────────────────
  resetForm: () =>
    set({
      currentStep: 1,
      personalInfo: { firstName: '', lastName: '', email: '' },
      addressInfo:  { street: '', city: '', country: '' },
      accountInfo:  { username: '', password: '' },
      planInfo:     { plan: 'free' },
      reviewInfo:   { agreed: false },
    }),
}))