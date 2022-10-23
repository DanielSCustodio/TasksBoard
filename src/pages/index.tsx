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
  const [donaters, setDonaters] = React.useState<Data[]>(JSON.parse(data));
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
    revalidate: 60 * 60,
  };
};
