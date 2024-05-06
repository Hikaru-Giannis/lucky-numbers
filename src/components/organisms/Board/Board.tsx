import { Button } from "@/components/atoms/Button";
import { FC, useState } from "react";

type Card = {
  number: number;
};

type Props = {
  user: string;
  cards: Card[];
  updateBoardCards: (user: string, cards: Card[]) => void;
};

export const Board: FC<Props> = ({ user, cards, updateBoardCards }) => {
  // 選択中のカード
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const updateSelectedCards = (card: Card) => {
    // Max 4枚まで選択可能
    if (selectedCards.length >= 4) {
      return;
    }
    setSelectedCards([...selectedCards, card]);
  };

  const selected = (card: Card) => {
    return selectedCards.some(
      (selectedCard) => selectedCard.number === card.number
    );
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex justify-center items-center border w-10 h-10 cursor-pointer hover:bg-gray-200 ${
              selected(card) ? "bg-gray-200" : ""
            }`}
            onClick={() => updateSelectedCards(card)}
          >
            {card.number}
          </div>
        ))}
      </div>
      <div className="py-2">
        <Button
          onClick={() => {
            updateBoardCards(user, selectedCards);
          }}
          disabled={selectedCards.length < 4}
        >
          決定
        </Button>
      </div>
    </>
  );
};
