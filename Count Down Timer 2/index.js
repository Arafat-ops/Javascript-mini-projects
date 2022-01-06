console.clear()
let p = document.querySelector('.for_time p')
let form = document.querySelector('form')
let hours = form.querySelector('input[title=Hours]')
let minutes = form.querySelector('input[title=Minutes]')
let seconds = form.querySelector('input[title=Seconds]')
form.addEventListener('submit', function (e) {
  e.preventDefault()
  start(hours.value, minutes.value, seconds.value)
  hours.value = ''
  minutes.value = ''
  seconds.value = ''
})

let start = (hours, minutes, seconds) => {
  let timer = setInterval(() => {
    if (seconds == 0) {
      if (minutes > 0) {
        minutes--
        seconds = 60
      }else if (minutes == 0 && hours > 0) {
        hours--
        minutes = 60
        seconds = 60
      }
    }
    seconds--

    if (hours == 0 && minutes == 0 && seconds == 0) {
      clearInterval(timer)
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    minutes = format_time(minutes)
    hours = format_time(hours)
    console.log(hours, minutes, seconds)
    p.textContent = hours + ':' + minutes + ':' + seconds
  }, 1000)
}
// start()
let format_time = (time) => {
  if (time < 10) {
    time = `${time}`
    if (time.length == 1) {
      time = '0' + time
    }
    return time
  }else {
    return time
  }
}
