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
            <div data-a-target="tw-core-button-label-text" class="tw-flex-grow-0">Download</div>
          </div>
        </a>
      </div>
    </div>
    `
  )
  dlBtn = document.getElementsByClassName('th-download-btn')[0].getElementsByTagName('a')[0]
  dlBtn.onclick = function () {
    var link = document.createElement('a')
    link.href = document.getElementsByTagName('video')[0].src
    link.click()
  }
}

waitForElementToDisplay('.video-player__container video', addButton, 100, 5000)
