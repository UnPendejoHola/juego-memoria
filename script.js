document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const attemptsElement = document.getElementById('attempts');
    const pairsElement = document.getElementById('pairs');
    const restartButton = document.getElementById('restart');
    
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let attempts = 0;
    let isProcessing = false;
    
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    
    initGame();
    
    function initGame() {
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        attempts = 0;
        isProcessing = false;
        
        attemptsElement.textContent = attempts;
        pairsElement.textContent = matchedPairs;
        
        gameBoard.innerHTML = '';
        
        const cardValues = [...emojis, ...emojis];
        
        const shuffledCards = shuffleArray(cardValues);
        
        shuffledCards.forEach((emoji, index) => {
            const card = createCard(emoji, index);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }
    
    function createCard(emoji, index) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.value = emoji;
        
        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = emoji;
        
        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = '?';
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.addEventListener('click', () => flipCard(card));
        
        return card;
    }
    
    function flipCard(card) {
        if (isProcessing || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        card.classList.add('flipped');
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            isProcessing = true;
            attempts++;
            attemptsElement.textContent = attempts;
            
            const [card1, card2] = flippedCards;
            
            if (card1.dataset.value === card2.dataset.value) {
                setTimeout(() => {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    flippedCards = [];
                    isProcessing = false;
                    
                    matchedPairs++;
                    pairsElement.textContent = matchedPairs;
                    
                    if (matchedPairs === emojis.length) {
                        setTimeout(() => {
                            alert(`¡Felicidades! Has completado el juego en ${attempts} intentos.`);
                        }, 500);
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    isProcessing = false;
                }, 1000);
            }
        }
    }
    
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    restartButton.addEventListener('click', initGame);
});