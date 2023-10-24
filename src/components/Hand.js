import React, { useEffect, useState } from 'react'

import Card from './Card';

import * as BJ from '../utils/blackjackutils'

const Hand = ({cards, showValue=false, onBust}) => {

  const [value, setValue] = useState([0, 0]);

  const getHandValueString = () => {
    if(value[0] > 21){
      return value[1];
    }

    return value[0] !== value[1] ? `${value[0]} or ${value[1]}` : value[0];
  }

  useEffect(() => {
    setValue(BJ.getHandValues(cards));
  }, [cards])

  useEffect(() => {
    if(BJ.isBust(value)) {
      onBust();
    }
  }, [value])

  return (
    <div>
      <div className="flex">
          {cards.map((card) => {
              return(
                  <Card card={card} key={card.id}/>
              );
          })}
      </div>
      {showValue && 
        <p className="text-2xl text-white">
          {
            getHandValueString()
          }
        </p>
      }
    </div>
  )
}

export default Hand