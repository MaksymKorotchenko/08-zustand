import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create a new note',
  description: 'Create your personal to-do note',
  openGraph: {
    title: 'NoteHub',
    description: 'Create and manage your to-do tasks ',
    url: 'https://08-zustand-sandy-eight.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 650,
        alt: 'NoteHub page image',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
