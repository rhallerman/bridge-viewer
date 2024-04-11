import React, { useContext } from "react";
import { Context } from "../Context/Context";
import { trade } from "../Control/Trade";

const AnalysisTable = () => {
  const {
    handsDup,
    setHandsDup,
    trickCardsDup,
    reality,
    mode,
    tradeCard,
    setTradeCard,
    historyDup,
    setHistoryDup,
    play,
    renderCard,
    renderHand,
    unassign,
    vul,
  } = useContext(Context);

  const contract = (
    <div className="contractAndDirection">
      <div className="contract">6</div>
      <div className="suit3">{"\u2663"}</div>
      <div className="direction">W</div>
    </div>
  );

  const cardsOnTable = Array.from(trickCardsDup).map((card) =>
    renderCard(
      card,
      `card trickOnTable trickOnTable${card.hand}`,
      false,
      () => {},
      true
    )
  );

  const table = (
    <div className="table">
      <div className="nsVuls">
        <div
          className={`northTrapezoid ${
            [1, 3].includes(vul) ? "northRed" : "northWhite"
          }`}
        ></div>
        <div
          className={`southTrapezoid ${
            [1, 3].includes(vul) ? "southRed" : "southWhite"
          }`}
        ></div>
      </div>
      <div className="ewVuls">
        <div
          className={`westTrapezoid ${
            [2, 3].includes(vul) ? "westRed" : "westWhite"
          }`}
        ></div>
        <div
          className={`eastTrapezoid ${
            [2, 3].includes(vul) ? "eastRed" : "eastWhite"
          }`}
        ></div>
      </div>
      {cardsOnTable}
    </div>
  );

  const handleCardClicked = (card) => {
    if (mode === "play") {
      play(card, false);
    } else if (mode === "assign") {
      // TODO
      if (card.hand !== mode) {
        let tempHands = [...handsDup];
        const deleteIdx = handsDup[card.hand].findIndex(
          (assignedCard) =>
            assignedCard.suit === card.suit && assignedCard.rank === card.rank
        );
        tempHands[card.hand].splice(deleteIdx, 1);
        tempHands[mode].push({ ...card, hand: mode });
        setHandsDup(tempHands);
      }
    } else if (mode === "unassign") {
      unassign(card);
    } else if (mode === "trade") {
      trade(card, handsDup, tradeCard, setTradeCard, historyDup, setHistoryDup);
    }
  };

  const northHand = renderHand(
    0,
    "Kalita",
    "card",
    false,
    handleCardClicked,
    true
  );

  const southHand = renderHand(
    2,
    "Klukowski",
    "card",
    false,
    handleCardClicked,
    true
  );

  const eastHand = renderHand(
    1,
    "Di Franco",
    "card",
    false,
    handleCardClicked,
    true
  );

  const westHand = renderHand(
    3,
    "Manno",
    "card",
    false,
    handleCardClicked,
    true
  );

  const playArea = (
    <div
      className={`playArea animate offAnalysis ${
        !reality ? "onAnalysis" : ""
      } enabledCursor`}
    >
      {contract}
      <div className="board">
        {table}
        {northHand}
        {southHand}
        {eastHand}
        {westHand}
      </div>
    </div>
  );

  return playArea;
};

export default AnalysisTable;