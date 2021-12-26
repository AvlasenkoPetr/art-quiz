const rounds = document.querySelectorAll('.round-image')
const score = document.querySelectorAll('.score')

let playedRounds = []



function randomize(num) {
    return Math.ceil(Math.random() * num)
}

rounds.forEach((round, index) => {
    round.addEventListener('click', () => {
        createRound(index)
    })
})

class PlayedRound {
    constructor(roundNum, correctAnswers) {
        this.roundNum = roundNum
        this.correctAnswers = correctAnswers
    }
}





class Question {
    constructor(question, index, rightAnswer, answers) {
        this.question = question
        this.imgNum = index
        this.rightAnswer = rightAnswer
        this.answers = answers
    }
}




class Round {
    constructor(index, questions, categoryPage) {
        this.roundNum = index
        this.questions = questions

        this.currentQuestion = 0
        this.score = 0
        this.correctAnswers = []

        this.categoryPage = categoryPage // ЭТО СТРАНИЦА С РАУНДАМИ, ПЕРЕДАЕМ ЕЕ ЧТОБЫ В НЕЕ ВСТАВЛЯТЬ СДЕЛАННУЮ СТРАНИЦУ РАУНДОВ
        this.settings = settings
    }

    startQuiz() {
        let questionPage = document.createElement('div')
        questionPage.className = 'question-page'

        if (this.roundNum < Math.ceil(rounds.length / 2)) {

            // ЗДЕСЬ СОЗДАЕТСЯ ВЕРСТКА СТРАНИЦЫ ГДЕ НУЖНО УГАДЫВАТЬ ИМЯ АВТОРА ПО КАРТИНЕ

            questionPage.innerHTML = `
            <div style="display: flex">
                <h2 id="tohome">Home</h2>
                <h2 id="rounds">Rounds</h2>
            </div>
            <div id="timer"></div>
            <div class="question-page_conatiner">
                <h1 id="question">${this.questions[this.currentQuestion].question}</h1>
                <div id="question-image">
                    <ul id="question-bullets">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div class="question-buttons_container">
                    <div class="question-button"><p class="question-button_text"></p></div>
                    <div class="question-button"><p class="question-button_text"></p></div>
                    <div class="question-button"><p class="question-button_text"></p></div>
                    <div class="question-button"><p class="question-button_text"></p></div>
                </div>
            </div>`

            this.categoryPage.append(questionPage)
            this.updateQuestionArt()
            
            let questionBullets = document.getElementById('question-bullets')
            let questionButtons = document.querySelectorAll('.question-button')
            questionButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    if (button.textContent == this.questions[this.currentQuestion].rightAnswer.author) {
                        this.playResult(true)

                        button.classList.add('correct')
                        questionBullets.children[this.currentQuestion].classList.add('correct')

                        this.score++
                        this.correctAnswers.push(this.currentQuestion)
                        // score[this.roundNum].innerHTML = `${this.score} / 10`
                    } else {
                        this.playResult(false)
                        button.classList.add('uncorrect')
                        questionBullets.children[this.currentQuestion].classList.add('uncorrect')
                    }
                    this.showCorrectAnswer(button.textContent == this.questions[this.currentQuestion].rightAnswer.author)
                })
            })


        } else {
            // ЗДЕСЬ УГАДЫВАЕШЬ КАРТИНУ ПО ИМЕНИ АВТОРА

            questionPage.innerHTML = `
            <div style="display: flex">
                <h2 id="tohome">Home</h2>
                <h2 id="rounds">Rounds</h2>
            </div>
            <div id="timer"></div>
            <div class="question-page_conatiner">
                <h1 id="question">${this.questions[this.currentQuestion].question}</h1>
                <div id="bullets-container">
                    <ul id="question-bullets">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div class="question-buttons_container pic">
                    <div class="question-button-pic"></div>
                    <div class="question-button-pic"></div>
                    <div class="question-button-pic"></div>
                    <div class="question-button-pic"></div>
                </div>
            </div>`

            this.categoryPage.append(questionPage)
            this.updateQuestionPic()

            let questionBullets = document.getElementById('question-bullets')
            let questionButtons = document.querySelectorAll('.question-button-pic')
            questionButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    if (button.id == this.questions[this.currentQuestion].imgNum) {
                        this.playResult(true)

                        button.classList.add('correct')
                        questionBullets.children[this.currentQuestion].classList.add('correct')

                        this.score++
                        this.correctAnswers.push(this.currentQuestion)
                        // score[this.roundNum].innerHTML = `${this.score} / 10`

                    } else {
                        this.playResult(false)
                        button.classList.add('uncorrect')
                        questionBullets.children[this.currentQuestion].classList.add('uncorrect')
                    }

                    this.showCorrectAnswer(button.id == this.questions[this.currentQuestion].imgNum)
                })
            })
        }
        
        let toHomeButton = document.querySelector('#tohome')
        toHomeButton.addEventListener('click', () => {
            deletePage(toHomeButton, 'question-page')
            this.categoryPage.classList.remove('active')
        })
        
        let toRoundsButton = document.querySelector('#rounds')
        toRoundsButton.addEventListener('click', () => {
            deletePage(toHomeButton, 'question-page')
        })

        setTimeout(() => {
            questionPage.classList.add('active')
        }, 300)

    }

    updateQuestionArt() {
        let questionImage = document.getElementById('question-image')
        const img = new Image()
        img.src = `https://raw.githubusercontent.com/AvlasenkoPetr/image-data/master/full/${this.questions[this.currentQuestion].imgNum}full.jpg`
        img.onload = () => {
            questionImage.style.backgroundImage = `url(${img.src})`
        }

        let questionButtons = document.querySelectorAll('.question-button')
        questionButtons.forEach((button) => {
            if (button.className.split(' ').length > 1) {
                button.className = button.className.split(' ')[0]
            }
        })

        let questionInner = document.querySelectorAll('.question-button_text')
        questionInner.forEach((button, num) => {button.innerHTML = `${this.questions[this.currentQuestion].answers[num].author}`})

        if (this.settings.timeMode) {
            this.setTimer()
        }
    }

    updateQuestionPic() {
        let questionText = document.getElementById('question')
        questionText.innerHTML = this.questions[this.currentQuestion].question

        let questionButtons = document.querySelectorAll('.question-button-pic')
        questionButtons.forEach((button) => {
            if (button.className.split(' ').length > 1) {
                button.className = button.className.split(' ')[0]
            }
        })

        let questionImg = document.querySelectorAll('.question-button-pic')
        questionImg.forEach((button, num) => {
            let imgSrc = `https://raw.githubusercontent.com/AvlasenkoPetr/image-data/master/img/${this.questions[this.currentQuestion].answers[num].imageNum}.jpg`
            button.id = `${this.questions[this.currentQuestion].answers[num].imageNum}`
            button.style.backgroundImage = `url(${imgSrc})`
        })

        if (this.settings.timeMode) {
            this.setTimer()
        }
    }

    showCorrectAnswer(res) {
        let correctAnswer = document.createElement('div')
        correctAnswer.className = 'error-message'
        let imgSrc = `https://raw.githubusercontent.com/AvlasenkoPetr/image-data/master/img/${this.questions[this.currentQuestion].imgNum}.jpg`
        correctAnswer.innerHTML = `<div class="correct_container">
        <div class="correct-image" style="background-image: url(${imgSrc})">
            <div id="${res}"></div>
        </div>
        <h1>${this.questions[this.currentQuestion].rightAnswer.name}</h1>
        <p>${this.questions[this.currentQuestion].rightAnswer.author}, ${this.questions[this.currentQuestion].rightAnswer.year}</p>
        <div class="next-button">Next</div>
        </div>`

        this.categoryPage.append(correctAnswer)
        document.querySelector('.next-button').addEventListener('click', () => {
            this.currentQuestion++
            if (this.currentQuestion < this.questions.length) {
                if(this.roundNum < Math.ceil(rounds.length / 2)) {
                    this.updateQuestionArt()
                } else {
                    this.updateQuestionPic()
                }
                document.querySelector('.error-message').remove()

            } else {
                this.showResults()
            }

        })
        
        setTimeout(() => {
            document.querySelector('.correct_container').classList.add('active')
        }, 500)
    }

    showResults() {
        document.querySelector('.error-message').remove()

        this.playGameResult()
        let resultPhrase
        let resultCup

        if (this.score == 0) {
            resultPhrase = 'Game over'
            resultCup = 'gameover'
        } else if (this.score > 0 && this.score <= 5) {
            resultPhrase = 'Not bad!'
            resultCup = 'normal'
        } else if (this.score > 5 && this.score < 10) {
            resultPhrase = 'Congratulations!'
            resultCup = 'normal'
        } else {
            resultPhrase = 'Grand result!'
            resultCup = 'grand'
        }

        let roundResults = document.createElement('div')
        roundResults.className = 'error-message'
        roundResults.innerHTML = `<div class="correct_container">
        <div id ="${resultCup}" class="result-cup"></div>
        <h3>${resultPhrase}</h3>
        <h3>${this.score} / 10</h3>
        <div class="result-buttons_container">
            <div id="home" class="next-button result home">Home</div>
            <div id="next" class="next-button result">Next</div>
        </div>
        </div>`

        this.categoryPage.append(roundResults)

        // CАМЫЕ ЖЕСТКИЕ КОСТЫЛИ В МИРЕ СДЕЛАЙ ЧТО НИБУДЬ С НИМИ ОБЯЗАТЕЛЬНО, ЕСЛИ КТО НИБУДЬ ЭТО УВИДИТ ЕГО ОПРАВДАЮТ ЗА ТВОЕ УБИЙСТВО ПОСЛЕ ПРОСМОТРА КОДА

        document.getElementById('home').addEventListener('click', (event) => {
            score[this.roundNum].innerHTML = `${this.score} / 10`
            rounds[this.roundNum].classList.add('played')

            document.querySelector('.error-message').remove()
            document.querySelector('.question-page').remove()
            this.categoryPage.classList.remove('active')
        })

        document.getElementById('next').addEventListener('click', (event) => {        
            score[this.roundNum].innerHTML = `${this.score} / 10`
            rounds[this.roundNum].classList.add('played')

            document.querySelector('.error-message').remove()
            document.querySelector('.question-page').remove()
        })


        setTimeout(() => {
            document.querySelector('.correct_container').classList.add('active')
        }, 500)

        
        // СОЗДАЕМ ИНФУ О ПРОЙДЕНОМ РАУНДЕ

        for (let i = 0; i < playedRounds.length; i++) {
            if (playedRounds[i].roundNum == this.roundNum) {
                playedRounds.splice(i, 1)
            }
        }

        let playedRound = new PlayedRound(this.roundNum, this.correctAnswers)
        
        // console.log(this.correctAnswers)

        playedRounds.push(playedRound)
    }

    playResult(answer) {
        const audio = new Audio
        if (answer) {
            audio.src = './assets/audio/correct-answer.wav'

        } else {
            audio.src = './assets/audio/wrong-answer.wav'
        }
        audio.currentTime = 0
        audio.volume = this.settings.volume / 100
        audio.play()
    }

    playGameResult() {
        const audio = new Audio
        if (this.score == 0) {
            audio.src = './assets/audio/gameover.wav'
        } else if (this.score == 10) {
            audio.src = './assets/audio/grandresult.wav'
        } else {
            audio.src = './assets/audio/congratulations.wav'
        }
        audio.currentTime = 0
        audio.volume = this.settings.volume / 100
        audio.play()
    }

    async setTimer() {
        
        let questionBullets = document.getElementById('question-bullets')
        let timer = document.getElementById('timer')
        let roundTime = this.settings.time

        
        let timerUpdate = setInterval(() => {
            if (roundTime.toString().length > 1) {
                timer.innerHTML = `00 : ${roundTime}`
            }  else {
                timer.innerHTML = `00 : 0${roundTime}`
            }
            roundTime--
        }, 1000)
        
        let timerEnd = setTimeout(() => {
            timer.innerHTML = `00 : 00`
            clearInterval(timerUpdate)
            questionBullets.children[this.currentQuestion].classList.add('uncorrect')
            this.showCorrectAnswer(false)
            this.playResult(false)
        }, ((roundTime + 1) * 1000))
        
        let parentPage = await findParentPage(timer, 'question-page')
        parentPage.addEventListener('click', (e) => {
            // console.log('Клик по:', e.target.tagName.toLowerCase())
            // console.log('Класслист: ', e.target.classList)
            if (e.target.tagName.toLowerCase() == 'h2'|| e.target.classList.contains('question-button') || 'h2'|| e.target.classList.contains('question-button-pic')) {
                // console.log('Останавливаем все!')
                clearTimeout(timerEnd)
                clearInterval(timerUpdate)
            }
        })
        
    }
}




async function createRound(index) {
    
    const data = await getJson()

    // ВОТ В ЭТОМ ЦИКЛЕ ГЕНЕИРУРУЕМ ОБЪЕКТЫ-ВОПРОСЫ И ПОТОМ ЗАКИДЫВАЕМ ИХ В КЛАСС РАУНДА 

    let roundQuestions = []

    for (let i = index * 10; i <= ((index * 10) + 9); i++) {

        let answers = [data[i]]
        start: while (answers.length < 4) {
            // console.log('Добавляем неправильный ответ')

            let wrongAnswer = data[randomize(240)]
            for (option of answers) {

                if (option.author == wrongAnswer.author) {
                    // console.log(`Авторы совпали! ${option.author} и ${wrongAnswer.author}`)
                    continue start
                }
            }
            // console.log('Добавялем ', wrongAnswer.author)
            answers.push(wrongAnswer)
        }
        answers.sort(() => 0.5 - Math.random())


        let questionText
        if (index < 12) {
            questionText = 'Who is the author of this picture?'
        } else {
            questionText = `Which picture was drawn by ${data[i].author}?`
        }


        let q = new Question(questionText, i, data[i], answers)

        
        roundQuestions.push(q)
    }

    // ЗДЕСЬ МЫ ПРОВЕРЯЕМ ГДЕ СОЗДАВАТЬ СТРАНИЦУ РАУНДА, СОЗДАЕМ ЕГО КЛАСС И ЗАПУСКАЕМ ЕГО МЕТОД СОЗДАНИЯ СТРАНИЦЫ

    let categoryPage
    if (index < 12) {
        categoryPage = document.querySelector('.picture-quiz')
    } else {
        categoryPage = document.querySelector('.artist-quiz')
    } 

    let r = new Round(index, roundQuestions, categoryPage)
    console.log(r)
    r.startQuiz()
}