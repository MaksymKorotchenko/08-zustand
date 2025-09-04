'use client';

import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import { useState } from 'react';

export default function Header() {
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu
              isOpen={isTagsOpen}
              onEnter={() => setIsTagsOpen(true)}
              onLeave={() => setIsTagsOpen(false)}
            ></TagsMenu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
