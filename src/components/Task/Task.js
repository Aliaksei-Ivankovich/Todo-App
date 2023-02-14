import { useState, useMemo } from 'react';
import cl from 'classnames';

import Timer from '../Timer/Timer';

import './Task.css';

const Task = (props) => {

  const { description, id, onTimer, onDeleteTasck, onTaskDone, createTime, completed, taskTime, onEditItem } = props

  const [taskDescr, setTaskDescr] = useState(description)
  const [editing, setEditing] = useState(false)

  const stopTimer = (leftTime) => {
    onTimer(id, leftTime)
  }

  const onToggleEdit = () => {
    setEditing((editing) => (editing = !editing))
  }

  const onEditValue = (e) => {
    setTaskDescr(e.target.value)
  }

  const onSubmitTask = (e) => {
    e.preventDefault();

    onEditItem(id, taskDescr);
    onToggleEdit()
  }

  const clazz = useMemo(() => (
    cl(
      'todo-item', {
        ' todo-item_completed': completed,
        ' todo-item_editing': editing
    })
  ), [editing, completed])
  

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
            <Timer taskTime={taskTime} stopTimer={stopTimer}/>
          </span>
          <span className="todo-item__created">{createTime}</span>
        </label>
        <button className="todo-item__icon todo-item__icon-edit" 
                onClick={onToggleEdit}>
        </button>
        <button className="todo-item__icon todo-item__icon-destroy" 
                onClick={onDeleteTasck}>
        </button>
      </div>
      <form onSubmit={onSubmitTask}>
        <input type="text" 
              className="todo-item__edit" 
              value={taskDescr} 
              onChange={onEditValue} />
      </form>
    </li>
  )
}

export default Task;
