import Header from "./components/Header/Header.tsx";
import { ClipboardText, PlusCircle } from "phosphor-react";
import styles from "./app.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Task from "./components/Task/Task.tsx";
import { v4 as uuidv4 } from "uuid";
import { createTodo, getTodos, TodoResponse } from "./api/todo.ts";


export default function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<TodoResponse[]>([]);


  useEffect(() => {
    getTodos().then((response) => setTasks(response))
  })
  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTask(event.target.value);
  };

  const handleCreateTask = (event: FormEvent) => {
    event.preventDefault();
    createTodo({
      title: newTask,
    })

 
  };

  // Função para marcar uma tarefa como concluída
  const completeTask = (id: string) => {
    // const taskIndex = tasks.findIndex((item) => item.id === id);

    // if (taskIndex > -1) {
    //   const newTasks = [...tasks];
    //   newTasks[taskIndex].isCompleted = true;

    //   setTasks(newTasks);
    // }

    const tasksWithoutCompleteOne = tasks.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );

    setTasks(tasksWithoutCompleteOne);
  };

  // Função para remover uma tarefa
  const removeTask = (id: string) => {
    const newTasks = tasks.filter((item) => item.id !== id);

    setTasks(newTasks);
  };

  // Lógica para calcular total de tarefas concluidas
  let count = 0;
  // tasks.map((item) => item.isCompleted ? ++count : ""); // ternario com se e senão
  tasks.map((item) => item.isCompleted && ++count);

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
          <button type="submit">
            todos
            <PlusCircle size={20} />
          </button>
          <button
  type="submit"
  style={{
    fontSize: "16px",
    fontWeight: "bold",
    color: "#007bff", // Azul
    backgroundColor: "transparent",
    border: "2px solid #007bff",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px", // Espaço entre o texto e o ícone
  }}
>
  ativos
  <PlusCircle size={20} />
</button>
          <button type="submit">
            completados
            <PlusCircle size={20} />
          </button>
        </form>
        <div>
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div>
                <strong>Tarefas criadas</strong>
                <span>{tasks.length}</span>
              </div>

              <div>
                <strong>Concluídas</strong>
                <span>
                  {count} de {tasks.length}
                </span>
              </div>
            </div>
            <div className={styles.contentBox}>
              {/* Se não tiver task montrar um icone de lista vazia */}
              {tasks.length > 0 ? (
                tasks.map((item) => (
                  <Task
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    completeTask={completeTask}
                    removeTask={removeTask}
                  />
                ))
              ) : (
                <>
                  <ClipboardText size={56} />
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <small>Crie tarefas e organize seus itens a fazer</small>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
