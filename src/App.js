/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from 'react';
import './App.css';
import Person from "./Person/Person";

// radium is a popular package for react which allows
// us to use inline styles with pseudo selectors and
// media queries
// import Radium, { StyleRoot } from "radium";

class App extends Component {
  state = {
    persons: [
      { id: "sndjs", name: "Max", age: 28 },
      { id: "sndfj", name: "Manu", age: 29 },
      { id: "sdjdq", name: "Jennie", age: 27 }
    ],
    showPerson: false,
  }

  togglePersonHandler = () => {
    const doseShow = this.state.showPerson;
    this.setState({ showPerson: !doseShow });
  }
  // the flaw of this approach is that in javascript, objects
  // and arrays are reference types, so we are actucally storing
  // pointer to the original person's object managed by react,
  // to the original state, so when we use persons.splice
  // is actually mutate the original persons array data

  // deletePersonHandler = (index) => {
  //   const persons = this.state.persons;
  //   persons.splice(index, 1);
  //   this.setState( {persons: persons} );
  // }

  // a better way to do so, is copy the orginal one first
  // by using array build in method arr.slice() or spread
  // operator in es6
  deletePersonHandler = (index) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  nameChangedHandle = (event, id) => {
    // find the corresponding id of the changing Person element
    const personIndex = this.state.persons.findIndex(person => person.id === id);

    // copy the person object
    // const person = Object.assign({}, this.state.persons[personIndex]);
    const person = {
      ...this.state.persons[personIndex]
    };

    // mutate the copy person object name
    person.name = event.target.value;

    // copy the persons array
    const persons = [...this.state.persons];

    // assign the mutated copy person object to the
    // copy persons array
    persons[personIndex] = person;

    // setState: assign the mutated copy persons array to
    // ths persons array
    this.setState({ persons: persons });
  }

  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid green",
      padding: "8px",
      transition: "all .3s",

      ":hover": {
        backgroundColor: "mediumseagreen",
        border: "1px solid mediumseagreen",
        transform: "translateY(-3px)",
        boxShadow: "0 10px 20px rgba(black, .2)", //doesn't work
        cursor: "pointer",
      },
      ":active": {
        backgroundColor: "LimeGreen",
        border: "1px solid LimeGreen",
        transform: "translateY(-1px)",
        boxShadow: "0 5px 10px rgba(black, .4)",
        cursor: "pointer",
      },
    }

    let persons = null;

    if (this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={this.deletePersonHandler.bind(this, index)}
              name={person.name}
              age={person.age}
              // key property is actually a default property
              // react expects to find on an html default elements
              // and custom elements
              key={person.id}
              // we can access person.id because we are inside 
              // the map method
              changed={(event) => { this.nameChangedHandle(event, person.id) }}
            />
          })}
        </div>
      );

      style.backgroundColor = "red";
      style[":hover"] = {
        backgroundColor: "pink",
        border: "1px solid pink",
        transform: "translateY(-3px)",
        boxShadow: "0 10px 20px rgba(black, .2)", //doesn't work
        cursor: "pointer",
      };
      style[":active"] = {
        backgroundColor: "LightCoral",
        border: "1px solid LightCoral",
        transform: "translateY(-1px)",
        boxShadow: "0 5px 10px rgba(black, .4)",
        cursor: "pointer",
      };
    }
   
    // let classes = ["red", "bold"].join(" ");
    const classes = [];
    if(this.state.persons.length <3){
      classes.push("red");
    }
    if(this.state.persons.length <2){
      classes.push("bold");
    }

    return (
      // <StyleRoot>
        <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonHandler}>
          Toggle Persons
      </button>
        {persons}
      </div>
      // </StyleRoot>
    );
  }
}

// export default Radium(App);
export default App;
