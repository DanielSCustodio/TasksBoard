import React from 'react';
import Link from 'next/link';
import style from './styles.module.sass';
import SigInButton from '../SigInButton';

export default function Header() {
  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <div className={style.imgContent}>
          <Link href="/">
            <a>
              <img
                id={style['logo-desktop']}
                src="images/logo.svg"
                alt="logo TasksBoard"
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <img
                id={style['logo-mobile']}
                src="images/favicon.svg"
                alt="logo TasksBoard"
              />
            </a>
          </Link>
        </div>
        <div className={style.navContent}>
          <nav>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/board">
              <a>Minhas Tarefas</a>
            </Link>
          </nav>
        </div>
        <SigInButton />
      </div>
    </header>
  );
}
