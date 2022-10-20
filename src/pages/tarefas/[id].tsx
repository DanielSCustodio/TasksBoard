import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';
import { FiCalendar } from 'react-icons/fi';
import styles from './id_styles.module.sass';
import SEO from '../../components/SEO';

type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  task: string;
  userId: string;
  name: string;
};
interface TasklistProps {
  data: string;
}

export default function Task({ data }: TasklistProps) {
  const task = JSON.parse(data) as Task;
  return (
    <section className={styles.container}>
      <SEO title={task.name} />
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.head}>
            <FiCalendar size={25} color="#C37B89" />
            <h2>Tarfea Criada:</h2>
            <p>{task.createdFormated}</p>
          </div>
          <div className={styles.task}>
            <p>{task.task}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params;
  const session = await getSession({ req });

  if (!session?.id) {
    return {
      redirect: {
        destination: '/tarefas',
        permanent: false,
      },
    };
  }

  const data = await firebase
    .firestore()
    .collection('tarefas')
    .doc(String(id))
    .get()
    .then((snapshot) => {
      const data = {
        id: snapshot.id,
        created: snapshot.data().created,
        createdFormated: format(
          snapshot.data().created.toDate(),
          'dd MMMM yyyy',
        ),
        task: snapshot.data().task,
        userId: snapshot.data().userId,
        name: snapshot.data().name,
      };
      return JSON.stringify(data);
    });

  return {
    props: { data },
  };
};
