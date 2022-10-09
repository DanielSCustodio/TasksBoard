import React from 'react';
import SEO from '../../components/SEO';
import styles from './styles.module.sass';
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';

export default function Board() {
  return (
    <section className={styles.container}>
      <SEO title="Tarefas" />
      <main className={styles.content}>
        <form>
          <input type="text" placeholder="Adicione uma tarefa..." />
          <button type="submit">
            <FiPlus size={25} />
          </button>
        </form>
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
                <FiEdit2 size={20} color="#BCCC9A" />
                <span>Editar</span>
              </button>
            </div>
            <button>
              <FiTrash color="#FF3636" />
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
    </section>
  );
}
