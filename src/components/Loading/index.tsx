import React from 'react';
import styles from './styles.module.sass';

export default function Loading() {
  return (
    <main className={styles.container}>
      <span className={styles.loader}></span>
      <h6>Carregando...</h6>
    </main>
  );
}
