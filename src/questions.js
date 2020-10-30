import "./App.css";
import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import axios from "axios";

const db = firebase.firestore();
const generalKnowledge = db.collection("general knowledge");
const multipleChoice = db.collection("multiplechoice");
class Questions extends React.Component {
  state = {
    0: { question: "", answer: "" },
    1: { question: "", answer: "" },
    2: { question: "", answer: "" },
  };

  getQuestions = () => {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then(({ data: { results } }) => {
        this.setState({
          0: {
            question: results[0].question,
            answer: results[0].correct_answer,
          },
          1: {
            question: results[1].question,
            answer: results[1].correct_answer,
          },
          2: {
            question: results[2].question,
            answer: results[2].correct_answer,
          },
        });
        generalKnowledge.doc().set({
          question: this.state["0"].question,
          answer: this.state["0"].answer,
        });
      });
  };

  getMultiple = () => {
    axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(({ data: { results } }) => {
        console.log(results);
        results.map((result) => {
          multipleChoice.doc().set({
            question: result.question,
            correct_answer: result.correct_answer,
            incorrect_answers: result.incorrect_answers,
          });
        });
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.getQuestions}>General Knowledge</button>
        <button onClick={this.getMultiple}>Multiple Choice</button>
      </div>
    );
  }
}

export default Questions;
