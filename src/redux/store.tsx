import { composeWithDevTools } from '@redux-devtools/extension';
import { combineReducers, createStore } from 'redux';
import todoReducer from './reducers/todoReducer';

const rootReducer = combineReducers({
    todos: todoReducer,
});
const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;
export default store;
