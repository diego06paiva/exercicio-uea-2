import Header from "./components/Header/Header.tsx";
import { PlusCircle } from "phosphor-react";
import styles from "./app.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import Task from "./components/Task/Task.tsx";

const data = [
  {
    // id: uuidv4(),
    title: "Tarefa 1",
    isDeleted: false,
    isCompleted: false,
  },
  {
    // id: uuidv4(),
    title: "Tarefa 2",
    isDeleted: false,
    isCompleted: false,
  },
];

export default function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(data);

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTask(event.target.value);
  };

  const handleCreateTask = (event: FormEvent) => {
    event.preventDefault();

    setTasks((prev) => [
      ...prev,
      {
        title: newTask,
        isCompleted: false,
        isDeleted: false,
      },
    ]);
  };

  // Função para marcar uma tarefa como concluída

  // Função para remover uma tarefa

  // Lógica para calcular total de tarefas conclídas

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.newText} onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={handleNewTaskChange}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>
        <div>
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div>
                <strong>Tarefas criadas</strong>
                <span>10</span>
              </div>

              <div>
                <strong>Concluídas</strong>
                <span>5 de 10</span>
              </div>
            </div>
            <div className={styles.contentBox}>
              {tasks.map((task) => (
                <Task title={task.title} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
