import axios from "axios"
type ITodos = {
  id: number,
  title: string,
  completed: boolean
}
const API = "http://localhost:3000/todos";

export const getAll = async (): Promise<ITodos[] | undefined> => {
    const {data} = await axios.get<ITodos[]>(API)
    return data
}

export const remove = async (id: number): Promise<void> => {
    await axios.delete(`${API}/${id}`)
}
