/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from 'react';
import styles from './App.css';
import Person from "./Person/Person";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

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
    let persons = null;
    let btnClass = "";

    if (this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            // <ErrorBoudary>is so-called higher order component
            // it's component which simple wraps a component with
            // the goal of handling any errors that component
            // might throw.

            // && !!!! important
            // key always has to be on the outer element in a map 
            // method.

            // key property is actually a default property
            // react expects to find on an html default elements
            // and custom elements
            return <ErrorBoundary key={person.id}>
            <Person
            click={this.deletePersonHandler.bind(this, index)}
            name={person.name}
            age={person.age}
            // we can access person.id because we are inside 
            // the map method
            changed={(event) => { this.nameChangedHandle(event, person.id) }}
          /></ErrorBoundary>
          })}
        </div>
      );
      btnClass = styles.Red
    }

   
    // let classes = ["red", "bold"].join(" ");
    const classes = [];
    if(this.state.persons.length <3){
      classes.push(styles.red);
    }
    if(this.state.persons.length <2){
      classes.push(styles.bold);
    }

    return (
      // <StyleRoot>
        <div className={styles.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <button
          className={btnClass}
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
