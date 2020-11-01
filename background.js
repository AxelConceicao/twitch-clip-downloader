chrome.runtime.onMessage.addListener((clip) => {
  chrome.downloads.download({
    url: clip.url,
    filename: clip.filename,
  })
})
