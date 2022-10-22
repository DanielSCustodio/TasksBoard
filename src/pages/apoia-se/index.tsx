import React from 'react';
import firebase from '../../services/firebaseConnection';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { PayPalButtons } from '@paypal/react-paypal-js';
import SEO from '../../components/SEO';
import styles from './styles.module.sass';

interface DonateProps {
  user: {
    name: string;
    id: string;
    image: string;
  };
}

export default function ApoiaSe({ user }: DonateProps) {
  async function handleSaveDonate() {
    await firebase.firestore().collection('users').doc(user.id).set({
      donate: true,
      lastDonate: new Date(),
      image: user.image,
    });
  }
  return (
    <main className={styles.container}>
      <SEO title="Apoia-se" />
      <div className={styles.background}>
        <img
          src="/images/upgrade.svg"
          alt="Faça um upgrade e obtenha mais recursos"
        />
      </div>
      <div className={styles.content}>
        <div>
          <img src={user.image} alt="Foto do usuário" />
          Parabéns, {user.name}! Você é um novo apoiador.
        </div>
        <h1>Seja um apoiador deste projeto ⭐ </h1>
        <h3>
          Contribua com apenas <span>R$ 0,01</span>
        </h3>
        <p>Apareça em nossa home, tenha funcionalidades exclusivas.</p>
        <div className={styles.paypal}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: '0.01',
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                handleSaveDonate();
              });
            }}
          />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const user = {
    name: session?.user.name,
    id: session?.id,
    image: session?.user.image,
  };

  return {
    props: { user },
  };
};
