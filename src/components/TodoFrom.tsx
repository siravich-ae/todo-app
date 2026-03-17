import { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const TodoFrom = () => {
    const [title, setTitle] = useState("");
    const context = useContext(TodoContext);

    if (!context) return null;

    const { addTodo } = context;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        addTodo(title);
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder= "Add todo..."
            />
            <button type="submit">Add</button>
        </form>
    );
};