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
                  <p class="tw-mg-b-1"><strong>` + parseInt(countSelectedClips()) + `</strong> clips will be downloaded.</p>
                  <p class="tw-mg-b-1">For more than ten clips I strongly recommend you to disable the setting
                  <strong>Always ask you where to save files</strong>.</p>
                  <a target="_blank" rel="noopener noreferrer" href="https://justpaste.it/9hypq" style="cursor: pointer;">See instructions here</a>
                </div>
                <div class="tw-flex tw-justify-content-center">
                  <div class="tw-mg-x-1">
                    <button class="th-cancelActionTCD th-download-btn th-button-transparent">
                      <div class="th-button-content">
                        <div data-a-target="tw-core-button-label-text" class="">Cancel</div>
                      </div>
                    </button>
                  </div>
                  <div class="tw-mg-x-1">
                    <button class="th-doActionTCD th-download-btn th-button-primary">
                      <div class="th-button-content">
                        <div data-a-target="tw-core-button-label-text" class="">
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
  $('.th-doActionTCD').click(function () {
    downloadSelectedClips()
    $(this)
      .parents('.ReactModalPortal')
      .fadeOut(500, function () {
        $(this).remove()
      })
  })
  $('.th-cancelActionTCD').click(function () {
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
      <button class="th-download-btn th-button-primary tw-mg-l-1">
        <div class="th-button-content">
          <div data-a-target="tw-core-button-label-text" class="">Download Clip</div>
        </div>
      </button>  
      `
  )
  dlBtn = document.getElementsByClassName('th-download-btn')[0]
  dlBtn.onclick = function () {
    var nbClips = parseInt(countSelectedClips())
    if (nbClips >= 6) {
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
