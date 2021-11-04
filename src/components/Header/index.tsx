import styles from './styles.module.scss';
import Image from "next/image";
import { SignButton } from '../SignInButton';
import React from 'react';
import Link from 'next/Link';
import { ActiveLink } from '../ActiveLink';

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
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignButton />
      </div>
    </header>
  )
}