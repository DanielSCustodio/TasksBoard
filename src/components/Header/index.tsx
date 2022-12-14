/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import style from './styles.module.sass';
import SignOutButton from '../SignOutButton';

export default function Header() {
  const [session] = useSession();

  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <div className={style.imgContent}>
          <Link href="/">
            <a>
              <img
                id={style['logo-desktop']}
                src="/images/logo.svg"
                alt="logo TasksBoard"
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <img
                id={style['logo-mobile']}
                src="/images/favicon.svg"
                alt="logo TasksBoard"
              />
            </a>
          </Link>
        </div>
        <div className={style.navContent}>
          {session && (
            <nav>
              <Link href="/">
                <a>Início</a>
              </Link>
              <Link href="/tarefas">
                <a>Tarefas</a>
              </Link>
              <Link href="apoia-se/">
                <a>Apoia-se</a>
              </Link>
            </nav>
          )}
        </div>
        <SignOutButton />
      </div>
    </header>
  );
}
