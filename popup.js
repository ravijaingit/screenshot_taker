document.getElementById("captureBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "capture_screenshot" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError.message);
        }
        console.log("Response from background script:", response);
    });
});
