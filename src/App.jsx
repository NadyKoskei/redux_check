import "./App.css";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";

function App() {
  return (
    <main className="todo-app">
      <div className="todo-card">
        <header className="todo-header">
          <p className="eyebrow">Redux ToDo</p>
          <h1>My Tasks</h1>
        </header>

        <AddTask />
        <ListTask />
      </div>
    </main>
  );
}

export default App;
