import './TasksFilter.css';

const TasksFilter = (props) => {
  const { filter, onFilterData } = props
  const btnsArr = [
    { name: 'ALL', lable: 'All' },
    { name: 'ACTIVE', lable: 'Active' },
    { name: 'COMPLETED', lable: 'Completed' },
  ]

  const btnsList = btnsArr.map(({ name, lable }) => {
    const active = name === filter
    const clazz = active ? 'filters__btn filters__btn_selected' : 'filters__btn'

    return (
      <li className="filters__item" key={name}>
        <button className={clazz} onClick={() => onFilterData(name)}>
          {lable}
        </button>
      </li>
    )
  })

  return <ul className="filters">{btnsList}</ul>;
}

export default TasksFilter;
