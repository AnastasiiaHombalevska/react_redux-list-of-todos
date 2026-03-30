import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Todo } from './types/Todo';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<Status>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    getTodos()
      .then((todosData: Todo[]) => {
        setTodos(todosData);
      })
      .catch(() => {
        setErr('Unable to load todos');
      })
      .finally(() => setErr(''));
  }, []);

  useEffect(() => {
    let filtered = [...todos];

    switch (filterStatus) {
      case 'active':
        filtered = [...todos].filter(todo => !todo.completed);
        break;

      case 'completed':
        filtered = [...todos].filter(todo => todo.completed);
        break;

      case 'all':
      default: filtered = [...todos];
      break;
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (normalizedQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery)
      );
    }

    setFilteredTodos(filtered);

    if (filtered.length === 0 && (normalizedQuery || filterStatus !== 'all')) {
      setErr('There are no todos matching current filter criteria');
    } else {
      setErr('');
    }
  }, [todos, filterStatus, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectChange={setFilterStatus}
                onInputChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                onSelectTodo={setSelectedTodo}
                error={err}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectTodo={setSelectedTodo}
          setErr={setErr}
        />
      )}
    </>
  );
};
