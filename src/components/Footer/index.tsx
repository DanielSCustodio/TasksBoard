/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './styles.module.sass';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <span>Gerenciador de tarefas</span>
      </div>
      <div>
        <h5>Desenvolvido por Daniel Custódio</h5>
      </div>
      <div>
        <a
          href="https://portfolio-daniel-custodio.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/portfolio.png" alt="Portfólio" width="40px" />
        </a>
        <a
          href="https://www.linkedin.com/in/danielscustodio/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/linkedin.png" alt="Linkedin" width="40px" />
        </a>
        <a
          href="https://github.com/DanielSCustodio"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/github.png" alt="GitHub" width="40px" />
        </a>
        <a
          href="https://www.instagram.com/danielscustodio/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/instagram.png" alt="Instagram" width="40px" />
        </a>
      </div>
    </footer>
  );
}
