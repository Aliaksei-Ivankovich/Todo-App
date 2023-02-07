import { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskValue: '',
      minValue: '',
      secValue: ''
    };
  }

  getTime = (min, sec) => {
    const taskTime = parseInt(min) * 60 + parseInt(sec)
    return taskTime
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onValueSubmit = (e) => {
    const {taskValue, minValue, secValue} = this.state
    const {onItemAdd} = this.props
    
    e.preventDefault();
    if (taskValue !== '' && /^\d+$/.test(minValue) && /^\d+$/.test(secValue)) {
      const taskTime = this.getTime(minValue, secValue)
      
      onItemAdd(taskValue, taskTime);
      this.setState({ 
        taskValue: '',
        minValue: '',
        secValue: ''
     });
    }
  };

  render() {
    const { taskValue, minValue, secValue} = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.onValueSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          name="taskValue"
          value={taskValue}
          onChange={this.onValueChange}
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
          onChange={this.onValueChange}/>
        <input 
          className="new-todo new-todo_timer" 
          placeholder="Sec" 
          type='number'
          step="1" 
          min="0" 
          max="60"
          name='secValue'
          value={secValue}
          onChange={this.onValueChange}/>
          <button className='new-todo__button' type='submit'></button>
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdd: () => {},
};

NewTaskForm.propTypes = {
  onItemAdd: PropTypes.func,
};

export default NewTaskForm;
