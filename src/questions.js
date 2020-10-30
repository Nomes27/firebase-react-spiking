import "./App.css";
import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import axios from "axios";

const db = firebase.firestore();
const generalKnowledge = db.collection("general knowledge");
const multipleChoice = db.collection("multiplechoice");
const rooms = db.collection("rooms");

class Questions extends React.Component {
  state = {
    topic: "",
  };

  getMultiple = (event) => {
    let name = event.target.name;
    this.setState({ topic: name });
  };

  finishQuiz = () => {
    //delete collection from database
  };

  createRoom = () => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&${this.state.topic}`)
      .then(({ data: { results } }) => {
        const mapped = results.map((result) => {
          return [
            {
              question: result.question,
              correct_answer: result.correct_answer,
              incorrect_answers: result.incorrect_answers,
            },
          ];
        });
        let merged = mapped.flat();
        rooms.doc().set({
          questions: merged,
        });
      });
  };

  render() {
    return (
      <div>
        <p>click topic and then click create room</p>
        {/*} <button onClick={this.getQuestions}>General Knowledge</button> */}
        <button name="multiple" onClick={this.getMultiple}>
          Multiple Choice
        </button>
        <button onClick={this.finishQuiz}>Finish Quiz</button>
        <button onClick={this.createRoom}>Create Room </button>
      </div>
    );
  }
}

export default Questions;
