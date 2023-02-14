import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

const App = () => {

  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [loadingLocalData, setLoadingLocalData] = useState(true)

  const filters = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED'
  }
  
  useEffect(() => {
    const localData = localStorage.getItem('data')
    
    if(localData) {
      setData(JSON.parse(localData))
    }
    setLoadingLocalData(false)
    setFilter(filters.ALL)
  }, [])

  useEffect(() => {
    if (!loadingLocalData) {
      localStorage.setItem('data', JSON.stringify(data))
    }
  }, [data])

  const onTaskDone = (id) => {
    setData(data => 
      data.map((item) => (item.id === id ? { ...item, completed: !item.completed } : { ...item }))
    )
  }

  const onDeleteItem = (id) => {
    setData(data => data.filter((item) => item.id !== id))
  }

  const onAddItem = (description, taskTime) => {
    const newTask = {
      id: uuidv4(),
      description,
      createTime: new Date().toISOString(),
      completed: false,
      taskTime
    }
    setData(data => [...data, newTask])
  }

  const onCleareCompleted = () => {
    setData(data => data.filter((item) => item.completed === false))
  }

  const onEditItem = (id, value) => {
    setData(data => data.map((item) => (item.id === id ? { ...item, description: value } : { ...item })))
  }

  const onTimer = (id, taskTime) => {
    setData(data => data.map((item) => (item.id === id ? { ...item, taskTime } : { ...item })))
  }

  const updateData = (data, filter) => {
    const {ALL, ACTIVE, COMPLETED} = filters

    switch (filter) {
      case ALL:
        return data;
      case ACTIVE:
        return data.filter((item) => item.completed === false);
      case COMPLETED:
        return data.filter((item) => item.completed === true);
      default:
        return data;
    }
  }

  const onFilterData = (filter) => {
    setFilter(filter)
  }

  const activeTasks = data.filter((item) => item.completed === false).length;
  const filttredData = updateData(data, filter);

  return (
    <section className="todoapp">
      <header className="todoapp__header">
        <h1 className="todoapp__title">todos</h1>
        <NewTaskForm onItemAdd={onAddItem} />
      </header>
      <section className="todoapp__main">
        <TaskList
          data={filttredData}
          onDeleteTasck={onDeleteItem}
          onEditItem={onEditItem}
          onTaskDone={onTaskDone}
          onTimer={onTimer}
        />
        <Footer
          activeTasks={activeTasks}
          onCleareCompleted={onCleareCompleted}
          onFilterData={onFilterData}
          filter={filter}
        />
      </section>
    </section>
  )
}

export default App;
