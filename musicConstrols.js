const timeSlider = document.querySelector('.time-slider')
const timeProgressBar = document.querySelector('.time-progress')
const volumeSlider = document.querySelector('.volume-slider')
const timeStart = document.querySelector('.time-start')

timeSlider.addEventListener('input',onChangeTimeSlider)
onChangeTimeSlider()
timeSlider.addEventListener('input',changeMusicTime)

volumeSlider.addEventListener('input',changeMusicVolume)


function onChangeTimeSlider (){

    timeProgressBar.style.width = `${(timeSlider.value/timeSlider.max)*100}%`
}
function changeMusicTime(){
    const activeAudio = document.querySelector('[data-status="selected"]')
    const timeV = timeSlider.value
    activeAudio.currentTime = timeV
    timeStart.innerText = `${Math.floor((timeV)/60)}:${Math.round((timeV)%60) < 10 ? `0${Math.round((timeV)%60)}`:`${Math.round((timeV)%60)}`}`
}
function changeMusicVolume(){
    const activeAudio = document.querySelector('[data-status="selected"]')
    activeAudio.volume = volumeSlider.value/100
}
export default onChangeTimeSlider



