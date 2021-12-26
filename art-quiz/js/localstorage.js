function setLocalStorage() {
    localStorage.setItem('settingsVolume', settings.volume)
    localStorage.setItem('settingsTimeMode', settings.timeMode)
    localStorage.setItem('settingsTime', settings.time)
    localStorage.setItem('settingsColor', settings.color)
    localStorage.setItem('playedRounds', JSON.stringify(playedRounds))
}

function getLocalStorage() {
    if (localStorage.getItem('settingsVolume')) {
        settings.volume = +localStorage.getItem('settingsVolume')
        volumeRange.value = settings.volume
        changeVolume()
    }

    if (localStorage.getItem('settingsTimeMode')) {
        if (localStorage.getItem('settingsTimeMode') == 'false') {
            settings.timeMode = false
            timeMode.checked = false
        } else {
            settings.timeMode = true
            timeMode.checked = true
        }
    }

    if (localStorage.getItem('settingsTime')) {
        settings.time = +localStorage.getItem('settingsTime')
        roundTime.value = settings.time
    }

    if (localStorage.getItem('settingsColor')) {
        settings.color = localStorage.getItem('settingsColor')
        colorInput.value = settings.color
        changeAccentColor()
    }

    if(localStorage.getItem('playedRounds')) {
        playedRounds = JSON.parse(localStorage.getItem('playedRounds')).sort((a, b) => a.roundNum - b.roundNum)
        setPlayedRounds()
    }
}

function setPlayedRounds() {
    for (let i = 0; i < playedRounds.length; i++) {
        rounds[playedRounds[i].roundNum].classList.add('played')
        rounds[playedRounds[i].roundNum].previousElementSibling.children[1].innerHTML = `${playedRounds[i].correctAnswers.length} / 10`
    }
}


window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)