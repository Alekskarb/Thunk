import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, getTodolistsTC} from "./reducer";

class App extends React.Component {

    nextTodoListId = 0;

    state = {
        todolists: []
    };

    addTodoList = (title) => {
        this.props.addTodolistTC(title);
    };

    componentDidMount() {
        this.restoreState();
    };

    restoreState = () => {
        this.props.getTodolistsTC()
    };

    render = () => {
        const todolists = this.props.todolists
            .map(tl => <TodoList key={tl.id} id={tl.id}
                                 title={tl.title} tasks={tl.tasks}/>);

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

const ConnectedApp = connect(mapStateToProps, {addTodolistTC, getTodolistsTC})(App);
export default ConnectedApp;

