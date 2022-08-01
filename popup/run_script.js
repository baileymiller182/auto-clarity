function listenForClicks() {
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("run-script")) {
      return;
    }

    function autofill(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "autofill"
      })
    }
      
    browser.tabs.query({active: true, currentWindow: true})
      .then(autofill);
  })
}

browser.tabs.executeScript({file: "/content_scripts/autofill.js"})
.then(listenForClicks);
