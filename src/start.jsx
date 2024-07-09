import "./App.css";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

function Main({ score, start, dif, setDif1, setDif2, setDif3 }) {
  return (
    <div className="main">
      <h1>Welcome To My Game!</h1>
      <div className="buttons">
        <h1>Start Playing</h1>
        <div className="btn-h2 section1">
          <h2>Choose Difficulty</h2>
          <button className="startBtn" onClick={start}>
            Start {dif} Cards
          </button>
        </div>
        <div className="section2">
          <div className="dif-btns">
            <button className="btn1" onClick={setDif1}>
              Easy(12 cards)
            </button>
            <button className="btn2" onClick={setDif2}>
              Medium(20 cards)
            </button>
            <button className="btn3" onClick={setDif3}>
              Hard(30 cards)
            </button>
          </div>
          <div className="scoreStart">
            <h2>Best Score: {score}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
