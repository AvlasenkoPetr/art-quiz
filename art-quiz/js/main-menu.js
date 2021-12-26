// --------------------- SETTINGS -----------------------------------------------------------------------------------------

const settingButton = document.querySelector('.settings-button')
const settingMenu = document.querySelector('.settings-menu')
const exitButton = document.querySelector('.exit-button')

const settings = {
    volume: 50,
    timeMode: false,
    time: 5,
    color: '#f594d8',
}

const saveButton = document.querySelector('.save-button')
const defaultButton = document.querySelector('.default-button')
const roundTime = document.querySelector('.round-time')
const timeMode = document.querySelector('.switch').firstElementChild
const colorInput = document.querySelector('.input-color')

const audio = new Audio()
const volumeRange = document.querySelector('.volume-range')
const volumeButton = document.querySelector('.volume-button')


function openSettings() {
    settingButton.classList.toggle('active')
    settingMenu.classList.toggle('active')
}

settingButton.addEventListener('click', openSettings)

exitButton.addEventListener('click', () => {
    if (settings.volume != volumeRange.value || settings.timeMode != timeMode.checked || settings.time != roundTime.value || settings.color != colorInput.value) {
        let errorMessage = document.createElement('div')
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
        <div class="error-container">
            <h2>You haven't saved changes, it won't be applied!</h2>
            <div class="error-buttons_container"></div>
        </div>`
        
        let backButton = document.createElement('div')
        backButton.className = 'settings-button_main save-button'
        backButton.innerHTML = 'Back'
        backButton.addEventListener('click', () => {
            errorMessage.remove()
        })

        let continueButton = document.createElement('div')
        continueButton.className = 'settings-button_main'
        continueButton.innerHTML = 'Continue'
        continueButton.addEventListener('click', () => {
            errorMessage.remove()
            volumeRange.value = settings.volume
            changeVolume()
            timeMode.checked = settings.timeMode
            roundTime.value = settings.time
            openSettings()
            colorInput.value = settings.color
            changeAccentColor()
        })

        settingMenu.append(errorMessage)

        let errorButtonsContainer = document.querySelector('.error-buttons_container')
        errorButtonsContainer.append(backButton, continueButton)

    } else {
        openSettings()
    }
})



saveButton.addEventListener('click', () => {
    settings.volume = +volumeRange.value
    settings.timeMode = timeMode.checked
    settings.time = +roundTime.value
    settings.color = colorInput.value

    openSettings()
})

function toDefaultSettings() {
        volumeRange.value = 50
        changeVolume()
        timeMode.checked = false
        roundTime.value = 5
        colorInput.value = '#f594d8'
        changeAccentColor()
}

defaultButton.addEventListener('click', toDefaultSettings)

let rgba

function changeAccentColor() {
    document.documentElement.style.setProperty('--color', colorInput.value)
    changeVolume()

    const r = parseInt(colorInput.value.substr(1,2), 16)
    const g = parseInt(colorInput.value.substr(3,2), 16)
    const b = parseInt(colorInput.value.substr(5,2), 16)
    rgba = `rgba(${r}, ${g}, ${b}, 0.6)`
}

colorInput.addEventListener('input', changeAccentColor)


// --------------------- VOLUME -----------------------------------------------------------------------------------------


function changeVolume() {
    audio.volume = volumeRange.value / 100
    volumeRange.setAttribute('style', `background: linear-gradient(to right,${colorInput.value} 0%, ${colorInput.value} ${volumeRange.value}%, rgba(255, 255, 255, 0.6) ${volumeRange.value}%, rgba(255, 255, 255, 0.6) 100%);`)
    
    if (volumeRange.value == 0) {
        volumeButton.classList.add('muted')
    } else {
        volumeButton.classList.remove('muted')
    }
}

volumeRange.addEventListener('input', changeVolume)

volumeButton.addEventListener('click', function() {
    if (volumeRange.value == 0) {
        volumeRange.value = 50
        volumeButton.classList.remove('muted')
    } else {
        volumeRange.value = 0;
        volumeButton.classList.add('muted');
    }
    
    volumeRange.setAttribute('style', `background: linear-gradient(to right,rgb(245, 148, 216) 0%, rgb(245, 148, 216) ${volumeRange.value}%, rgba(255, 255, 255, 0.6) ${volumeRange.value}%, rgba(255, 255, 255, 0.6) 100%);`);
    audio.volume = volumeRange.value / 100;
})

const timeButtons = document.querySelectorAll('.round-time_button')

timeButtons.forEach((button) => {
    button.addEventListener('click', function() {
        if (button.innerHTML == '+') {
            button.previousElementSibling.stepUp()
        } else {
            button.nextElementSibling.stepDown()
        }
    })
})

// --------------------- QUIZ PAGE -----------------------------------------------------------------------------------------

const quizButtons = document.querySelectorAll('.quiz-button')
const pictureQuiz = document.querySelector('.picture-quiz')
const artistQuiz = document.querySelector('.artist-quiz')


quizButtons[0].addEventListener('click', () => {
    artistQuiz.classList.add('active')
})

quizButtons[1].addEventListener('click', () => {
    pictureQuiz.classList.add('active')
})

const homeButtons = document.querySelectorAll('.home-button')

homeButtons.forEach((button) => {
    button.addEventListener('click', async () => {
        let page = await findParentPage(button, 'quiz-page')
        page.classList.remove('active')
    })
})


function setBg() {
    const img = new Image();       
    img.src = `https://raw.githubusercontent.com/AvlasenkoPetr/image-data/master/full/239full.jpg`
    img.onload = () => {
        document.body.style.backgroundImage = `url("${img.src}")`
    }
}

setBg()

console.log(`Спасибо огромное за то что дали мне возможность доделать работу!
Самооценка: 210 + во сколько оцените доп функционал / 220

Стартовая страница и навигация +20

Настройки +40

Страница категорий +30

Страница с вопросами +50

Страница с результатами +50

Одновременная загрузка и плавная смена изображений +0

Анимация +20?
Тут не совсем понимаю, я засчитал себе за анимацию:
Появление кнопки score при наведении на картинку сыгранного раунда
Появление ифнормации о картине при клике по ней на странице score
У кнопок в главном меню вроде нестандартная анимация
У кнопок 'Home' и 'Rounds' тоже не самая обычная анимация

Доп функционал ?
Если не сохранить настройки и попытаться выйти появится окно предупреждения, если нажать "Continue" из настроек вы выйдите, но изменения сбросятся
В настройках можно поменять цвет акцентов, в случае если вам не нравится розовый)
В зависимости от результатов раунда появляется разное модальное окно и играет разная музыка

Вы можете проверить это на Round 1, вот его ответы:
1. Pavel Fedotov
2. Edgar Degas
3. Veronese
4. Ilya Repin
5. Konstantin Makovsky
6. Vasily Perov
7. Michelangelo
8. Pierre Auguste Renoir
9. Jan Vermeer
10. Vasily Polenov

Для результатов 0, 1-4, 5-9, 10 будет разная фраза
Для результатов 0, 1-9, 10 будут разные картинки и музыка`)