import { Todo } from '../../Pages/Todos';

const initialState: { todos: Todo[]; completedTodos: Todo[] } = {
    todos: [],
    completedTodos: [],
};

function todoReducer(state = initialState, action: { type: string; payload: Todo }) {
    switch (action?.type) {
        case 'ADD_TODO': {
            const newState = { ...state, todos: [...state.todos, action.payload] };
            return newState;
        }
        case 'REMOVE_TODO': {
            let newState;
            if (action.payload.isComplete === false) {
                newState = {
                    ...state,
                    todos: state.todos.filter((todo) => todo.id !== action.payload.id),
                };
            } else {
                newState = {
                    ...state,
                    completedTodos: state.completedTodos.filter(
                        (todo) => todo.id !== action.payload.id
                    ),
                };
            }

            return newState;
        }
        case 'UPDATE_TODO': {
            let newState;
            if (action.payload.isComplete === false) {
                const todo = state.todos.find((t) => t.id === action.payload.id) || {
                    date: '',
                    todo: '',
                    id: '',
                    todoStatus: '',
                    isComplete: false,
                };
                todo.isComplete = true;
                newState = {
                    ...state,
                    completedTodos: [...state.completedTodos, todo],
                    todos: state.todos.filter((t) => t.id !== action.payload.id),
                };
            } else {
                const todo = state.completedTodos.find((t) => t.id === action.payload.id) || {
                    date: '',
                    todo: '',
                    id: '',
                    todoStatus: '',
                    isComplete: true,
                };
                todo.isComplete = false;
                newState = {
                    ...state,
                    todos: [...state.todos, todo],
                    completedTodos: state.completedTodos.filter((t) => t.id !== action.payload.id),
                };
            }

            return newState;
        }

        default:
            return state;
    }
}

export default todoReducer;
