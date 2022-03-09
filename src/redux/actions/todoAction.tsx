import { Todo } from '../../Pages/Todos';

export const addTodo = (payload: Todo) => ({
    type: 'ADD_TODO',
    payload,
});

export const removeTodo = (payload: Todo) => ({
    type: 'REMOVE_TODO',
    payload,
});

export const updateTodo = (payload: Todo) => ({
    type: 'UPDATE_TODO',
    payload,
});
