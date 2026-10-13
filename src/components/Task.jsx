import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, toggleTaskStatus } from "../redux/tasksSlice";

function Task({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.description);

  const handleSave = (event) => {
    event.preventDefault();

    const trimmedDraft = draft.trim();

    if (!trimmedDraft) return;

    dispatch(editTask({ id: task.id, description: trimmedDraft }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(task.description);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.isDone ? "completed" : ""}`}>
      <div className="task-main">
        <label className="task-checkbox">
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => dispatch(toggleTaskStatus(task.id))}
          />
          <span className="task-id">#{task.id}</span>
        </label>

        {isEditing ? (
          <form className="task-edit-form" onSubmit={handleSave}>
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              autoFocus
            />
            <div className="task-actions">
              <button type="submit" className="save-btn">
                Save
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <span className="task-description">{task.description}</span>
            <div className="task-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}

export default Task;
