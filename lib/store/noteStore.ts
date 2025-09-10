import { FormValues, NoteTag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DraftStore = {
  draft: {
    title: string;
    content: string;
    tag: NoteTag;
  };
  setDraft: (newDraft: FormValues) => void;
  clearDraft: () => void;
};

const initialDraft: FormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useDraftStore = create<DraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: newDraft => set({ draft: newDraft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'task-draft',
      partialize: state => ({
        draft: state.draft,
      }),
    }
  )
);
