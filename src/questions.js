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

  getTopic = (event) => {
    let name = event.target.name;
    this.setState({ topic: name });
  };

  finishQuiz = () => {
    //delete collection from database
  };

  createRoom = () => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${this.state.topic}`
      )
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
  //geog cat - https://opentdb.com/api.php?amount=10&type=multiple&category=22
  render() {
    return (
      <div>
        <p>click topic and then click create room</p>
        {/*} <button onClick={this.getQuestions}>General Knowledge</button> */}

        <button name="22" onClick={this.getTopic}>
          Geography{" "}
        </button>
        <button name="23" onClick={this.getTopic}>
          History
        </button>
        <button name="24" onClick={this.getTopic}>
          Politics
        </button>
        <button name="9" onClick={this.getTopic}>
          General Knowledge
        </button>
        <button name="21" onClick={this.getTopic}>
          Sports
        </button>
        <br></br>
        <button onClick={this.createRoom}>Create Room </button>
        <br></br>
        <button onClick={this.finishQuiz}>Finish Quiz</button>
      </div>
    );
  }
}

export default Questions;
