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

function getFileName() {
  streamerName = document.querySelector('[data-test-selector="game-name-link"] span').innerHTML
  directoryName = document.querySelector(
    '.clips-sidebar [href^="https://www.twitch.tv/directory/game/"]'
  )
  if (directoryName == null) {
    directoryName = 'No Category'
  } else {
    directoryName = directoryName.innerHTML
  }
  clipName = document.querySelector('.clips-chat-info > div:nth-child(2) span').innerHTML
  filename = streamerName + ' - ' + directoryName + ' - ' + clipName + ' - ' + Math.random().toString(16).slice(10) + '.mp4'
  filename = filename.replace(/[\\/:*?"<>|]/g, '_')
  return filename
}

function addButton() {
  if (document.getElementsByClassName('th-download-btn')[0]) return
  context = document.querySelector('.clips-sidebar > div:nth-child(3) > div')
  context.insertAdjacentHTML(
    'afterbegin',
    `
    <button class="th-download-btn th-button-primary tw-mg-b-1 tw-mg-l-1" style="margin-bottom: 1rem !important;margin-right: 1rem !important;">
      <div class="th-button-content">
        <div data-a-target="tw-core-button-label-text" class="">Download Clip</div>
      </div>
    </button>  
    `
  )
  downloadBtn = document.getElementsByClassName('th-download-btn')[0]
  downloadBtn.onclick = function () {
    let url = document.getElementsByTagName('video')[0].src
    let filename = getFileName()
    console.log('[Twitch Clip Downloader] Downloading "' + filename + '" from ' + url)
    chrome.runtime.sendMessage({ url, filename })
  }
}

waitForElementToDisplay('[data-test-selector="clips-watch-full-button"]', addButton, 100, 5000)
waitForElementToDisplay('.clips-sidebar [data-a-target="tw-core-button-label-text"]', addButton, 100, 5000)
