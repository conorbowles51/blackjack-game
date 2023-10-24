import React, { useState } from 'react'

import Hand from './Hand'
import Button from './Button'
import { usePlayerOverride } from '../providers/PlayerOverrideProvider';
import ChipButton from './ChipButton';

const Player = ({cards, onHit, onBust, onStand, onDouble, turnEnded, currentBet, isHandActive, canDouble}) => {

  const [hasBet, setHasBet] = useState(false);
  const [bet, setBet] = useState(0);

  const buttonsOverride = usePlayerOverride();

  return (
    <section className="flex flex-col items-center">
        {
          currentBet != 0 &&
          <div>
            <ChipButton color="red" value={currentBet}/>
          </div>
        }
        
        { isHandActive&&
          <Hand 
            cards={cards} 
            showValue={true} 
            onBust={() => {
              onBust();
            }} 
          />
        }

        { !isHandActive&&
          <Hand 
            cards={[{suit: 'FD', rank: ''}, {suit: 'fd', rank: ''}]} 
            showValue={false} 
            onBust={() => {
              onBust();
            }} 
          />
        }

        {isHandActive &&
          <div>
              <Button 
                disabled={turnEnded || !canDouble || buttonsOverride}
                onClick={onDouble}
              >
                DOUBLE
              </Button>

              <Button 
                disabled={turnEnded || buttonsOverride} 
                onClick={onHit}
              >
                HIT
              </Button>

              <Button 
                disabled={turnEnded || buttonsOverride}
                onClick={onStand}
              >
                STAND
              </Button>
              {/* <Button disabled={turnEnded || !canSplit}>Split</Button> */}
          </div>
        }
    </section>
  )
}

export default Player