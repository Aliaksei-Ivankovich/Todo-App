import { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onValueChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onValueSubmit = (e) => {
    e.preventDefault();
    if (this.state.value !== '') {
      this.props.onItemAdd(this.state.value);
      this.setState(() => ({ value: '' }));
    }
  };

  render() {
    const { value } = this.state;

    return (
      <form onSubmit={this.onValueSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={value}
          onChange={this.onValueChange}
        />
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
