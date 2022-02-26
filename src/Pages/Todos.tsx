import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, Container, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export type Todo = {
    todoStatus: string;
    todo: string;
    id: number;
    date: string;
};

function Todos() {
    const todosJson = localStorage.getItem('todos');
    let incompletedTodos: Todo[];
    let completedTodos;
    if (todosJson !== null) {
        const todos = JSON.parse(todosJson);

        // filter the incompleted todos
        incompletedTodos = todos.filter((todo: Todo) => todo.todoStatus === 'incomplete');

        // filter the completed todos
        completedTodos = todos.filter((todo: Todo) => todo.todoStatus === 'complete');
    } else {
        incompletedTodos = [];
        completedTodos = [];
    }

    const handleTodoStatus = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        status: string
    ) => {
        //  get all the saved todos
        const saved = JSON.parse(localStorage.getItem('todos') || '{}');

        // which todo to update
        const updatedTodo = saved.filter((item: Todo) => item.id === id);

        // todos except the updated one
        const notUpdated = saved.filter((i: Todo) => i.id !== id);

        localStorage.setItem(
            'todos',
            JSON.stringify([
                ...notUpdated,
                {
                    todo: updatedTodo[0].todo,
                    id: updatedTodo[0].id,
                    date: updatedTodo[0].date,
                    todoStatus: status === 'incomplete' ? 'complete' : 'incomplete',
                },
            ])
        );

        // reload to see change
        window.location.reload();
    };

    const handleDelete = (id: number) => {
        console.log(id);
        const savedTodosJson = localStorage.getItem('todos');
        console.log(savedTodosJson);
        const savedTodos = savedTodosJson !== null && JSON.parse(savedTodosJson);
        console.log(savedTodos);
        const remainedTodos = savedTodos.filter((todo: Todo) => todo.id !== id);
        console.log(remainedTodos);
        localStorage.setItem('todos', JSON.stringify(remainedTodos));

        // reload to see change
        window.location.reload();
    };

    return (
        <Container>
            <Typography sx={{ borderBottom: 1, mb: 2 }} variant="h6">
                All Todos
            </Typography>
            {/* if no todos found  */}
            {incompletedTodos.length < 1 && completedTodos.length < 1 && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            background: 'violet',
                            borderRadius: 5,
                            px: 0.5,
                            fontSize: 10,
                        }}
                        variant="caption"
                    >
                        2/26/2022
                    </Typography>
                    <Checkbox onChange={() => alert('It is an demo create a new one to test')} />
                    <Typography variant="body1">It is an demo of todo</Typography>
                    <IconButton
                        sx={{ ml: 3 }}
                        color="error"
                        aria-label="delete"
                        onClick={() => alert('Create a new todo to remove it')}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )}
            {/* incompleted todos */}
            <Box>
                {incompletedTodos &&
                    incompletedTodos.map((todo: Todo) => (
                        <Box key={todo.id} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                sx={{
                                    background: 'violet',
                                    borderRadius: 5,
                                    px: 0.5,
                                    fontSize: 10,
                                }}
                                variant="caption"
                            >
                                {todo.date}
                            </Typography>

                            <Checkbox
                                onChange={(e) => handleTodoStatus(e, todo.id, todo.todoStatus)}
                            />
                            <Typography variant="body1">{todo.todo}</Typography>

                            <IconButton
                                sx={{ ml: 3 }}
                                color="error"
                                onClick={() => handleDelete(todo.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
            </Box>

            <Typography sx={{ borderBottom: 1, mb: 2, mt: 5 }} variant="h6">
                Completed Todos
            </Typography>
            {completedTodos &&
                completedTodos.map((todo: Todo) => (
                    <Box key={todo.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            sx={{
                                background: 'violet',
                                borderRadius: 5,
                                px: 0.5,
                                fontSize: 10,
                            }}
                            variant="caption"
                        >
                            {todo.date}
                        </Typography>
                        <Checkbox
                            defaultChecked
                            onChange={(e) => handleTodoStatus(e, todo.id, todo.todoStatus)}
                        />
                        <Typography variant="body1">{todo.todo}</Typography>
                        <IconButton
                            sx={{ ml: 3 }}
                            color="error"
                            aria-label="delete"
                            onClick={() => handleDelete(todo.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
        </Container>
    );
}

export default Todos;
