import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Todo } from './types/Todo';
import { useEffect, useState } from 'react';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then((todosData: Todo[]) => {
        setTodos(todosData);
      })
      .catch(() => {
        throw new Error('Unable to load todos');
      })
  }, []);

  return <>
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">
            <Loader />
            <TodoList
              todos={todos}
              selectedTodo={selectedTodo}
              onSelectTodo={setSelectedTodo}
            />
          </div>
        </div>
      </div>
    </div>

    {selectedTodo && (
      <TodoModal
        selectedTodo={selectedTodo}
        onSelectTodo={setSelectedTodo}
      />
    )}
  </>
};
