'use client';

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {error && !note && <p>Something went wrong.</p>}
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
          <button onClick={() => router.back()} className={css.backBtn}>
            Back to notes
          </button>
        </div>
      </div>
    </Modal>
  );
}
