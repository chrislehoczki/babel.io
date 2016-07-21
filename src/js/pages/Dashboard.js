import React from "react";

import todoStore from "../stores/todoStore.js";
import Todo from "../components/Todo.js"

export default class Featured extends React.Component {

  	constructor() {
		super();
		this.state = {
			todos: todoStore.getAll()
		}

		this.getTodos = this.getTodos.bind(this);

	};

	componentWillMount() {
		console.log("this is beginning state", this.state)
		todoStore.on("change", this.getTodos);
	};

	componentWillUnmount() {
		todoStore.removeListener("change", this.getTodos);
	};

	getTodos() {
		this.setState({
			todos: todoStore.getAll()
		});
	};

  	render() {
	  	console.log(this.state.todos)
	  	const todoComponents = this.state.todos.map(function(todo, i) {
	  		return <Todo key={todo.id} title={todo.title} id={todo.id} complete={todo.complete} />
	  	});


	    return (
	      <div className="page-body">
	        <h1>Dashboard</h1>
	        <p> This is where all of your wonderful todos will go, why not add one and see what I mean? </p>
	        {todoComponents}
	      </div>
	    );
	  }
}
