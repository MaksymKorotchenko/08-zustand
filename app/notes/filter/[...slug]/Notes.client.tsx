'use client';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './NotesPage.module.css';
import Link from 'next/link';

type NotesProps = {
  category: string;
};

export default function Notes({ category }: NotesProps) {
  const [searchNote, setSearchNote] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearchNote = useDebouncedCallback((value: string) => {
    setSearchNote(value);
    setPage(1);
  }, 1000);

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', searchNote, page, category],
    queryFn: () => fetchNotes(searchNote, page, 12, category),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox text={searchNote} onSearch={debouncedSearchNote} />
          {isSuccess && data?.totalPages > 1 && (
            <Pagination
              totalPages={data?.totalPages || 0}
              currentPage={page}
              onClick={({ selected }) => setPage(selected + 1)}
            />
          )}
          <Link href={'/notes/action/create'} className={css.button}>
            Create note +
          </Link>
        </header>
        {data && isSuccess && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}
