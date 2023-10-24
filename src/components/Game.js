import React, { useEffect } from 'react'
import { useState } from 'react'

import Dealer from './Dealer'
import Player from './Player'

import * as BJ from '../utils/blackjackutils'
import { usePlayerOverrideToggle } from '../providers/PlayerOverrideProvider'

const Game = ({bet, onHandOver, isHandActive, onDouble, canDouble}) => {

    const deck = BJ.createShoe(3);

    const [dealerHand, setDealerHand] = useState(BJ.dealDealer(deck));
    const [playerHand, setPlayerHand] = useState(BJ.dealPlayer(deck));

    const [isBust, setIsBust] = useState(false);
    const [isDealersTurn, setIsDealersTurn] = useState(false);

    const [isHandOver, setIsHandOver] = useState(false);
    const [handOverMessage, setHandOverMessage] = useState("");

    const disablePlayerButtons = usePlayerOverrideToggle();

    const dealAudio = new Audio("assets/audio/deal.ogg");
    const winAudio = new Audio("assets/audio/win.wav");

    // The dealers turn
    useEffect(() => {
        if(BJ.shouldDealerHit(BJ.getHandValues(dealerHand)) && isDealersTurn){
            setTimeout(() => {
                setDealerHand([
                    ...dealerHand,
                    BJ.dealCard(deck)
                ]);

                dealAudio.play();
                console.log(dealerHand);
            }, 1000)
        } else if(isDealersTurn) {
            endHand();
        }
    }, [dealerHand]);

    const newHand = () => {
        setIsHandOver(false);

        // Need to wait for bet here
        setDealerHand(BJ.dealDealer(deck));
        setPlayerHand(BJ.dealPlayer(deck));
        setIsBust(false);
        setIsDealersTurn(false);
        disablePlayerButtons(false);
    }

    const endHand = () => {
        setIsHandOver(true);

        const playerVals = BJ.getHandValues(playerHand);
        const dealerVals = BJ.getHandValues(dealerHand);

        let msg = "";
        let chipsAdjustment = 0;
        
        if(BJ.isBust(playerVals)) {
            msg = "BUST";
        } else if(BJ.isBust(dealerVals) || (BJ.getBestValue(playerVals) > BJ.getBestValue(dealerVals))) {
            msg = "PLAYER WINS";
            chipsAdjustment = bet * 2;
            console.log(bet); // Getting called twice ?!?!
            winAudio.play();
        } else if(BJ.getBestValue(playerVals) === BJ.getBestValue(dealerVals)){
            msg = "PUSH"
            chipsAdjustment = bet;
        }else{
            msg = "DEALER WINS";
        }

        setHandOverMessage(msg);
        
        setTimeout(() => {
            newHand(); 
            onHandOver(chipsAdjustment);
        }, 1500);
    }

    const hit = () => {
        setPlayerHand([
            ...playerHand,
            BJ.dealCard(deck)
        ]);

        dealAudio.play();
    }

    const double = () => {
        onDouble();
        hit();
        endPlayerTurn();
    }

    const endPlayerTurn = () => {
        disablePlayerButtons(true);

        if(BJ.isBust(BJ.getHandValues(playerHand))) {
            endHand();
            return;
        }

        startDealerTurn();
    }

    const startDealerTurn = () => {
        // Dealers turn!
        setTimeout(() => {
            setDealerHand((prev) => {
                return [prev[0], BJ.dealCard(deck)];
            });

            dealAudio.play();
            setIsDealersTurn(true);
        }, 1000);
    }

    return (
        <section className="h-full flex flex-col items-center justify-between">
            <Dealer 
                cards={dealerHand}
                isHandActive={isHandActive}
            />

            {
                bet == 0 && <p className="text-white opacity-50 text-3xl mb-2">Place your bet!</p> 
            }

            {
                isHandOver && 
                <h3 
                    className="text-8xl text-white"
                >
                    {handOverMessage}
                </h3>
            }

            <div className="flex justify-around">
                <Player 
                    cards={playerHand}
                    onHit={hit}
                    onBust={endPlayerTurn}
                    onDouble={double}
                    onStand={endPlayerTurn}
                    turnEnded={isDealersTurn}
                    currentBet={bet}
                    isHandActive={isHandActive}
                    canDouble={canDouble}
                />
            </div>
        </section>
    )
}

export default Game