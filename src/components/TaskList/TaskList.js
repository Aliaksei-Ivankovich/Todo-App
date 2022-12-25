import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Task from '../Task/Task'; 

import './TaskList.css';

function TaskList(props) {
  const { data, onDeleteTasck, onEditItem, onTaskDone } = props;

  const elements = data.map((item) => {
    const { id, createTime, ...itemProps } = item;
    const time = `created ${formatDistanceToNow(createTime, { includeSeconds: true })} ago`;

    return (
      <Task
        {...itemProps}
        key={id}
        onDeleteTasck={() => onDeleteTasck(id)}
        onEditItem={onEditItem}
        id={id}
        onTaskDone={() => onTaskDone(id)}
        createTime={time}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  data: [],
  onDeleteTasck: () => {},
  onEditItem: () => {},
  onTaskDone: () => {},
};

TaskList.propTypes = {
  data: PropTypes.array,
  onDeleteTasck: PropTypes.func,
  onEditItem: PropTypes.func,
  onTaskDone: PropTypes.func,
};

export default TaskList;
