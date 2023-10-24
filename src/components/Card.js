import React from 'react'

// Images are 18 x 22

const Card = ({card}) => {
  return (
    <img 
        src={`/assets/cards/${card.rank}${card.suit}.png`} 
        alt={`${card.suit}${card.rank}`} 
        width={54}
        height={66}
    />
  )
}

export default Card