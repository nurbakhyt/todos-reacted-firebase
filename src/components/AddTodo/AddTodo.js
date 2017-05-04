import React, { Component, PropTypes } from 'react';
import './styles.css';

class AddTodo extends Component {

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { todo: { text: '' }};

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      todo: {
        ...nextProps.todo
      }
    });
  }

  handleChangeText(e) {
    this.setState({
      todo: {
        ...this.state.todo,
        text: e.target.value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onUpdate, onAdd } = this.props;

    if (this.state.todo.id) {
      onUpdate({
        ...this.state.todo
      })
    } else {
      onAdd(this.state.todo.text);
    }
    this.setState({ todo: {} });
  }

  render() {
    const { todo, cancel } = this.props;
    let input;
    return (
      <div className="add-form">
        <form onSubmit={this.handleSubmit}>
          <label className="add-form__label">+</label>
          <input
            type="text"
            className="add-form__input"
            value={this.state.todo.text || ''}
            onChange={this.handleChangeText}
          />
          <button type="submit" className="add-form__btn">
            {todo && todo.id ? 'Edit' : 'Add'}
          </button>
          {todo.id && <button type="reset" className="add-form__btn" onClick={() => cancel()}>Cancel</button>}
        </form>
      </div>
    );
  }
}

export default AddTodo;
