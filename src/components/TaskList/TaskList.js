import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns';

import Task from '../Task/Task';

import './TaskList.css';


function TaskList(props) {
  const { data, onDeleteTasck, onEditItem, onTaskDone, onTimer } = props;

  const elements = () => {
    if(data.length !== 0) {
      return   data.map((item) => {
        const { id, createTime, ...itemProps } = item;
        const time = `created ${formatDistanceToNow(parseISO(createTime), { includeSeconds: true })} ago`;
    
        return (
          <Task
            {...itemProps}
            key={id}
            onDeleteTasck={() => onDeleteTasck(id)}
            onEditItem={onEditItem}
            id={id}
            onTaskDone={() => onTaskDone(id)}
            onTimer={onTimer}
            createTime={time}
          />
        );
      });
    }
    return <span className="todo-list__empty">No tasks to do added</span>
  }


  return <ul className="todo-list">{elements()}</ul>;
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
