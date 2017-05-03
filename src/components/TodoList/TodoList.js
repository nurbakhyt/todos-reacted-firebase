import React, { PropTypes } from 'react';
import Todo from './Todo';
import './styles.css';

const TodoList = ({ title, data, onToggle, onDelete, onEdit }) => (
  <div>
    <h3>{title}</h3>
    <ul className="todolist">
      {data.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onToggle(todo)}
          onDelete={() => onDelete(todo.id)}
          onEdit={() => onEdit(todo)}
        />
      )}
    </ul>
  </div>
);

TodoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TodoList;
