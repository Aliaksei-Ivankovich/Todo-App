import { Component } from 'react';
import cl from 'classnames';

import Timer from '../Timer/Timer';

import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      isTimerOn: false,
      editing: false,
    };
  }

  stopTimer = (leftTime) => {
    const { id, onTimer } = this.props
    onTimer(id, leftTime)
  }

  onTimerPlay = () => {
    this.setState({
      isTimerOn: true
    })
  }

  onTimerStop = () => {
    this.setState({
      isTimerOn: false
    })
  }

  onToggleEdit = () => {
    this.setState(({ editing }) => ({
      editing: !editing,
    }));
  };

  onEditValue = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmitTask = (e) => {
    const { description } = this.state
    const { id, onEditItem } = this.props

    e.preventDefault();
    onEditItem(id, description);
    this.onToggleEdit();
  };

  render() {
    const { onDeleteTasck, onTaskDone, createTime, completed, taskTime } = this.props;
    const { description, editing, isTimerOn} = this.state;

    const clazz = cl(
      'todo-item', {
        ' todo-item_completed': completed,
        ' todo-item_editing': editing
    });
 

    return (
      <li className={clazz}>
        <div className="todo-item__view">
          <input className="todo-item__toggle" 
                type="checkbox" 
                onChange={onTaskDone} 
                checked={completed} />
          <label className="todo-item__toggle-lable">
            <span className="todo-item__description">
              {description}
            </span>
            <span className='timer__wrapper'>
              <button className="todo-item__icon icon-play" 
                      onClick={this.onTimerPlay}
                      disabled={isTimerOn}>
              </button>
              <button className="todo-item__icon icon-pause"
                      onClick={this.onTimerStop}
                      disabled={!isTimerOn}>
              </button>
              <Timer taskTime={taskTime}
                      isTimerOn={isTimerOn}
                      stopTimer={this.stopTimer}/>
            </span>
            <span className="todo-item__created">{createTime}</span>
          </label>
          <button className="todo-item__icon todo-item__icon-edit" 
                  onClick={this.onToggleEdit}>
          </button>
          <button className="todo-item__icon todo-item__icon-destroy" 
                  onClick={onDeleteTasck}>
          </button>
        </div>
        <form onSubmit={this.onSubmitTask}>
          <input type="text" 
                className="todo-item__edit" 
                value={description} 
                onChange={this.onEditValue} />
        </form>
      </li>
    );
  }
}

export default Task;
