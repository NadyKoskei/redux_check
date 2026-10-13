export const FILTERS = {
  ALL: 'all',
  DONE: 'done',
  NOT_DONE: 'not-done',
}

const initialState = {
  tasks: [
    { id: 1, description: 'Review Redux fundamentals', isDone: false },
    { id: 2, description: 'Build a todo app', isDone: true },
  ],
  filter: FILTERS.ALL,
}

const getNextId = (tasks) => {
  if (!tasks.length) return 1

  return Math.max(...tasks.map((task) => task.id)) + 1
}

export const addTask = (description) => ({
  type: 'tasks/addTask',
  payload: description,
})

export const toggleTaskStatus = (id) => ({
  type: 'tasks/toggleTaskStatus',
  payload: id,
})

export const editTask = ({ id, description }) => ({
  type: 'tasks/editTask',
  payload: { id, description },
})

export const setFilter = (filter) => ({
  type: 'tasks/setFilter',
  payload: filter,
})

export const selectVisibleTasks = (state) => {
  switch (state.filter) {
    case FILTERS.DONE:
      return state.tasks.filter((task) => task.isDone)
    case FILTERS.NOT_DONE:
      return state.tasks.filter((task) => !task.isDone)
    case FILTERS.ALL:
    default:
      return state.tasks
  }
}

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'tasks/addTask': {
      const description = action.payload.trim()

      if (!description) return state

      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: getNextId(state.tasks),
            description,
            isDone: false,
          },
        ],
      }
    }

    case 'tasks/toggleTaskStatus': {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, isDone: !task.isDone } : task,
        ),
      }
    }

    case 'tasks/editTask': {
      const description = action.payload.description.trim()

      if (!description) return state

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, description } : task,
        ),
      }
    }

    case 'tasks/setFilter': {
      return {
        ...state,
        filter: action.payload,
      }
    }

    default:
      return state
  }
}
