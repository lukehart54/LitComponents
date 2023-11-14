import { LitElement, html, css, property } from 'lit';

class TodoList extends LitElement {
  @property({ type: Array }) todos = [];
  @property({ type: String }) newTask = '';

  static styles = css`
    .todo-list {
      max-width: 300px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .todo-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .todo-item.completed {
      text-decoration: line-through;
      color: #999;
    }

    .delete-button {
      margin-left: 10px;
      cursor: pointer;
      color: red;
      border: none;
      background: none;
    }

    .add-task {
      display: flex;
      margin-bottom: 20px;
    }

    .add-task input {
      flex-grow: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-right: 10px;
    }

    .add-task button {
      padding: 8px 16px;
      background: #0078d4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  addTask() {
    if (this.newTask.trim()) {
      this.todos = [...this.todos, { text: this.newTask, completed: false }];
      this.newTask = '';
    }
  }

  toggleCompleted(index) {
    const updatedTodos = [...this.todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    this.todos = updatedTodos;
  }

  deleteTask(index) {
    this.todos = [...this.todos.slice(0, index), ...this.todos.slice(index + 1)];
  }

  handleInput(e) {
    this.newTask = e.target.value;
  }

  render() {
    return html`
      <div class="todo-list">
        <div class="add-task">
          <input type="text" .value="${this.newTask}" @input="${this.handleInput}" placeholder="New task">
          <button @click="${this.addTask}">Add</button>
        </div>
        ${this.todos.map((todo, index) => html`
          <div class="todo-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" .checked="${todo.completed}" @change="${() => this.toggleCompleted(index)}">
            ${todo.text}
            <button class="delete-button" @click="${() => this.deleteTask(index)}">✖</button>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
