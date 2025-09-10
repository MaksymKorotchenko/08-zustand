'use client';

import { createNote } from '@/lib/api';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import * as Yup from 'yup';
import type { FormValues, NoteTag } from '../../types/note';
import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import { useDraftStore } from '@/lib/store/noteStore';
import { useState } from 'react';

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too short')
    .max(50, 'Title is too long!')
    .required('Required'),
  content: Yup.string().max(500, 'Content is too long!'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required(),
});

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const onCancel = () => router.push('/notes/filter/All');
  const { draft, setDraft, clearDraft } = useDraftStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate: createMutation } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      router.push('/notes/filter/All');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSubmit = async (formData: FormData) => {
    try {
      const values = Object.fromEntries(formData) as unknown as FormValues;
      const validatedValues = await NoteSchema.validate(values, {
        abortEarly: false,
      });
      createMutation(validatedValues);
      clearDraft();
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach(error => {
          if (error.path) errors[error.path] = error.message;
        });
        setErrors(errors);
      }
    }
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          onChange={e => setDraft({ ...draft, title: e.target.value })}
          value={draft.title}
          id="title"
          type="text"
          name="title"
          className={css.input}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          onChange={e => setDraft({ ...draft, content: e.target.value })}
          value={draft.content}
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          onChange={e => setDraft({ ...draft, tag: e.target.value as NoteTag })}
          value={draft.tag}
          id="tag"
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>
      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
