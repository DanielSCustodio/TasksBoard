import { GetStaticProps } from 'next';
import { FaGithub } from 'react-icons/fa';
import { ImGoogle3 } from 'react-icons/im';
import { signIn, useSession } from 'next-auth/client';
import React from 'react';
import SEO from '../components/SEO';
import style from '../styles/home.module.sass';

export default function Home() {
  const [session] = useSession();
  console.log(session);

  return (
    <>
      <SEO title="Início" />
      <main>
        <div className={style.banner}>
          <h1>
            Tasks<span>Board</span>
          </h1>
          <p>Nunca foi tão fácil se organizar</p>
          {!session && (
            <>
              <button
                type="button"
                className={style.SigInButtonGitHub}
                onClick={() => signIn('github')}
              >
                <FaGithub size={25} />
                Entrar com GitHub
              </button>
              <button
                type="button"
                className={style.SigInButtonGoogle}
                onClick={() => signIn('google')}
              >
                <ImGoogle3 size={25} />
                Entrar com Google
              </button>
            </>
          )}
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60,
  };
};
