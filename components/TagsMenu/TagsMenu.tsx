'use client';

import Link from 'next/link';
import css from './TagsMenu.module.css';

const TagNames = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

interface TagsMenuProps {
  onEnter: () => void;
  onLeave: () => void;
  isOpen: boolean;
}

export default function TagsMenu({ onEnter, onLeave, isOpen }: TagsMenuProps) {
  return (
    <div onMouseEnter={onEnter} className={css.menuContainer}>
      <button className={css.menuButton}>
        {isOpen ? 'Notes ▾' : 'Notes ▴'}
      </button>
      {isOpen && (
        <ul
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className={css.menuList}
        >
          {TagNames.map(category => (
            <li className={css.menuItem} key={category}>
              <Link
                onClick={onLeave}
                href={`/notes/filter/${category}`}
                className={css.menuLink}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
