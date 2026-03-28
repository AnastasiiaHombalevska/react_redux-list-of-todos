/* eslint-disable */
// import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null,
  onSelectTodo: (todo: Todo | null) => void,
}

export const TodoList: React.FC<Props> = ({ todos, selectedTodo, onSelectTodo }) => {
  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo, index) => {
            const { id, title, completed } = todo;
            const countNum = index + 1;

            return (
              <tr
                data-cy="todo"
                id={id.toString()}
                className={`todo-container ${selectedTodo?.id === id ? 'has-background-info-light' : ''}`}
                key={id}
              >
                <td className="is-vcentered">{countNum}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check"></i></span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={completed ? 'has-text-success' : 'has-text-danger'}>{title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => onSelectTodo(todo)}
                  >
                    <span className="icon">
                      <i className={`far ${selectedTodo?.id === id ? 'fa-eye-slash' : 'fa-eye'}`} />
                    </span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};
