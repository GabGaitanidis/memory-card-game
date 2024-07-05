import { useState, useEffect } from "react";
import "./App.css";

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
        <div className="main">
          <h1>Welcome To My Game!</h1>
          <div className="buttons">
            <h2>Choose Difficulty</h2>
            <button className="btn1" onClick={() => setDif(12)}>
              Easy(12 cards)
            </button>
            <button className="btn2" onClick={() => setDif(20)}>
              Medium(20 cards)
            </button>
            <button className="btn3" onClick={() => setDif(30)}>
              Hard(30 cards)
            </button>
            <button className="startBtn" onClick={() => setStart(true)}>
              Start {dif} Cards
            </button>
          </div>
          <div className="divicon">
            <a href="https://github.com/GabGaitanidis/memory-card-game">
              <img src="src\social.png" alt="" className="gitIcon" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
