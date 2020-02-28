import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    createTaskTC, deleteTaskTC, deleteTodolistTC, getTasksTC,
    updateTaskTC, updateTodolistTitleTC
} from "./reducer";

class TodoList extends React.Component {

    state = {
        filterValue: "All"
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTasks(this.props.id)
    };

    addTask = (newText) => {
        this.props.createTask(newText, this.props.id)
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    };

    changeTask = (taskId, obj) => {
        this.props.updateTask(taskId, obj)
    };

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    };
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
    };

    updateTitle = (title) => {
        this.props.updateTodolistTitle(title, this.props.id)
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle title={this.props.title} onDelete={this.deleteTodolist}
                                   updateTitle={this.updateTitle}/>
                    <AddNewItemForm addItem={this.addTask}/>

                </div>

                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                    /*tasks={this.props.tasks.filter(t => {*/
                               tasks={tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.isDone === false;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.isDone === true;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTasks(tasks, todolistId) {
            dispatch(getTasksTC(tasks, todolistId));
        },
        addTask: (newText, todolistId) => {
            dispatch(createTaskTC(newText, todolistId));
        },
        deleteTodolist: (todolistId) => {
            dispatch(deleteTodolistTC(todolistId));
        },
        deleteTask: (taskId, todolistId) => {
            dispatch(deleteTaskTC(taskId, todolistId))
        },
        updateTask(taskId, obj, todolistId) {
            dispatch(updateTaskTC(taskId, obj, todolistId));
        },
        updateTodolistTitle: (title, todolistId) => {
            dispatch(updateTodolistTitleTC(title, todolistId));
        },
    }
};

export default connect(null, mapDispatchToProps)(TodoList);



