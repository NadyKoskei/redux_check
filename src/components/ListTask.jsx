import { useDispatch, useSelector } from "react-redux";
import { FILTERS, selectVisibleTasks, setFilter } from "../redux/tasksSlice";
import Task from "./Task";

function ListTask() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const tasks = useSelector(selectVisibleTasks);

  const filterOptions = [
    { label: "All", value: FILTERS.ALL },
    { label: "Done", value: FILTERS.DONE },
    { label: "Not done", value: FILTERS.NOT_DONE },
  ];

  return (
    <section className="list-task">
      <div className="filter-bar" aria-label="Filter tasks by status">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={
              filter === option.value ? "filter-btn active" : "filter-btn"
            }
            onClick={() => dispatch(setFilter(option.value))}
          >
            {option.label}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className="empty-state">No tasks match this filter.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListTask;
