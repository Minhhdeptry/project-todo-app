import axios from "axios"
type ITodos = {
  id: string,
  title: string,
  completed: boolean
}

const API = "http://localhost:3000/todos";

export const getAll = async (): Promise<ITodos[] | undefined> => {
    const {data} = await axios.get<ITodos[]>(API)
    return data
}

export const remove = async (id: string): Promise<void> => {
    await axios.delete(`${API}/${id}`)
}

export const add = async (todo: Omit<ITodos, 'id'>): Promise<void> => {
    await axios.post(API, todo)
}

export const getById = async (id: string): Promise<ITodos[] | undefined> => {
    const {data} = await axios.get(`${API}/${id}`)
    return data
}

export const update = async (id: string, todo: Omit<ITodos, 'id'>): Promise<void> => {
    await axios.put(`${API}/${id}`, todo)
}