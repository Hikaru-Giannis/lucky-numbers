"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Board } from "@/components/organisms/Board/Board";
import { useState } from "react";

type Card = {
  number: number;
};

type BoardCard = {
  coordinate: { x: number; y: number };
  card: Card | null;
};

export default function Initial() {
  // 参加人数
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);
  const updateNumberOfParticipants = (value: number) => {
    setNumberOfParticipants(value);
  };

  // 参加人数が確定したか
  const [isParticipantsConfirmed, setIsParticipantsConfirmed] = useState(false);

  // 入力された参加者名
  const [participantName, setParticipantName] = useState("");

  // 参加ユーザーリスト
  const [participants, setParticipants] = useState<string[]>([]);

  // 1~20の範囲で初期カード枚数を設定
  const baseCardCount = 20;
  const [cards, setCards] = useState<Card[]>([]);

  // ユーザーごとにカードを配る
  // 盤面は 4x4 の 16 枚
  const [boardCards, setBoardCards] = useState<
    {
      user: string;
      holadCards: Card[];
      boardCards: BoardCard[];
    }[]
  >([]);

  // 引数のユーザーと番号のカードをユーザーのボードに配置
  const setCard = (user: string, cards: Card[]) => {
    // cardをnumberでソート
    const sortedCards = cards.sort((a, b) => a.number - b.number);

    const newBoardCards = boardCards.find(
      (boardCard) => boardCard.user === user
    );
    if (!newBoardCards) {
      return;
    }

    newBoardCards.boardCards = newBoardCards.boardCards.map((boardCards) => {
      if (boardCards.coordinate.x === 0 && boardCards.coordinate.y === 0) {
        return {
          coordinate: boardCards.coordinate,
          card: sortedCards[0],
        };
      } else if (
        boardCards.coordinate.x === 1 &&
        boardCards.coordinate.y === 1
      ) {
        return {
          coordinate: boardCards.coordinate,
          card: sortedCards[1],
        };
      } else if (
        boardCards.coordinate.x === 2 &&
        boardCards.coordinate.y === 2
      ) {
        return {
          coordinate: boardCards.coordinate,
          card: sortedCards[2],
        };
      } else if (
        boardCards.coordinate.x === 3 &&
        boardCards.coordinate.y === 3
      ) {
        return {
          coordinate: boardCards.coordinate,
          card: sortedCards[3],
        };
      }

      return boardCards;
    });

    setBoardCards(
      boardCards.map((boardCard) =>
        boardCard.user === user ? newBoardCards : boardCard
      )
    );
  };

  {
    console.log(boardCards);
  }

  return (
    <main className="container flex flex-col justify-center items-center p-5 gap-3">
      <div>
        <h1>参加画面</h1>
      </div>
      <div className="flex flex-col w-1/5 gap-2">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            align="right"
            defaultValue={numberOfParticipants}
            disabled={isParticipantsConfirmed}
            min={0}
            max={4}
            onChange={(e) => updateNumberOfParticipants(Number(e.target.value))}
          />
          <p>人</p>
        </div>
        <div className="flex justify-center">
          {isParticipantsConfirmed ? (
            <Button
              color="outline"
              onClick={() => {
                setIsParticipantsConfirmed(false);
              }}
            >
              参加人数を変更
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsParticipantsConfirmed(true);
              }}
            >
              参加人数を確定
            </Button>
          )}
        </div>
      </div>
      {isParticipantsConfirmed && (
        <div className="flex flex-col justify-center items-center gap-3">
          <h2>参加者</h2>
          <Input
            type="text"
            onChange={(e) => {
              setParticipantName(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              setParticipants([...participants, participantName]);
              setParticipantName("");
              // 1~20の範囲で初期カード枚数を設定
              const newCards = Array.from({ length: baseCardCount }).map(
                (_, index) => {
                  return { number: index + 1 };
                }
              );
              setCards((prev) => [...prev, ...newCards]);
            }}
          >
            参加者を追加
          </Button>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>
        </div>
      )}

      {isParticipantsConfirmed &&
        participants.length == numberOfParticipants && (
          <>
            <div>
              <Button
                onClick={() => {
                  // (0,0)から(3,3)までの座標を初期値としてボードを作成
                  const newBoardCards = participants.map((participant) => {
                    const newCards = Array.from({ length: 16 }).map(
                      (_, index) => {
                        return {
                          coordinate: {
                            x: index % 4,
                            y: Math.floor(index / 4),
                          },

                          card: null,
                        };
                      }
                    );
                    return {
                      user: participant,
                      holadCards: [],
                      boardCards: newCards,
                    };
                  });
                  setBoardCards(newBoardCards);
                }}
              >
                ゲームスタート
              </Button>
            </div>
            {boardCards.length > 0 && (
              <>
                <div>
                  <div className="flex flex-col items-center">
                    <h2>カード</h2>
                    {
                      <Board
                        cards={cards}
                        user={participants[0]}
                        updateBoardCards={setCard}
                      />
                    }
                  </div>
                </div>
                <div className="flex items-center">
                  {boardCards.map((boardCard, index) => (
                    <div key={index}>
                      <h2>{boardCard.user}</h2>
                      <div className="grid grid-cols-4 gap-2">
                        {boardCard.boardCards.map((boardCard, index) => (
                          <div
                            key={index}
                            className="flex justify-center items-center border w-10 h-10"
                          >
                            {boardCard.card ? (
                              <>{boardCard.card.number}</>
                            ) : (
                              <></>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
    </main>
  );
}
