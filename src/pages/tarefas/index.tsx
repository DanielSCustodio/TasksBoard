import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import firebase from '../../services/firebaseConnection';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import styles from './styles.module.sass';
import {
  FiCalendar,
  FiClock,
  FiEdit2,
  FiPlus,
  FiTrash,
  FiX,
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import SupportButton from '../../components/SupportButton';

type TaskList = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  task: string;
  userId: string;
  name: string;
};

interface BoardProps {
  user: {
    id: string;
    name: string;
  };
  data: string;
}

export default function Tarefas({ user, data }: BoardProps) {
  const [input, setInput] = React.useState('');
  const [taskEdit, setTaskEdit] = React.useState<TaskList | null>(null);
  const [error, setError] = React.useState('');
  const [tasksList, setTasksLists] = React.useState<TaskList[]>(
    JSON.parse(data),
  );
  const inputElement = React.useRef<HTMLInputElement>();

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

    if (taskEdit) {
      await firebase
        .firestore()
        .collection('tarefas')
        .doc(taskEdit.id)
        .update({
          task: input,
        })
        .then(() => {
          const data = tasksList;
          const taskIndex = tasksList.findIndex(
            (item) => item.id === taskEdit.id,
          );
          data[taskIndex].task = input;

          setTaskEdit(null);
          setInput('');
          inputElement.current.focus();
        });

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
        const data = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), 'dd MMMM yyyy'),
          task: input,
          userId: user.id,
          name: user.name,
        };
        setTasksLists([data, ...tasksList]);
        setInput('');
        inputElement.current.focus();
      });
  }

  async function handleDelete(id: string) {
    await firebase
      .firestore()
      .collection('tarefas')
      .doc(id)
      .delete()
      .then(() => {
        const filter = tasksList.filter((item) => item.id !== id);
        setTasksLists([...filter]);
        setTaskEdit(null);
        setInput('');
        inputElement.current.focus();
      });
  }

  async function handleEdit(task: TaskList) {
    setTaskEdit(task);
    setInput(task.task);
    inputElement.current.focus();
  }

  function hadleCancelEdit() {
    setTaskEdit(null);
    setInput('');
    inputElement.current.focus();
  }

  return (
    <section className={styles.container}>
      <SEO title="Tarefas" />
      {taskEdit && (
        <div className={styles.taskEdit}>
          <p>Modo de edição</p>
          <button onClick={hadleCancelEdit}>
            <FiX color="#ff5b5b" size={30} />
          </button>
        </div>
      )}
      <main className={styles.content}>
        <form onSubmit={handleAddTask}>
          <input
            ref={inputElement}
            type="text"
            placeholder="Adicione uma tarefa"
            value={input}
            onChange={handleInput}
          />
          <button type="submit">
            <FiPlus size={25} />
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </main>
      {tasksList.length === 0 ? (
        <h2> Vamos começar? Cadastre a sua primeira tarefa.</h2>
      ) : (
        <h2>
          Você tem <span> {tasksList.length}</span>{' '}
          {tasksList.length === 1 ? 'tarefa.' : 'tarefas.'}
        </h2>
      )}
      <section>
        {tasksList &&
          tasksList.map((item) => (
            <article className={styles.taskLists} key={item.id}>
              <Link href={`/board/${item.id}`}>
                <p>{item.task}</p>
              </Link>

              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#BCCC9A" />
                    <time>{item.createdFormated}</time>
                  </div>
                  <button onClick={() => handleEdit(item)}>
                    <FiEdit2 size={18} color="#BCCC9A" />
                    <span>Editar</span>
                  </button>
                </div>
                <button onClick={() => handleDelete(item.id)}>
                  <FiTrash size={18} color="#ff5b5b" />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
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

  const tasks = await firebase
    .firestore()
    .collection('tarefas')
    .where('userId', '==', session?.id)
    .orderBy('created', 'desc')
    .get();

  const data = JSON.stringify(
    tasks.docs.map((item) => {
      return {
        id: item.id,
        createdFormated: format(item.data().created.toDate(), 'dd MMMM yyyy'),
        ...item.data(),
      };
    }),
  );

  const user = {
    name: session?.user.name,
    id: session?.id,
  };

  return {
    props: { user, data },
  };
};
