let lastClickTime = 0;

chrome.action.onClicked.addListener((tab) => {
    const currentTime = new Date().getTime();

    if (currentTime - lastClickTime < 300) {
        // Double-click detected: Enable selection mode
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["selection.js"]
        });
    } else {
        // Single-click detected: Capture full screenshot
        chrome.tabs.captureVisibleTab(null, { format: "png" }, (imageUri) => {
            if (chrome.runtime.lastError) {
                console.error("Error capturing screenshot:", chrome.runtime.lastError.message);
                return;
            }

            const filename = `screenshot_${new Date().getTime()}.png`;

            chrome.downloads.download({
                url: imageUri,
                filename: filename,
                saveAs: true
            });
        });
    }

    lastClickTime = currentTime;
});

// Listen for messages from selection.js for partial screenshots
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "capture_partial") {
        chrome.tabs.captureVisibleTab(null, { format: "png" }, (imageUri) => {
            if (chrome.runtime.lastError) {
                console.error("Error capturing screenshot:", chrome.runtime.lastError.message);
                return;
            }

            let { x, y, width, height } = message.rect;
            
            cropImage(imageUri, x, y, width, height, (croppedBlobUrl) => {
                const filename = `partial_screenshot_${new Date().getTime()}.png`;

                chrome.downloads.download({
                    url: croppedBlobUrl,
                    filename: filename,
                    saveAs: true
                });
            });
        });
    }
});

// Function to crop the captured screenshot based on user selection
function cropImage(imageUri, x, y, width, height, callback) {
    let img = new Image();
    img.src = imageUri;
    img.onload = () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
            let url = URL.createObjectURL(blob);
            callback(url);
        }, "image/png");
    };
}
