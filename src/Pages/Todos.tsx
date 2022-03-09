import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, Container, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, updateTodo } from '../redux/actions/todoAction';
import { RootState } from '../redux/store';

export type Todo = {
    todo: string;
    id: string;
    date: string;
    isComplete: boolean;
};

function Todos() {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const completedTodos = useSelector((state: RootState) => state.todos.completedTodos);

    return (
        <Container>
            <Typography sx={{ borderBottom: 1, mb: 2 }} variant="h6">
                All Todos
            </Typography>
            {/* if no todos found  */}
            {todos.length < 1 && (
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
                        3/10/2022
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
                {todos.length > 0 &&
                    todos.map((todo: Todo) => (
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
                                onChange={() =>
                                    dispatch(updateTodo({ ...todo, isComplete: false }))
                                }
                            />
                            <Typography variant="body1">{todo.todo}</Typography>

                            <IconButton
                                onClick={() => dispatch(removeTodo(todo))}
                                sx={{ ml: 3 }}
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
            </Box>

            <Typography sx={{ borderBottom: 1, mb: 2, mt: 5 }} variant="h6">
                Completed Todos
            </Typography>
            {completedTodos.length > 0 &&
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
                            onChange={() => dispatch(updateTodo({ ...todo, isComplete: true }))}
                        />
                        <Typography variant="body1">{todo.todo}</Typography>
                        <IconButton
                            onClick={() => dispatch(removeTodo(todo))}
                            sx={{ ml: 3 }}
                            color="error"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
        </Container>
    );
}

export default Todos;
