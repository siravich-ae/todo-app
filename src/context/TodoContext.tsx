import { createContext, useReducer, useEffect } from "react";
import type { ReactNode} from "react";
import { todoReducer } from "./todoReducer";
import type { TodoState } from "./todoReducer";
import { fetchTodos } from "../api/todoApi";
import type { Todo } from "../types/todo";

interface TodoContextType extends TodoState {
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const loadTodos = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchTodos();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err: any) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    loadTodos();
  }, []);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  return (
    <TodoContext.Provider
      value={{ ...state, addTodo, deleteTodo, toggleTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};