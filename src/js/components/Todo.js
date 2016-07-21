import React from "react";

import * as todoActions from "../actions/todoActions";

export default class Featured extends React.Component {

  constructor() {
    super();
    this.state = {
      complete: false
    }
    this.deleteTodo = this.deleteTodo.bind(this);
    this.markComplete = this.markComplete.bind(this);
  };

  deleteTodo() {
    todoActions.deleteTodo(this.props.id);
  };

  markComplete() {

    this.setState({complete: !this.state.complete}, function() {
      todoActions.changeStatus(this.state.complete, this.props.id);
    });
  };

  componentWillMount() {
    const self = this;
    this.setState({complete: JSON.parse(this.props.complete)}, function() {
      console.log(self.state)
    });
  };

  render() {

    const inline = {
      display: "inline",
      margin: "0px 10px",
      float: "left"
    };

    const todoStyle = {
      margin: "20px",
      padding: "5px",
      height: "50px"
    };

    return (
      <div style={todoStyle}>
        <p style={inline}>{this.props.title}</p>
        <div style={inline}> <p style={inline}> Complete </p> <input style={inline} onChange={this.markComplete} checked={this.state.complete} type="checkbox" name="completed" value={this.state.complete}/> </div>
        <button style={inline} onClick={this.deleteTodo} className="">Delete</button>
      </div>
    );
  }
};

