import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, getTodolistsTC, setTodolistsAC} from "./reducer";

class App extends React.Component {

    nextTodoListId = 0;

    state = {
        todolists: []
    }

    addTodoList = (title) => {
        this.props.addTodolist(title);
    };

    componentDidMount() {
        this.restoreState();
    };

    restoreState = () => {
        this.props.getTodolists()
    };

    render = () => {
        const todolists = this.props.todolists
            .map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (title) => {
            dispatch(addTodolistTC(title));
        },
        getTodolists: () => {
            dispatch(getTodolistsTC())
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

