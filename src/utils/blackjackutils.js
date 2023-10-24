
export const createShoe = (numDecks) => {
    const suits = ['S', 'D', 'H', 'C'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const shoe = [];

    let cardId = 0;

    for(let i = 0; i < numDecks; i++){
        suits.forEach((suit) => {
            ranks.forEach((rank) => {
                shoe.push({suit: suit, rank: rank, id: cardId++});
            });
        });
    }

    return shoe;
}

export const dealPlayer = (deck) => {
    const hand = [];

    hand.push(dealCard(deck), dealCard(deck));

    return hand;
}

export const dealDealer = (deck) => {
    const hand = [];

    hand.push(dealCard(deck));
    hand.push({suit: 'FD', rank: ''})

    return hand;
}

export const dealCard = (deck) => {
    const index = Math.floor(Math.random() * deck.length);

    const card = deck[index];
    deck.splice(index, 1);
    
    return card;
}

export const getCardValues = (card) => {
    if(card.suit === 'FD') return [0, 0];

    switch (card.rank){
        case 'A': return [11, 1];
        case 'K': return [10, 10];
        case 'Q': return [10, 10];
        case 'J': return [10, 10];
        default: return [parseInt(card.rank), parseInt(card.rank)];
    }
}

export const getHandValues = (hand) => {
    let val = [0, 0];

    hand.forEach((card) => {
      const cardVals = getCardValues(card);


      val[0] += cardVals[0];
      val[1] += cardVals[1];
    });

    return val;
}

export const getBestValue = (hand) => {
    const values = getHandValues(hand);

    if(hand[0] > 21) {
        return hand[1];
    } else {
        return hand[0];
    }
}

export const isBust = (values) => {
    if(values[0] > 21 && values[1] > 21) {
        return true;
    }

    return false;
}

export const shouldDealerHit = (values) => {
    return values[0] < 17 || (values[0] > 21 && values[1] < 17);
}