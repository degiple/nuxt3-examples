import { Ref } from 'vue'

type Task = {
  id: number
  name: string
  isComplete: boolean
}

export const useTasksCookie = () => {
  const idCounter = useState<number>('taskIdCounter', () => 0)
  const tasks = useCookie<Task[]>('taskCookie', {
    default: () => [
      {
        id: 0,
        name: 'first task',
        isComplete: false,
      },
    ],
  })

  return {
    tasks,
    createTask: createTask(tasks, idCounter),
    getTask: getTask(tasks),
    updateTask: updateTask(tasks),
    deleteTask: deleteTask(tasks),
    clearTask: clearTask(tasks),
  }
}

const createTask =
  (tasks: Ref<Task[]>, idCounter: Ref<number>) =>
  (task_name: string): boolean => {
    if (task_name.length > 0) {
      tasks.value.push({
        id: ++idCounter.value,
        name: task_name,
        isComplete: false,
      })
      return true
    } else {
      return false
    }
  }

const getTask = (tasks: Ref<Task[]>) => (id: number) => {
  return tasks.value.find((t) => t.id == id)
}

const updateTask = (tasks: Ref<Task[]>) => (task: Task) => {
  const tindex = tasks.value.findIndex((t) => t.id == task.id)
  if (tindex !== -1) {
    tasks.value[tindex] = task
    return true
  } else {
    return false
  }
}

const deleteTask = (tasks: Ref<Task[]>) => (id: number) => {
  const tindex = tasks.value.findIndex((t) => t.id == id)
  tasks.value.splice(tindex, 1)
}

const clearTask = (tasks: Ref<Task[]>) => () => {
  tasks.value.splice(0)
}
