import type { Todo } from "../types/todo";

export interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}
export type Action = 
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: Todo[] }
    | { type: "FETCH_ERROR"; payload: string }
    | { type: "ADD_TODO"; payload: Todo }
    | { type: "DELETE_TODO"; payload: number }
    | { type: "TOGGLE_TODO"; payload: number };

    export const todoReducer = (state: TodoState, action: Action): TodoState => {
        switch (action.type) {
            case "FETCH_START":
                return { ...state, loading: true};
            
            case "FETCH_SUCCESS":
                return { todos: action.payload, loading: false, error: null};

            case "FETCH_ERROR":
                return {...state, loading: false, error: action.payload};

            case "ADD_TODO":
                return {...state, todos: [action.payload, ...state.todos]};

            case "DELETE_TODO":
                return {
                    ...state,
                    todos: state.todos.filter((t) => t.id !== action.payload),
                };
            
            case "TOGGLE_TODO":
                return {
                    ...state,
                    todos: state.todos.map((t) =>
                     t.id === action.payload ? {...t, completed: !t.completed } : t
                ),
            };

            deafult:
                return state;
        }
    };