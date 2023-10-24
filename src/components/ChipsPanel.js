import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Button from './Button'
import ChipButton from './ChipButton'

const ChipsPanel = ({chips, onBet, onConfirm, isHandActive}) => {
    return (
        <Sidebar styles="gap-1">
            <img src="/assets/chips/chip_purple.png" className="w-[50%] my-9"></img>
            <h1 className="text-white text-2xl">{chips.toLocaleString()}</h1>
            <ChipButton color="purple" value={100} onBet={onBet} disabled={isHandActive}/>
            <ChipButton color="green" value={200} onBet={onBet} disabled={isHandActive}/>
            <ChipButton color="blue" value={500} onBet={onBet} disabled={isHandActive}/>
            <ChipButton color="red" value={1000} onBet={onBet} disabled={isHandActive}/>
            <ChipButton color="purple" value={2000} onBet={onBet} disabled={isHandActive}/>
            <ChipButton color="green" value={5000} onBet={onBet} disabled={isHandActive}/>
            <ChipButton color="blue" value={10000} onBet={onBet} disabled={isHandActive}/>

            <Button styles="text-2xl" onClick={onConfirm} disabled={isHandActive} playAudio={true}>
                CONFIRM BET
            </Button>
        </Sidebar>
    )
}

export default ChipsPanel