import axios from "axios"

export interface Todo {
    title?: string
    isCompleted?: boolean
    isDeleted?: boolean
}

export interface TodoResponse {
    id: string 
    title: string
    isCompleted: boolean
    isDeleted: boolean
    createAt: Date
    data: string
  }
  

export const getTodos = async (): Promise<TodoResponse[]> => {
    const response = await axios.get(`http://localhost:3000/todo/`)
    return response.data
}

export const createTodo = async (data: Todo): Promise<Todo> => {
    const response = await axios.post(`http://localhost:3000/todo}`, data)
    return response.data
}


export const deleteTodo = async (id: string): Promise<Todo[]> => {
    const response = await axios.delete(`http://localhost:3000/todo/${id}`)
    return response.data
}

export const isCompleted = async (id: string): Promise<Todo[]> => {
    const response = await axios.patch(`http://localhost:3000/todo/${id}`)
    return response.data
}