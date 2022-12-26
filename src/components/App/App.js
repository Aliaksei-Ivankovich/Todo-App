import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      data: [],
      filter: ''
    };
    this.filters = {
      ALL: 'ALL',
      ACTIVE: 'ACTIVE',
      COMPLETED: 'COMPLETED'
    };
  }
  

  componentDidMount() {
    const localData = localStorage.getItem('data');
    const filter = this.filters.ALL
    
    if(localData) {
      const data = JSON.parse(localData)
      this.setState({data: data})
    }
    this.setState({filter})
  }

  componentDidUpdate() {
    localStorage.setItem('data', JSON.stringify(this.state.data));
  }

  onTaskDone = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => (item.id === id ? { ...item, completed: !item.completed } : { ...item })),
    }));
  };

  onDeleteItem = (id) => {
    this.setState(({ data }) => ({ data: data.filter((item) => item.id !== id) }));
  };

  onAddItem = (value) => {
    this.setState(({ data }) => {
      const newTask = {
        id: uuidv4(),
        description: value,
        createTime: new Date().toISOString(),
        completed: false,
      };
      return { data: [...data, newTask] };
    });
  };

  onCleareCompleted = () => {
    this.setState(({ data }) => ({ data: data.filter((item) => item.completed === false) }));
  };

  onEditItem = (id, value) => {
    this.setState(({ data }) => ({
      data: data.map((item) => (item.id === id ? { ...item, description: value } : { ...item })),
    }));
  };

  updateData = (data, filter) => {
    const {ALL, ACTIVE, COMPLETED} = this.filters

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
  };

  onFilterData = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, filter } = this.state;

    const activeTasks = data.filter((item) => item.completed === false).length;
    const filttredData = this.updateData(data, filter);

    return (
      <section className="todoapp">
        <header className="todoapp__header">
          <h1 className="todoapp__title">todos</h1>
          <NewTaskForm onItemAdd={this.onAddItem} />
        </header>
        <section className="todoapp__main">
          <TaskList
            data={filttredData}
            onDeleteTasck={this.onDeleteItem}
            onEditItem={this.onEditItem}
            onTaskDone={this.onTaskDone}
          />
          <Footer
            activeTasks={activeTasks}
            onCleareCompleted={this.onCleareCompleted}
            onFilterData={this.onFilterData}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}

export default App;
