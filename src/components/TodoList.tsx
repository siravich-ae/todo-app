import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const TodoList = () => {
    const context = useContext(TodoContext);
    if (!context) return null;

    const { todos, loading, error, toggleTodo, deleteTodo, } = context;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (loading) return <p>Loading todos...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    if (!loading && todos.length === 0) {
        return <p>No todos yet</p>;
    }

    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    <span onClick={() => toggleTodo(todo.id)}
                    style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        cursor: "pointer",
                    }}
                    >
                        {todo.title}
                    </span>

                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}