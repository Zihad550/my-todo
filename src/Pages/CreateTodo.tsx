import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';

function CreateTodo() {
    const [todo, setTodo] = useState('');

    const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const savedTodosJson = localStorage.getItem('todos');
        const savedTodos = savedTodosJson !== null && JSON.parse(savedTodosJson);
        const date = new Date().toLocaleDateString();
        if (savedTodos) {
            localStorage.setItem(
                'todos',
                JSON.stringify([
                    ...savedTodos,
                    { todo, id: savedTodos.length + 1, todoStatus: 'incomplete', date },
                ])
            );
        } else {
            localStorage.setItem(
                'todos',
                JSON.stringify([{ todo, id: 1, todoStatus: 'incomplete', date }])
            );
        }
        setTodo('');
    };
    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="todo"
                    onChange={handleData}
                    margin="dense"
                    fullWidth
                    label="Todo's"
                    value={todo}
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
