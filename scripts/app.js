const options = {
    difficulty: 3,
    guesses: 5
}

const startGame = async (options) => {
    const data = await fetchPuzzle(options.difficulty)
    runGame(data, options.guesses)
}

const runGame = (data,guesses) => {
    const game = new Hangman(data,guesses)

    game.render()

    window.addEventListener('keydown', function(e){
        game.addGuess(e.key.toLowerCase())
        game.render()
    })
}

startGame(options)

document.querySelector('.reset').addEventListener('click', function(e){
    startGame(options)
})

document.querySelector('.difficulties').addEventListener('change', function(e){
    if(this.value === 'se'){
        options.difficulty = 1
        options.guesses = 3
    }else if(this.value === 'e'){
        options.difficulty = 2
        options.guesses = 4
    }else if(this.value === 'm'){
        options.difficulty = 3
        options.guesses = 5
    }else if(this.value === 'h'){
        options.difficulty = 5
        options.guesses = 7
    }else if(this.value === 'sh'){
        options.difficulty = 7
        options.guesses = 9
    }
})

// getLocationData().then((data)=>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })