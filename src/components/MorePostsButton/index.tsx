import Link from 'next/link';
import styles from './button.module.scss';

export default function MorePostsButton({
  ...props
}: React.HTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button className={styles.morePostsButton} type="button" {...props}>
      Carregar mais posts
    </button>
  );
}
