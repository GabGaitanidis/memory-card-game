import { useState, useEffect } from "react";
import "./App.css";
import Main from "./start";

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [won, setWon] = useState(false);
  const [res, setRes] = useState(false);
  const [lose, setLose] = useState(false);
  const [start, setStart] = useState(false);
  const [dif, setDif] = useState(12);
  useEffect(() => {
    setScore(0);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.deckofcardsapi.com/api/deck/new/draw/?count=${dif}`
        );
        const data = await response.json();
        setCardsData(data.cards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [res, lose, dif]);

  useEffect(() => {
    setCardsData(shuffleArray(cardsData));
  }, [pickedCards]);

  const handlePickedCards = (card) => {
    if (pickedCards.includes(card.code)) {
      console.log("You lose");
      setScore(0);
      setPickedCards([]);
      setLose(lose == false ? true : false);
    } else {
      setPickedCards([...pickedCards, card.code]);
      setScore(score + 1);
      setBestScore(bestScore <= score ? score + 1 : bestScore);
      handleGameWinLogic();
    }
  };
  const handleGameWinLogic = () => {
    if (score == dif - 1) {
      setScore(score + 1);
      setWon(true);
    }
  };

  const handleRestart = () => {
    setRes(res == false ? true : false);
    setWon(false);
    setStart(false);
  };
  return (
    <div className="div">
      {start ? (
        <div>
          <div className="scoreBoard-h1">
            <div>
              <h1 className="h1" onClick={handleRestart}>
                CardMemoryGame
              </h1>
            </div>
            <div className="scores">
              <h4>Score: {score}</h4>
              <h3>Best Score: {bestScore}</h3>
            </div>
          </div>
          <div className="container">
            {cardsData.map((card) => (
              <div key={card.code}>
                <img
                  src={card.image ? card.image : null}
                  alt={card.code ? card.code : "Card"}
                  className="card"
                  onClick={() => handlePickedCards(card)}
                />
              </div>
            ))}
          </div>
          <div className="restart">
            {won ? (
              <div>
                <h1>YOU WINNNN!!!!!</h1>
                <button onClick={handleRestart}>Restart</button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <Main
          score={bestScore}
          start={() => setStart(true)}
          dif={dif}
          setDif1={() => setDif(12)}
          setDif2={() => setDif(20)}
          setDif3={() => setDif(30)}
        />
      )}
    </div>
  );
}

export default App;
{
  /* <div className="main">
          <h1>Welcome To My Game!</h1>
          <div className="buttons">
            <div className="btn-h2 section1">
              <h2>Choose Difficulty</h2>
              <button className="startBtn" onClick={() => setStart(true)}>
                Start {dif} Cards
              </button>
            </div>
            <div className="section2">
              <div className="dif-btns">
                <button className="btn1" onClick={() => setDif(12)}>
                  Easy(12 cards)
                </button>
                <button className="btn2" onClick={() => setDif(20)}>
                  Medium(20 cards)
                </button>
                <button className="btn3" onClick={() => setDif(30)}>
                  Hard(30 cards)
                </button>
              </div>
              <div className="scoreStart">
                <h2>Best Score: {bestScore}</h2>
              </div>
            </div>
          </div>
        </div> */
}
