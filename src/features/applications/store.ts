// store.ts
import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

export type MultipuleAnswersT =
  | "checkbox"
  | "multipulechoice"
  | "text"
  | "stars";

export type Question = {
  id: string;
  text: string;
  type: MultipuleAnswersT | "text" | "stars";
  answers?: string[];
  starRating?: number;
};

const defaultQuestions: Question[] = [
  {
    id: "f51d498b-f894-49aa-9dd8-ba1df61790aa",
    text: "New Question",
    type: "multipulechoice",
    answers: ["Option 1"],
    starRating: 5,
  },
];

type SurveyState = {
  questions: Question[];
  addQuestion: (question?: Partial<Question>) => void;
  updateQuestion: (id: string, newData: Partial<Question>) => void;
  reorderQuestions: (oldIndex: number, newIndex: number) => void;
  removeQuestion: (id: string) => void;
  getQuestionCount: () => number;
};

export const useSurveyStore = create<SurveyState>((set, get) => ({
  questions: defaultQuestions,
  addQuestion: (question = {}) =>
    set((state) => ({
      questions: [
        ...state.questions,
        {
          id: uuidv4(),
          text: "New Question",
          type: "multipulechoice",
          answers: ["Option 1"],
          starRating: 5,
          ...question,
        },
      ],
    })),
  updateQuestion: (id, newData) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...newData } : q
      ),
    })),
  reorderQuestions: (oldIndex, newIndex) =>
    set((state) => ({
      questions: arrayMove(state.questions, oldIndex, newIndex),
    })),
  removeQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),
  getQuestionCount: () => get().questions.length,
}));
