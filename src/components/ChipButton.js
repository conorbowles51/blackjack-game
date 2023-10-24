import React from 'react'

import Button from './Button'

const ChipButton = ({color, value, onBet, disabled=false}) => {
  return (
    <Button 
        styles="text-2xl"
        onClick={() => {
            onBet(value);
        }}
        disabled={disabled}
        playAudio={true}
    >
        <div className="flex gap-2">
            <img src={`/assets/chips/chip_${color}.png`} className="object-contain"></img>
            <p>{value}</p>
        </div>
    </Button>
  )
}

export default ChipButton