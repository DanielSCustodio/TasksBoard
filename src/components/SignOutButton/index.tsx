import { signOut, useSession } from 'next-auth/client';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import styles from './styles.module.sass';
import Image from 'next/image';

export default function SignOutButton() {
  const [session] = useSession();

  return session ? (
    <div className={styles.SignOutButton}>
      {session.user.image && (
        <Image
          width={40}
          height={40}
          src={session.user?.image}
          alt="foto do usuário"
        />
      )}
      <p>Olá, {session.user.name}</p>
      <button type="button" onClick={() => signOut()}>
        <FiLogOut className={styles.closeIcon} />
      </button>
    </div>
  ) : (
    <span>Olá, visitante!</span>
  );
}
