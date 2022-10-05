import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.sass';

export default function SigInButton() {
  const session = true;
  return session ? (
    <button type="button" className={styles.SigInButton}>
      <img src="images/daniel.png" alt="" />
      Olá, Daniel
      <FiX color="red" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.SigInButton}>
      <FaGithub />
      Entrar com o GitHub
    </button>
  );
}
