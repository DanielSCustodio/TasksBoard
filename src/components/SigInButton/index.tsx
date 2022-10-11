import { signOut, useSession } from 'next-auth/client';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import styles from './styles.module.sass';

export default function SignInButton() {
  const [session] = useSession();

  return session ? (
    <div className={styles.SignOutButton}>
      <img src={session.user.image} alt="Imagem do usuário" />
      <p>Olá, {session.user.name}</p>
      <button type="button" onClick={() => signOut()}>
        <FiLogOut className={styles.closeIcon} />
      </button>
    </div>
  ) : (
    <span>Olá, visitante!</span>
  );
}
