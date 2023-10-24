import React, { useEffect } from 'react'

import { useState } from 'react'

import Game from './components/Game'
import PlayerOverrideProvider from './providers/PlayerOverrideProvider'
import BlackjackTable from './components/BlackjackTable'
import NavPanel from './components/NavPanel'
import ChipsPanel from './components/ChipsPanel'

const BlackJack = () => {
  const [chips, setChips] = useState(10000);
  const [currentBet, setCurrentBet] = useState(0);

  const [isHandActive, setIsHandActive] = useState(false);

  const [canDouble, setCanDouble] = useState(false);

  useEffect(() => {
    checkCanDouble();
  }, []);

  const placeBet = (value) => {
    setChips(prev => prev - value);
    setCurrentBet(prev => prev + value);
  }

  const confirmBet = () => {
    setIsHandActive(true);
    checkCanDouble();
  }

  const onHandOver = (chipsAdjustment) => {
    setCurrentBet(0);
    setChips(prev => prev + chipsAdjustment);
    setIsHandActive(false);
  }

  const checkCanDouble = () => {
    setCanDouble(chips >= currentBet);
  }

  const double = () => {
    placeBet(currentBet);
  }
  
  return (
    <div className="h-[100vh] flex bg-gradient-to-b from-purple-600 to-blue-950">
      <NavPanel />

      <main className="h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-7xl text-white mb-5 [text-shadow:_0_4px_0_rgb(0_0_0_/_80%)]">BLACKJACK</h1>

        <PlayerOverrideProvider>
          <BlackjackTable>
            <Game 
              bet={currentBet} 
              onHandOver={onHandOver} 
              onDouble={double}
              isHandActive={isHandActive}
              canDouble={canDouble}
            />
          </BlackjackTable>
        </PlayerOverrideProvider>
      </main>

      <ChipsPanel chips={chips} onBet={placeBet} onConfirm={confirmBet} isHandActive={isHandActive}/>
    </div>
  )
}

export default BlackJack