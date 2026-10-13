import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/tasksSlice'

function AddTask() {
  const dispatch = useDispatch()
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedDescription = description.trim()

    if (!trimmedDescription) return

    dispatch(addTask(trimmedDescription))
    setDescription('')
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Add a new todo..."
        aria-label="Add a new todo"
      />
      <button type="submit">Add task</button>
    </form>
  )
}

export default AddTask
