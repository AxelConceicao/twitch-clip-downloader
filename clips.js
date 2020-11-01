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
  clipName = document.querySelector('.clips-chat-info .tw-line-height-heading').innerHTML
  filename = streamerName + ' - ' + directoryName + ' - ' + clipName + '.mp4'
  filename = filename.replace(/[\\/:*?"<>|]/g, '_')
  return filename
}

function addButton() {
  context = document
    .getElementsByClassName('clips-sidebar')[0]
    .getElementsByClassName('tw-border-t')[0]
    .getElementsByTagName('div')[0]
  context.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="tw-inline-block th-download-btn">
      <div class="tw-mg-b-1 tw-mg-l-1">
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--primary tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative"
          data-test-selector="clips-watch-full-button"
        >
          <div class="tw-align-items-center tw-core-button-label tw-flex tw-flex-grow-0">
            <div data-a-target="tw-core-button-label-text" class="tw-flex-grow-0">Download Clip</div>
          </div>
        </a>
      </div>
    </div>
    `
  )
  downloadBtn = document.getElementsByClassName('th-download-btn')[0].getElementsByTagName('a')[0]
  downloadBtn.onclick = function () {
    let url = document.getElementsByTagName('video')[0].src
    let filename = getFileName()
    console.log('[Twitch Clip Downloader] Downloading "' + filename + '" from ' + url)
    chrome.runtime.sendMessage({ url, filename })
  }
}

waitForElementToDisplay('.video-player__container video', addButton, 100, 5000)
