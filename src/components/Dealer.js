import React from 'react'
import Hand from './Hand'

const Dealer = ({cards, isHandActive}) => {
  return (
    <section>
        {isHandActive && 
          <Hand cards={cards} onBust={() => {}} showValue={true}/>
        }

        {!isHandActive &&
          <Hand 
            cards={[{suit: 'FD', rank: ''}, {suit: 'fd', rank: ''}]} 
            showValue={false} 
            onBust={() => {}} 
        />
        }
    </section>
  )
}

export default Dealer