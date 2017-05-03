import React, { PropTypes } from 'react';

const Todo = ({ text, completed, onClick, onDelete, onEdit }) => (
  <li
    className="todolist__item"
  >
    <span
      onClick={onClick}
      style={{ textDecoration: completed ? 'line-through' : 'none' }}
    >
      {text}
    </span>
    <button
      className="todolist__delete"
      onClick={onDelete}
    >✖️</button>
    <button
      className="todolist__edit"
      onClick={onEdit}
    >✎</button>
  </li>
);

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Todo;
