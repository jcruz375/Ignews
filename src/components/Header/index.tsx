import styles from './styles.module.scss';
import Image from "next/image";
import { SignButton } from '../SignInButton';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          width="100"
          height="300"
          alt="ig.news seu blog de tecnologia"
        />
        <nav>
          <a href="" className={styles.active}>Home</a>
          <a href="">Posts</a>
        </nav>
        <SignButton />
      </div>
    </header>
  )
}