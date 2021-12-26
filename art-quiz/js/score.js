scoreButtons = document.querySelectorAll('.score-button')

scoreButtons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation()
        createScorePage(button, index)
    })
})


async function createScorePage(button, index) {
    const roundPictures = await getScorePageInfo(index)
    const categoryPage = await findParentPage(button, 'quiz-page')
    
    const scorePage = document.createElement('div')
    scorePage.className = 'quiz-page score-page'
    scorePage.innerHTML = `
    <div style="display:flex">
        <h2 class="to-menu">Home</h2>
        <h2 class="to-rounds">Rounds</h2>
    </div>
    <div class="hide-border">
        <div class="rounds-container score-container">
        </div>
    </div>`

    categoryPage.append(scorePage)

    let toRoundsButton = document.querySelector('.to-rounds')
    toRoundsButton.addEventListener('click', async () => {
        await deletePage(toRoundsButton, 'score-page')
    })

    let homeButton = document.querySelector('.to-menu')
    homeButton.addEventListener('click', async () => {
        categoryPage.classList.remove('active')
        await deletePage(toRoundsButton, 'score-page')
    })

    await loadPictures(scorePage, 'score-container', roundPictures, index)

    setTimeout(() => {
        scorePage.classList.add('active')
    }, 300)
}

async function deletePage(elem, parentPageClass) {
    let parentPage = await findParentPage(elem, parentPageClass)
    await parentPage.classList.remove('active')
    setTimeout(() => {
        parentPage.remove()
    }, 300)
}

async function getScorePageInfo(index) {
    const data = await getJson()
    const roundPictures = await getPicturesInfo(index, data)
    return roundPictures
}

async function getJson() {
    let masterpieces_json = 'images.json'
    const res = await fetch(masterpieces_json)
    const data = await res.json()
    return data
}

async function getPicturesInfo(index, data) {
    let roundPictures = []
    for (let i = index * 10; i <= ((index * 10) + 9); i++) {
        roundPictures.push(data[i])
    }
    return roundPictures
}

async function findParentPage(elem, parentPageClass) {
    if (elem.classList.contains(parentPageClass)) {
        return elem

    } else if (elem == document.documentElement) {
        throw Error(`Невозможно найти родителя по введенному классу "${parentPageClass}"`)

    } else {
        return findParentPage(elem.parentNode, parentPageClass)
    }
}

async function loadPictures(page, container ,data, roundNum) {
    let pictureContainer = page.querySelector(`.${container}`)
    let guessedPictures
    
    for (round of playedRounds) {
        if (round.roundNum == roundNum) {
            guessedPictures = round.correctAnswers
        }
    }

    for (let i = 0; i < data.length; i++) {
        let picture = document.createElement('div')

        if (guessedPictures.includes(i)) {
            picture.className = 'round-image played'
        } else {
            picture.className = 'round-image'
        }

        let pictureInfo = document.createElement('div')
        pictureInfo.className = 'image-info'
        pictureInfo.style.background = rgba
        pictureInfo.innerHTML = `
        <p>${data[i].author}</p>
        <p>${data[i].name}, ${data[i].year}</p>
        ` 

        picture.append(pictureInfo)
        picture.addEventListener('click', () => {
            pictureInfo.classList.toggle('active')
        })
        
        picture.style.backgroundImage = `url(https://raw.githubusercontent.com/AvlasenkoPetr/image-data/master/img/${data[i].imageNum}.jpg)`
        pictureContainer.append(picture)
    } 
}