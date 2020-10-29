function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
  var startTimeInMs = Date.now()
  ;(function loopSearch() {
    if (document.querySelector(selector) != null) {
      callback()
      return
    } else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return
        loopSearch()
      }, checkFrequencyInMs)
    }
  })()
}

function displayClips() {
  console.log(document.getElementsByClassName('clmgr-table__row').length)
  var clips = document.getElementsByClassName('clmgr-table__row')
  console.log(clips[0])
}

waitForElementToDisplay('.clmgr-table__row', displayClips, 100, 5000)