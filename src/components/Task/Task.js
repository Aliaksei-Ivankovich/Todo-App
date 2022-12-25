import { Component } from 'react';

import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      editing: false,
    };
  }

  onToggleEdit = () => {
    if (!this.props.completed) {
      this.setState(({ editing }) => ({
        editing: !editing,
      }));
    } else {
      console.log('Task Completed!');
    }
  };

  onEditValue = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    this.props.onEditItem(this.props.id, this.state.description);
    this.onToggleEdit();
  };

  render() {
    const { onDeleteTasck, onTaskDone, createTime, completed } = this.props;
    const { description, editing } = this.state;

    let itemClass = 'todo-item';

    if (completed) itemClass += ' todo-item_completed';
    if (editing) itemClass += ' todo-item_editing';

    return (
      <li className={itemClass}>
        <div className="todo-item__view">
          <input className="todo-item__toggle" type="checkbox" onChange={onTaskDone} checked={completed} />
          <label className="todo-item__toggle-lable">
            <span className="todo-item__description">{description}</span>
            <span className="todo-item__created">{createTime}</span>
          </label>
          <button className="todo-item__icon todo-item__icon-edit" onClick={this.onToggleEdit}></button>
          <button className="todo-item__icon todo-item__icon-destroy" onClick={onDeleteTasck}></button>
        </div>
        <form onSubmit={this.onSubmitTask}>
          <input type="text" className="todo-item__edit" value={description} onChange={this.onEditValue} />
        </form>
      </li>
    );
  }
}

export default Task;
