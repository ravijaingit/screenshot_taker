# Chrome Screenshot Saver Extension

## Overview
This is a **Chrome extension** that allows users to capture and save screenshots locally without any internet interaction. 

### **Features**
✅ **Single Click** → Captures the full-screen of the active Chrome tab and saves it as an image.  
✅ **Double Click** → Enables selection mode to let the user select a portion of the screen before capturing and saving it.  
✅ **Offline Support** → Works without any network connection.  
✅ **No External Dependencies** → Fully standalone, using only Chrome's built-in APIs.

---

## Installation
1. **Download or Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/chrome-screenshot-extension.git
   cd chrome-screenshot-extension
   ```

2. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/`
   - Enable **Developer Mode** (Toggle at the top-right corner).

3. **Load the Extension**
   - Click **Load Unpacked**.
   - Select the **extension folder**.

4. The extension is now installed and ready to use!

---

## How to Use
### **1. Capture Full Screen (Single Click)**
- Click the extension icon in the toolbar.
- The entire visible Chrome tab will be saved as a `.png` file.

### **2. Capture Selected Area (Double Click)**
- Double-click the extension icon.
- A transparent overlay will appear, allowing you to **drag and select** the area you want to capture.
- Release the mouse button to capture and save the selected area.

---

## File Structure
```
chrome-screenshot-extension/
│── manifest.json         # Chrome Extension Metadata
│── background.js         # Handles Screenshot Logic
│── selection.js          # Enables Selection Mode
│── icon.png              # Extension Icon
```

---

## Technical Details
- Uses `chrome.tabs.captureVisibleTab` to capture the screen.
- Saves the screenshot **locally** using `chrome.downloads.download`.
- Implements `chrome.scripting.executeScript` to inject the selection overlay on double-click.
- Selection is processed using a **canvas-based cropping** method.

---

## Future Enhancements
🚀 Add **Keyboard Shortcuts** for quick actions.  
🚀 Provide **Auto-save Options** without the file dialog prompt.  
🚀 Implement **Screenshot Annotation Tools** before saving.

---

## License
This project is licensed under the **MIT License**.

---
