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
  
  function countSelectedClips() {
    c = 0
    rows = document.getElementsByClassName('clmgr-table__row')
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].getElementsByClassName('tw-checkbox__input')[0].checked) {
        c += 1
      }
    }
    return c
  }
  
  function getClipURL(context) {
    var src = context.getElementsByTagName('img')[0].src
    console.log(src)
  }
  
  function downloadSelectedClips() {
    rows = document.getElementsByClassName('clmgr-table__row')
    for (var i = 0; i < rows.length; i++) {
      let title = rows[i].getElementsByTagName('h5')[0].title
      if (rows[i].getElementsByClassName('tw-checkbox__input')[0].checked) {
        let href = getClipURL(rows[i])
        let link = document.createElement('a')
        link.href = href
        console.log('[Twitch Helper] Downloading "' + title + '" from ' + href)
        // link.click()
      }
    }
  }
  
  function addDownloadButton() {
    if (document.getElementsByClassName('th-download-btn')[0] || countSelectedClips() == 0) return
    context = document.querySelector('button[data-test-selector=clips-manager-batch-delete]').parentElement
    context.insertAdjacentHTML(
      'beforeend',
      `
      <div class="tw-mg-l-1 th-download-btn">
        <button
          class="tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--primary tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative"
        >
          <div class="tw-align-items-center tw-core-button-label tw-flex tw-flex-grow-0">
            <div data-a-target="tw-core-button-label-text" class="tw-flex-grow-0">
              Download Selected
            </div>
          </div>
        </button>
      </div>
      `
    )
    dlBtn = document.getElementsByClassName('th-download-btn')[0].getElementsByTagName('button')[0]
    dlBtn.onclick = downloadSelectedClips
  }
  
  function setListener() {
    document.getElementsByClassName('clmgr-table-wrap')[0].addEventListener(
      'click',
      function () {
        waitForElementToDisplay(
          'button[data-test-selector=clip-snip-user]',
          addDownloadButton,
          10,
          1000
        )
      },
      false
    )
  }
  
  waitForElementToDisplay('.clmgr-table__row', setListener, 100, 5000)
  