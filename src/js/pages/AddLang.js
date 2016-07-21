import React from "react";
import { Link } from "react-router";



import * as todoActions from "../actions/todoActions";


export default class AddLang extends React.Component {

  constructor() {
    super();
    this.state = {
      title: "",
      oo: false,
      types: false,
      classes: false,
      inheritance: false
    }
    this.handleChange = this.handleChange.bind(this);

  };

  handleChange (key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  };

  handleBoolChange (key) {
    return function (e) {
      console.log(typeof e.target.value);
      const value = parseString(e.target.value)
      console.log(value);
      var state = {};
      state[key] = !value;
      console.log(state)
      this.setState(state);
    }.bind(this);

    function parseString(string) {

      if (string.toLowerCase() === "false") {
        return false;
      }
      else {
        return true;
      }


    };

  };

  sendLang () {
    console.log(this.state);
  };

  render() {

    return (
      <div className="page-body">
        <h1> Add Lang </h1>
        <fieldset className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="title" value={this.state.name} onChange={this.handleChange('name')}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="name">Date Added</label>
          <input type="date" className="form-control" id="date" value={this.state.date} onChange={this.handleChange('date')}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="name">Author</label>
          <input type="text" className="form-control" id="author" value={this.state.author} onChange={this.handleChange('author')}/>
        </fieldset>
        <h1> Features </h1>
        <fieldset className="form-group">
          <label htmlFor="name">Object Oriented?</label>
          <input onChange={this.handleBoolChange('oo')} checked={this.state.oo} type="checkbox" name="oo" id="oo" value={this.state.oo}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="name">Types</label>
          <input onChange={this.handleBoolChange('types')} checked={this.state.types} type="checkbox" name="types" id="types" value={this.state.types}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="name">Inheritance?</label>
          <input onChange={this.handleBoolChange('inheritance')} checked={this.state.inheritance} type="checkbox" name="inheritance" id="inheritance" value={this.state.inheritance}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="name">Class Based?</label>
          <input onChange={this.handleBoolChange('classes')} checked={this.state.classes} type="checkbox" name="classes" id="classes" value={this.state.classes}/>
        </fieldset>
        <button onClick={this.sendLang.bind(this)} className="btn btn-primary">Submit Language</button>
      </div>

    );
  }
}
