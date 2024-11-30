import { Trash } from "phosphor-react";
import styles from "./task.module.css";

interface TaskPros {
  title: string;
}

export default function Task({ title }: TaskPros) {
  // Função para marcar tarefa como concluída

  // Função para remover tarefa

  return (
    <div className={styles.task}>
      <div>
        {/* Marcar uma tarefa como concluída */}
        <input type="checkbox" id="task" name="task" />
        <label htmlFor="task">{title}</label>
      </div>
      {/* Remover uma tarefa */}
      <button type="button">
        <Trash size={24} />
      </button>
    </div>
  );
}
