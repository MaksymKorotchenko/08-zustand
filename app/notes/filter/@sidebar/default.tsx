import Link from 'next/link';
import css from './SidebarNotes.module.css';

const TagNames = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarNotes() {
  return (
    <aside>
      <ul className={css.menuList}>
        {TagNames.map(category => (
          <li className={css.menuItem} key={category}>
            <Link href={`/notes/filter/${category}`} className={css.menuLink}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
