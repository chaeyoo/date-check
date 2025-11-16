// stores/bookingStore.ts
"use client";

import { create } from "zustand";
import type { Hospital, OptionalExam } from "@/lib/fakeData";

type Step = "SELECT_HOSPITAL" | "SELECT_DATE_EXAM" | "REVIEW";

export type BookingDraft = {
  memberId: string | null;
  memberName: string | null;
  hospital: Hospital | null;
  preferredDates: string[];            // "2025-12-01" 같은 ISO 문자열
  optionalExams: OptionalExam[];
};

type BookingStore = {
  step: Step;
  draft: BookingDraft;
  // actions
  startBooking: (memberId: string, memberName: string) => void;
  selectHospital: (hospital: Hospital) => void;
  setPreferredDates: (dates: string[]) => void;
  toggleOptionalExam: (exam: OptionalExam) => void;
  goToStep: (step: Step) => void;
  reset: () => void;
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  step: "SELECT_HOSPITAL",
  draft: {
    memberId: null,
    memberName: null,
    hospital: null,
    preferredDates: [],
    optionalExams: [],
  },
  startBooking: (memberId, memberName) =>
    set({
      step: "SELECT_HOSPITAL",
      draft: {
        memberId,
        memberName,
        hospital: null,
        preferredDates: [],
        optionalExams: [],
      },
    }),
  selectHospital: (hospital) =>
    set((state) => ({
      draft: { ...state.draft, hospital },
      step: "SELECT_DATE_EXAM",
    })),
  setPreferredDates: (dates) =>
    set((state) => ({
      draft: { ...state.draft, preferredDates: dates },
    })),
  toggleOptionalExam: (exam) =>
    set((state) => {
      const exists = state.draft.optionalExams.some((e) => e.id === exam.id);
      return {
        draft: {
          ...state.draft,
          optionalExams: exists
            ? state.draft.optionalExams.filter((e) => e.id !== exam.id)
            : [...state.draft.optionalExams, exam],
        },
      };
    }),
  goToStep: (step) => set({ step }),
  reset: () =>
    set({
      step: "SELECT_HOSPITAL",
      draft: {
        memberId: null,
        memberName: null,
        hospital: null,
        preferredDates: [],
        optionalExams: [],
      },
    }),
}));
