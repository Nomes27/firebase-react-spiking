import "./App.css";
import React from "react";
import firebase from "./firebase";
//import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Questions from "./questions";
//NEED TO INSTALL BOTH FIREBASE AND FIREBASE TOOLS

const db = firebase.firestore();
const usersDb = db.collection("users");

class App extends React.Component {
  state = {
    email: "",
    password: "",
  };

  submit = (event) => {
    //creatUserandpassword method would go in here
    let email = this.state.email;
    let password = this.state.password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
      });
    event.preventDefault();
    usersDb.doc().set({
      //if leave doc() empty it creates uid for name of doc
      email: email,
      password: password,
    });
    /*
    db.collection("users")
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs);
      });*/
  };
  handleUpdate = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="App">
        <h1>test</h1>
        <form onSubmit={this.submit}>
          <label>
            Enter email
            <input
              name="email"
              type="text"
              onChange={this.handleUpdate}
            ></input>
          </label>
          <label>
            Enter password
            <input
              name="password"
              type="text"
              onChange={this.handleUpdate}
            ></input>
          </label>
          <button>Submit</button>
        </form>
        <Questions />
      </div>
    );
  }
}

export default App;
