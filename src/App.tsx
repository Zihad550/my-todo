import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateTodo from './Pages/CreateTodo';
import Home from './Pages/Home';
import Todos from './Pages/Todos';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="/" element={<Todos />} />
                    <Route path="/todos" element={<Todos />} />
                    <Route path="/createTodo" element={<CreateTodo />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
