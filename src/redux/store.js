import { legacy_createStore as createStore } from 'redux'
import tasksReducer from './tasksSlice'

export const store = createStore(tasksReducer)
