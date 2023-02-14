import { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

const NewTaskForm = ({onItemAdd}) => {

  const [taskValue, setTaskValue] = useState('')
  const [minValue, setMinValue] = useState('')
  const [secValue, setSecValue] = useState('')


  const getTime = (min, sec) => {
    const taskTime = parseInt(min) * 60 + parseInt(sec)
    return taskTime
  }

  const onValueSubmit = (e) => {

    e.preventDefault();
    if (taskValue !== '' && /^\d+$/.test(minValue) && /^\d+$/.test(secValue)) {
      const taskTime = getTime(minValue, secValue)
      
      onItemAdd(taskValue, taskTime);
      setTaskValue('')
      setMinValue('')
      setSecValue('')
    }
  };


  return (
    <form className="new-todo-form" onSubmit={onValueSubmit}>
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        name="taskValue"
        value={taskValue}
        onChange={(e) => setTaskValue(e.target.value)}
      />
      <input 
        className="new-todo new-todo_timer" 
        placeholder="Min" 
        type='number'
        step="1" 
        min="0" 
        max="999"
        name='minValue'
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}/>
      <input 
        className="new-todo new-todo_timer" 
        placeholder="Sec" 
        type='number'
        step="1" 
        min="0" 
        max="60"
        name='secValue'
        value={secValue}
        onChange={(e) => setSecValue(e.target.value)}/>
        <button className='new-todo__button' type='submit'></button>
    </form>
  );

}

NewTaskForm.defaultProps = {
  onItemAdd: () => {},
};

NewTaskForm.propTypes = {
  onItemAdd: PropTypes.func,
};

export default NewTaskForm;
