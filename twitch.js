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
  streamerName = document.querySelector('.channel-info-content .tw-title').innerHTML
  directoryName = document.querySelector('.channel-info-content a[href^="/directory/game/"] p')
  if (directoryName == null) {
    directoryName = 'No Category'
  } else {
    directoryName = directoryName.innerHTML
  }
  clipName = document.querySelector('[data-a-target=stream-title]').innerHTML
  filename = streamerName + ' - ' + directoryName + ' - ' + clipName + ' - ' + Math.random().toString(16).slice(10) + '.mp4'
  filename = filename.replace(/[\\/:*?"<>|]/g, '_')
  return filename
}

function addButton() {
  if (document.getElementsByClassName('th-download-btn')[0]) return
  context = document.querySelector('[data-test-selector="metadata-layout__split-top"] > div:nth-child(2) > div')
  context.insertAdjacentHTML(
    'afterbegin',
    `
    <button class="th-download-btn th-button-secondary tw-mg-r-1">
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

function setListener() {
  document.getElementById('root').addEventListener(
    'click',
    function () {
      waitForElementToDisplay('[data-test-selector="metadata-layout__split-top"] > div:nth-child(2) > div', addButton, 100, 10000)
    },
    false
  )
}

waitForElementToDisplay('#root', setListener, 100, 5000)
waitForElementToDisplay('[data-test-selector="metadata-layout__split-top"] > div:nth-child(2) > div', addButton, 100, 10000)
