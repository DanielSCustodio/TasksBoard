import React from 'react';
import Link from 'next/link';
import styles from './styles.module.sass';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>
        <span>404</span> - Ops, parece que você se perdeu.
      </h1>
      <Link href="/">
        <a>↩ Voltar ao início</a>
      </Link>
    </div>
  );
}
