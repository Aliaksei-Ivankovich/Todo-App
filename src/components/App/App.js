import { Component } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, description: 'First task', createTime: new Date(2022, 12, 12), completed: false },
        { id: 2, description: 'Second task', createTime: new Date(2021, 12, 12), completed: false },
        { id: 3, description: 'One more task', createTime: new Date(2020, 12, 12), completed: false },
        { id: 4, description: 'Completed task', createTime: new Date(2019, 12, 12), completed: true },
      ],

      filter: 'all',
    };

    this.maxId = 5;
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
        id: this.maxId,
        description: value,
        createTime: new Date(),
        completed: false,
      };
      return { data: [...data, newTask] };
    });
    ++this.maxId;
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
    switch (filter) {
      case 'all':
        return data;
      case 'active':
        return data.filter((item) => item.completed === false);
      case 'completed':
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
