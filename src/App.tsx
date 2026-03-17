import {TodoProvider} from "./context/TodoContext";
import {TodoForm} from "./components/TodoForm";
import {TodoList} from "./components/TodoList";

function App() {
  return (
    <TodoProvider>
      <div style={{ maxWidth: 500, margin: "auto"}}>
        <h1>Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}
export default App;