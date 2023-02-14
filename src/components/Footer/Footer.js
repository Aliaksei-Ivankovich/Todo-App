import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

import './Footer.css';

const Footer = (props) => {
  const { activeTasks, onCleareCompleted, onFilterData, filter } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{activeTasks} items left</span>
      <TasksFilter onFilterData={onFilterData} filter={filter} />
      <button className="clear-completed" onClick={onCleareCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  activeTasks: 0,
  onCleareCompleted: () => {},
  onFilterData: () => {},
  filter: 'all',
}

Footer.propTypes = {
  activeTasks: PropTypes.number,
  onCleareCompleted: PropTypes.func,
  onFilterData: PropTypes.func,
  filter: PropTypes.string,
}

export default Footer;
