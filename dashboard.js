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
  return src.replace(/-preview.*/, '') + '.mp4'
}

function getFileName(context) {
  context = context.querySelector('[data-target="clips-manager-table-row"]')
  streamerName = context.children[1].getElementsByTagName('a')[0].innerHTML
  directoryName = context.children[2].getElementsByTagName('a')
  if (directoryName.length != 1) {
    directoryName = 'No Category'
  } else {
    directoryName = directoryName[0].innerHTML
  }
  clipName = context.getElementsByTagName('h5')[0].title
  filename = streamerName + ' - ' + directoryName + ' - ' + clipName + '.mp4'
  filename = filename.replace(/[\\/:*?"<>|]/g, '_')
  return filename
}

function Confirm() {
  /*change*/
  var $content =
  `
  <div class="ReactModalPortal">
    <div
      class="ReactModal__Overlay ReactModal__Overlay--after-open modal__backdrop js-modal-backdrop"
    >
      <div
        class="ReactModal__Content ReactModal__Content--after-open modal__content"
        tabindex="-1"
        role="dialog"
        aria-label="Modal"
        aria-labelledby="modal-root-header"
        aria-describedby="modal-description-id"
      >
        <div
          class="modal-wrapper__backdrop modal-wrapper__backdrop--info tw-align-items-start tw-flex tw-full-height tw-full-width tw-justify-content-center"
          data-test-selector="modal-wrapper__backdrop-test"
        >
          <div
            class="modal-wrapper__content modal-wrapper__content--info tw-flex tw-flex-grow-0 tw-full-width tw-justify-content-center tw-relative"
            data-test-selector="modal-wrapper__content-test"
          >
            <div>
              <div class="clip-modal tw-c-background-base tw-pd-2">
                <div data-test-selector="clips-modal-title" class="tw-border-b tw-mg-b-2 tw-pd-b-1">
                  <h4 id="modal-root-header" class="">Download these clips?</h4>
                </div>
                <div
                  data-test-selector="clips-modal-main-body"
                  class="tw-border-b tw-mg-b-2 tw-pd-b-2"
                >
                  <p class="tw-mg-b-1">` + parseInt(countSelectedClips()) + ` clips will be downloaded.</p>
                  <p class="tw-mg-b-1">For more than ten clips I strongly recommend you to disable the setting
                  <strong>Always ask you where to save files</strong>.</p>
                  <a target="_blank" rel="noopener noreferrer" href="https://justpaste.it/9hypq" style="cursor: pointer;">See instructions here</a>
                </div>
                <div class="tw-flex tw-justify-content-center">
                  <div class="tw-mg-x-1">
                    <button
                      class="cancelActionTCD tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--text tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative"
                      data-test-selector="clips-modal-cancel-button"
                    >
                      <div class="tw-align-items-center tw-core-button-label tw-flex tw-flex-grow-0">
                        <div data-a-target="tw-core-button-label-text" class="tw-flex-grow-0">
                          Cancel
                        </div>
                      </div>
                    </button>
                  </div>
                  <div class="tw-mg-x-1">
                    <button
                      class="doActionTCD tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--primary tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative"
                      data-test-selector="clips-modal-submit-button"
                    >
                      <div class="tw-align-items-center tw-core-button-label tw-flex tw-flex-grow-0">
                        <div data-a-target="tw-core-button-label-text" class="tw-flex-grow-0">
                          Download
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  $('body').prepend($content)
  $('.doActionTCD').click(function () {
    downloadSelectedClips()
    $(this)
      .parents('.ReactModalPortal')
      .fadeOut(500, function () {
        $(this).remove()
      })
  })
  $('.cancelActionTCD').click(function () {
    $(this)
      .parents('.ReactModalPortal')
      .fadeOut(500, function () {
        $(this).remove()
      })
  })
}
function downloadSelectedClips() {
  rows = document.getElementsByClassName('clmgr-table__row')
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].getElementsByClassName('tw-checkbox__input')[0].checked) {
      let url = getClipURL(rows[i])
      let filename = getFileName(rows[i])
      console.log('[Twitch Clip Downloader] Downloading "' + filename + '" from ' + url)
      chrome.runtime.sendMessage({ url, filename })
    }
  }
}

function addDownloadButton() {
  if (document.getElementsByClassName('th-download-btn')[0] || countSelectedClips() == 0) return
  context = document.querySelector('button[data-test-selector=clips-manager-batch-delete]')
    .parentElement
  context.insertAdjacentHTML(
    'beforeend',
    `
      <div class="tw-mg-l-1 th-download-btn button-default link">
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
  dlBtn.onclick = function () {
    var nbClips = parseInt(countSelectedClips())
    if (nbClips > 10) {
      Confirm()
    } else {
      downloadSelectedClips()
    }
  }
}

function setListener() {
  document.getElementById('root').addEventListener(
    'click',
    function () {
      waitForElementToDisplay(
        'button[data-test-selector=clips-manager-batch-delete]',
        addDownloadButton,
        10,
        1000
      )
    },
    false
  )
}

waitForElementToDisplay('.clmgr-table__row', setListener, 100, 5000)
