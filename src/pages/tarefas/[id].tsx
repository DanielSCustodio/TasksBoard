import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

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
    <div>
      <h1>{task.task}</h1>
      <h1>{task.task}</h1>
      <h1>{task.createdFormated}</h1>
      <h1>{task.name}</h1>
      <h1>{task.userId}</h1>
    </div>
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
