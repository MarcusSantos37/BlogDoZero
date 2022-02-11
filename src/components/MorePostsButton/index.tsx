import Link from 'next/link';
import styles from './button.module.scss';

export default function MorePostsButton() {
  return (
    <button className={styles.morePostsButton} type="button">
      Carregar mais posts
    </button>
  );
}
