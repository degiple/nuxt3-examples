import { Ref } from 'vue'

const baseURL = 'http://localhost:8080'
const accessToken = useCookie('access_token').value
const headers = {
  Accept: 'application/json',
  ...(accessToken ? { access_token: accessToken } : {})
}

const path = '/todo'

export type Task = {
  id: number
  createAt: Date
  updateAt: Date
  title: string
  description: string | null
  isComplete: boolean
  userId: number
}

export type TaskCreateDto = {
  title: string
  description?: string
}

export const useTodo = () => {
  const tasks = useState<Task[]>('taskState', () => [])

  return {
    tasks: tasks,
    getTasks: getTasks(tasks),
    createTask: createTask
    // getTask: getTask(tasks),
    // updateTask: updateTask(tasks),
    // deleteTask: deleteTask(tasks),
    // clearTask: clearTask(tasks)
  }
}

const getTasks = (tasks: Ref<Task[] | null>) => async () => {
  const { data, error } = await useFetch<Task[]>(path, {
    baseURL,
    method: 'GET',
    headers,
    credentials: 'include'
  })

  if (!error.value) {
    console.log(data.value)
    tasks.value = data.value
    return true
  } else {
    console.error(error.value)
    return false
  }
}

const createTask = async (title: string, description: string) => {
  if (title.length > 0) {
    const { data, error } = await useFetch<Task>(path, {
      baseURL,
      method: 'POST',
      headers,
      credentials: 'include',
      body: {
        title,
        description
      }
    })

    if (!error.value) {
      console.log(data.value)
      return data.value
    } else {
      console.error(error.value)
      return false
    }
  }
}

// const getTask = (tasks: Ref<Task[]>) => (id: number) => {
//   return tasks.value.find((t) => t.id == id)
// }

// const updateTask = (tasks: Ref<Task[]>) => (task: Task) => {
//   const tindex = tasks.value.findIndex((t) => t.id == task.id)
//   if (tindex !== -1) {
//     tasks.value[tindex] = task
//     return true
//   } else {
//     return false
//   }
// }

// const deleteTask = (tasks: Ref<Task[]>) => (id: number) => {
//   const tindex = tasks.value.findIndex((t) => t.id == id)
//   tasks.value.splice(tindex, 1)
// }

// const clearTask = (tasks: Ref<Task[]>) => () => {
//   tasks.value.splice(0)
// }
