import css from './Home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found Page',
  description: 'Error 404/Not Found Page',
  openGraph: {
    title: 'Not Found Page',
    description: 'Error 404/Not Found Page',
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

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
