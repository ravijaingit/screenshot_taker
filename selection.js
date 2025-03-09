(function() {
    if (document.getElementById("screenshot-selection-overlay")) {
        return; // If already active, don't create another
    }

    // Create an overlay for selection
    let overlay = document.createElement("div");
    overlay.id = "screenshot-selection-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.3)";
    overlay.style.zIndex = "999999";
    overlay.style.cursor = "crosshair";
    document.body.appendChild(overlay);

    let startX, startY, selectionBox;

    overlay.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        startY = e.clientY;

        selectionBox = document.createElement("div");
        selectionBox.style.position = "fixed";
        selectionBox.style.border = "2px dashed white";
        selectionBox.style.background = "rgba(255, 255, 255, 0.2)";
        selectionBox.style.zIndex = "1000000";
        document.body.appendChild(selectionBox);

        const updateSelection = (moveEvent) => {
            let endX = moveEvent.clientX;
            let endY = moveEvent.clientY;

            selectionBox.style.left = Math.min(startX, endX) + "px";
            selectionBox.style.top = Math.min(startY, endY) + "px";
            selectionBox.style.width = Math.abs(endX - startX) + "px";
            selectionBox.style.height = Math.abs(endY - startY) + "px";
        };

        const endSelection = (upEvent) => {
            document.removeEventListener("mousemove", updateSelection);
            document.removeEventListener("mouseup", endSelection);

            let endX = upEvent.clientX;
            let endY = upEvent.clientY;

            document.body.removeChild(overlay);
            document.body.removeChild(selectionBox);

            let rect = {
                x: Math.min(startX, endX),
                y: Math.min(startY, endY),
                width: Math.abs(endX - startX),
                height: Math.abs(endY - startY),
            };

            captureSelection(rect);
        };

        document.addEventListener("mousemove", updateSelection);
        document.addEventListener("mouseup", endSelection);
    });

    function captureSelection(rect) {
        chrome.runtime.sendMessage({ action: "capture_partial", rect: rect });
    }
})();
