import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import nextId from 'react-id-generator';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/actions/todoAction';
import { RootState } from '../redux/store';
import { Todo } from './Todos';

function CreateTodo() {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const [todo, setTodo] = useState<Todo>({
        date: '',
        todo: '',
        id: '',
        isComplete: false,
    });

    const handleData = (e: React.FocusEvent<HTMLInputElement>) => {
        const date = new Date().toLocaleDateString();
        setTodo({
            date,
            todo: e.target.value,
            id: nextId(),
            isComplete: false,
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addTodo(todo));
    };
    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="todo"
                    onBlur={handleData}
                    margin="dense"
                    fullWidth
                    label="Todo"
                    required
                />
                <Button sx={{ mt: 1 }} type="submit" variant="outlined">
                    Add Todo
                </Button>
            </form>
        </Container>
    );
}

export default CreateTodo;
