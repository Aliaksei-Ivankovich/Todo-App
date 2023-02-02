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

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onValueSubmit = (e) => {
    console.log(e)
    const {taskValue} = this.state
    const {onItemAdd} = this.props
    
    e.preventDefault();
    if (this.state.value !== '') {
      onItemAdd(taskValue);
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
          autoFocus
          name='minValue'
          value={minValue}
          onChange={this.onValueChange}/>
        <input 
          className="new-todo new-todo_timer" 
          placeholder="Sec" 
          autoFocus
          name='secValue'
          value={secValue}
          onChange={this.onValueChange}/>
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
