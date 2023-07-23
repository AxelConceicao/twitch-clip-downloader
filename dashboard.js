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
  checkbox = document.querySelectorAll('input[data-a-target="tw-checkbox"]')
  for (var i = 1; i < checkbox.length; i++) {
    if (checkbox[i].checked) {
      c += 1
    }
  }
  return c
}

function getClipURL(checkbox) {
  context = checkbox.parentElement.parentElement.parentElement
  var src = context.getElementsByTagName('img')[0].src
  return src.replace(/-preview.*/, '') + '.mp4'
}

function getFileName(checkbox) {
  context = checkbox.parentElement.parentElement.parentElement.parentElement.parentElement
  streamerName = context.children[1].getElementsByTagName('a')[0].innerHTML
  directoryName = context.children[2].getElementsByTagName('a')
  if (directoryName.length != 1) {
    directoryName = 'No Category'
  } else {
    directoryName = directoryName[0].innerHTML
  }
  clipName = context.getElementsByTagName('h5')[0].title
  filename =
    streamerName +
    ' - ' +
    directoryName +
    ' - ' +
    clipName +
    ' - ' +
    Math.random().toString(16).slice(10) +
    '.mp4'
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
                  <p class="tw-mg-b-1"><strong>` +
    parseInt(countSelectedClips()) +
    `</strong> clips will be downloaded.</p>
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
  $content =
    `
<div class="ReactModalPortal">
  <div class="ReactModal__Overlay ReactModal__Overlay--after-open modal__backdrop js-modal-backdrop">
    <div class="ReactModal__Content ReactModal__Content--after-open modal__content" tabindex="-1" role="dialog"
      aria-label="Modal" aria-modal="true" aria-labelledby="modal-root-header" aria-describedby="modal-description-id">
      <div class="Layout-sc-nxg1ff-0 th-modal-jCrgss modal-wrapper__backdrop modal-wrapper__backdrop--info"
        data-test-selector="modal-wrapper__backdrop-test">
        <div class="Layout-sc-nxg1ff-0 th-modal-kDVThR modal-wrapper__content modal-wrapper__content--info"
          data-test-selector="modal-wrapper__content-test">
          <div>
            <div class="Layout-sc-nxg1ff-0 th-modal-container clip-modal">
              <div data-test-selector="clips-modal-title" class="Layout-sc-nxg1ff-0 th-modal-header">
                <h4 id="modal-root-header" class="CoreText-sc-cpl358-0">Download these clips?</h4>
              </div>
              <div data-test-selector="clips-modal-main-body" class="Layout-sc-nxg1ff-0 th-modal-content">
                <p class="CoreText-sc-cpl358-0" style="margin-bottom: 1rem;"><strong>` +
    parseInt(countSelectedClips()) +
    `</strong> clips will be downloaded.</p>
                <p class="CoreText-sc-cpl358-0" style="margin-bottom: 1rem;">For more than ten clips I strongly
                  recommend you to disable the setting
                  <strong>Always ask you where to save files</strong>.
                </p>
                <a target="_blank" rel="noopener noreferrer" href="https://justpaste.it/9hypq"
                  style="cursor: pointer;">See instructions here</a>
              </div>
              <div class="Layout-sc-nxg1ff-0 th-modal-footer">
                <div class="Layout-sc-nxg1ff-0 th-modal-button">
                  <button
                    class="th-cancelActionTCD ScCoreButton-sc-1qn4ixc-0 ScCoreButtonText-sc-1qn4ixc-3 th-modal-button-container th-modal-button-cancel"
                    data-test-selector="clips-modal-cancel-button">
                    <div class="ScCoreButtonLabel-sc-lh1yxp-0 th-modal-button-content">
                      <div data-a-target="tw-core-button-label-text" class="Layout-sc-nxg1ff-0 th-modal-button-wrap">
                        Cancel
                      </div>
                    </div>
                  </button>
                </div>
                <div class="Layout-sc-nxg1ff-0 th-modal-button">
                  <button
                    class="th-doActionTCD ScCoreButton-sc-1qn4ixc-0 ScCoreButtonDestructive-sc-1qn4ixc-4 th-modal-button-container th-modal-button-download"
                    data-test-selector="clips-modal-submit-button">
                    <div class="ScCoreButtonLabel-sc-lh1yxp-0 th-modal-button-content">
                      <div data-a-target="tw-core-button-label-text" class="Layout-sc-nxg1ff-0 th-modal-button-wrap">
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
  checkbox = document.querySelectorAll('input[data-a-target="tw-checkbox"]')
  for (var i = 1; i < checkbox.length; i++) {
    if (checkbox[i].checked) {
      let url = getClipURL(checkbox[i])
      let filename = getFileName(checkbox[i])
      console.log('[Twitch Clip Downloader] Downloading "' + filename + '" from ' + url)
      chrome.runtime.sendMessage({ url, filename })
    }
  }
}

function addDownloadButton() {
  setTimeout(() => {
    if (countSelectedClips()) {
      if (!document.getElementsByClassName('th-download-btn')[0]) {
        context = document.querySelector('input[data-a-target="tw-checkbox"]')
        context.parentElement.parentElement.parentElement.insertAdjacentHTML(
          'beforeend',
          `
            <button class="th-download-btn th-button-primary tw-mg-l-1" style="margin-left: 1rem;">
              <div class="th-button-content">
                <div data-a-target="tw-core-button-label-text" class="">Download selection</div>
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
    } else {
      dlBtn = document.getElementsByClassName('th-download-btn')[0]
      dlBtn && dlBtn.remove()
    }
  }, 10)
}

function setListener() {
  document.getElementById('root').addEventListener(
    'click',
    function () {
      waitForElementToDisplay('input[data-a-target="tw-checkbox"]', addDownloadButton, 10, 1000)
    },
    false
  )
}

waitForElementToDisplay('.clmgr-table__row', setListener, 100, 5000)
