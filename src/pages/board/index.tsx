import React from 'react';
import firebase from '../../services/firebaseConnection';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import SEO from '../../components/SEO';
import styles from './styles.module.sass';
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import SupportButton from '../../components/SupportButton';

interface BoardProps {
  user: {
    id: string;
    name: string;
  };
}

export default function Board({ user }: BoardProps) {
  const [input, setInput] = React.useState('');
  const [error, setError] = React.useState('');

  function handleInput(e: { target: { value: React.SetStateAction<string> } }) {
    setError('');
    setInput(e.target.value);
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!input) {
      setError('Por favor, adicione uma tarefa.');
      return;
    }

    await firebase
      .firestore()
      .collection('tarefas')
      .add({
        created: new Date(),
        task: input,
        userId: user.id,
        name: user.name,
      })
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        console.log('Deu merda', err);
      });
  }

  return (
    <section className={styles.container}>
      <SEO title="Tarefas" />
      <main className={styles.content}>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Adicione uma tarefa"
            value={input}
            onChange={handleInput}
          />
          <button type="submit">
            <FiPlus size={25} />
          </button>
        </form>
        {error.length > 1 && <p className={styles.error}>{error}</p>}
      </main>
      <h2>Você tem 3 Publicações</h2>
      <section>
        <article className={styles.taskLists}>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <div className={styles.actions}>
            <div>
              <div>
                <FiCalendar size={20} color="#BCCC9A" />
                <time>08 Dezembro 2022</time>
              </div>
              <button>
                <FiEdit2 size={18} color="#BCCC9A" />
                <span>Editar</span>
              </button>
            </div>
            <button>
              <FiTrash size={18} color="#FF3636" />
              <span>Excluir</span>
            </button>
          </div>
        </article>
      </section>
      <section className={styles.vipsContainer}>
        <h3>Obrigado por apoiar ⭐</h3>
        <div>
          <FiClock size={20} />
          <time>Ultima doação foi há 3 dias.</time>
        </div>
      </section>
      <SupportButton />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.id) {
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
  };

  return {
    props: { user },
  };
};
