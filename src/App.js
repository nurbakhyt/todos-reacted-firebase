import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import TodoList from './components/TodoList';
import AddItem from './components/AddTodo';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo: {}
    };

    this.handleToggleItem = this.handleToggleItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('todos')
      .on('value', snapshot => {
        let todos = snapshot.val();
        let keys = Object.keys(todos);
        this.setState({
          todos: keys.map(key => ({
            id: key,
            text: todos[key].text,
            completed: todos[key].completed
          }))
        });
      });
  }

  handleToggleItem(toggledItem) {
    const { id, text, completed } = toggledItem;
    firebase.database().ref(`todos/${id}`)
      .set({
        text,
        completed: !completed
      });
  }

  handleAddItem(text) {
    firebase.database().ref('todos')
      .push({
        text: text,
        completed: false
      });
  }

  handleDeleteItem(id) {
    firebase.database().ref(`todos/${id}`)
      .remove();
  }

  handleEditItem(editItem) {
    this.setState({
      todo: editItem
    });
  }

  handleUpdateItem(updatedItem) {
    const { id, text, completed } = updatedItem;
    firebase.database().ref(`todos/${id}`)
      .set({
        text,
        completed
      });
    this.setState({ todo: {} });
  }

  cancelEdit() {
    console.log('cancelEdit in App');
    this.setState({ todo: {} });
  }

  render() {
    let todoItems = [];
    let doneItems = [];
    if (this.state.todos.length)
      this.state.todos.forEach(todo => todo.completed ? doneItems.push(todo) : todoItems.push(todo));

    return (
      <div className="container">
        <TodoList
          title="To do"
          data={todoItems}
          onToggle={this.handleToggleItem}
          onDelete={this.handleDeleteItem}
          onEdit={this.handleEditItem}
        />
        <AddItem
          onAdd={this.handleAddItem}
          onUpdate={this.handleUpdateItem}
          todo={this.state.todo}
          cancel={this.cancelEdit}
        />
        <hr />
        <TodoList
          title="Done"
          data={doneItems}
          onToggle={this.handleToggleItem}
          onDelete={this.handleDeleteItem}
          onEdit={this.handleEditItem}
        />
      </div>
    );
  }
}

export default App;
