import React from 'react';
import SEO from '../components/SEO';
import style from '../styles/home.module.sass';

export default function Home() {
  return (
    <>
      <SEO title="Início" />
      <main className={style.contentContainer}>
        <div className={style.banner}>
          <h1>
            Tasks<span>Board</span>
          </h1>
          <p>Nunca foi tão fácil se organizar</p>
        </div>

        <section className={style.callToAction}>
          <h2>
            Organização é <span>tudo</span>!<br /> E vamos te ajudar com isso.
          </h2>
          <p>
            Experimente <span>agora</span> mesmo!
          </p>
        </section>
        <div className={style.donatersContainer}>
          <h2>Apoiadores</h2>
          <div className={style.donatersContent}>
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
            <img src="images/daniel.png" alt="Usuário doador" />
          </div>
        </div>
      </main>
    </>
  );
}
