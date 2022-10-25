/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { GetStaticProps } from 'next';
import { FaGithub } from 'react-icons/fa';
import { ImGoogle3 } from 'react-icons/im';
import { signIn, useSession } from 'next-auth/client';
import firebase from '../services/firebaseConnection';
import SEO from '../components/SEO';
import style from '../styles/home.module.sass';

interface HomeProps {
  data: string;
}

type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
  name: string;
};

export default function Home({ data }: HomeProps) {
  const [donaters] = React.useState<Data[]>(JSON.parse(data));
  const [session] = useSession();

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
              <h3>Cadastro rápido e fácil.</h3>

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

        <section className={style.prices}>
          <div>
            <section>
              <p>Free</p>
              <h3>R$ 0,00</h3>
            </section>
            <ul>
              <li>
                <img src="/images/check.png" width="20px" />
                Criar tarefa
              </li>
              <li>
                <img src="/images/check.png" width="20px" />
                Excluir tarefa
              </li>
            </ul>
            <img
              src="/images/free.png"
              alt="icone do pacote free"
              width="35px"
            />
          </div>
          <div>
            <section>
              <p>Apoiador</p>
              <h3>R$ 0,01</h3>
            </section>
            <ul>
              <li>
                <img src="/images/check.png" width="20px" />
                Criar tarefa
              </li>
              <li>
                <img src="/images/check.png" width="20px" />
                Excluir tarefa
              </li>
              <li>
                <img src="/images/check.png" width="20px" />
                Editar tarefa
              </li>
              <li>
                <img src="/images/check.png" width="20px" />
                Foto na página inicial
              </li>
              <li>
                <img src="/images/check.png" width="20px" />
                Página de detalhe da tarefa
              </li>
            </ul>
            <img
              src="/images/premium.png"
              alt="icone do pacote premium"
              width="35px"
            />
          </div>
        </section>
        <div className={style.donatersContainer}>
          {donaters.length >= 1 && <h2>Apoiadores</h2>}
          <div className={style.donatersContent}>
            {donaters.map(
              (item) =>
                item.image && (
                  <img key={item.id} src={item.image} alt={item.name} />
                ),
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const donaters = await firebase.firestore().collection('users').get();
  const data = JSON.stringify(
    donaters.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    }),
  );

  return {
    props: { data },
    revalidate: 5, // 5 segundos
  };
};
