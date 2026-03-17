import type { Todo } from "../types/todo";

export const fetchTodos = async (): Promise<Todo[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

    if (!res.ok) {
        throw new Error("Failed to fetch Todo");
    }

    return res.json();
};