const Hangman = function(word, guesses = 10){
    this.word = word.toLowerCase().split('')
    this.guessesRemaining = guesses
    this.guessedLetters = []
    this.message = 'Start guessing by pressing letters on the keyboard'
    this.isComplete = false
}

Hangman.prototype.getPuzzle = function(){
    let guessedWord = ''
    this.word.forEach((letter) => {
        if(this.guessedLetters.includes(letter) || letter === ' ')
            guessedWord += letter
        else
            guessedWord += '*'
    })
    return guessedWord
}

Hangman.prototype.addGuess = function(letter){
    letter = letter.toLowerCase()
    if(!this.isComplete){
        if(!this.guessedLetters.includes(letter)){
            this.guessedLetters.push(letter)
            if(!this.word.includes(letter)){
                this.guessesRemaining--
                this.message = 'Incorrect Guess! Try Again...'
            }else{
                this.message = 'Correct Guess! Carry On...'
            }
        }
    } 
    this.checkComplete()
}

Hangman.prototype.checkComplete = function(){
    if(!this.getPuzzle().includes('*')){
        this.isComplete = true
        this.message = 'Congratulations! You have guessed the word...'
    }else if(this.guessesRemaining === 0){
        this.isComplete = true
        this.message = `Sorry! You ran out of guesses! Puzzle Word: ${this.word.join('')}`
    }
}

Hangman.prototype.render = function(){
    const div = document.querySelector('div.app')
    div.innerHTML = ''
    const puzzleText = createParagraph(this.getPuzzle(), 'puzzle-text')
    const guessText = createParagraph(`Guesses Remaining: ${this.guessesRemaining}`, 'guess-text')
    const messageText = createParagraph(this.message, 'message-text')

    // puzzleText.setAttribute('contenteditable', 'true')

    div.appendChild(puzzleText)
    div.appendChild(guessText)
    div.appendChild(messageText)
}

const createParagraph = function(content, className){
    const paragraph = document.createElement('p')
    paragraph.classList.add(className)
    paragraph.textContent = content
    return paragraph
}