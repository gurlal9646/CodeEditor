//Catching common used elements to minimize dom queries
const livePreviewFrame = document.getElementById("live-preview");
const htmlEditor = document.getElementById("html");
const cssEditor = document.getElementById("css");
const jsEditor = document.getElementById("js");

// Function to setup the live preview iframe
function initializeLivePreview() {
  livePreviewFrame.contentWindow.document.body.innerHTML = "";
  const styleElement = livePreviewFrame.contentDocument.createElement("style");
  styleElement.setAttribute("id", "live-preview-style");
  livePreviewFrame.contentWindow.document.head.appendChild(styleElement);

  const pagedJsScript = document.createElement("script");
  pagedJsScript.src = "https://unpkg.com/pagedjs/dist/paged.legacy.polyfill.js";
  livePreviewFrame.contentWindow.document.head.appendChild(pagedJsScript);
}

//Function to update the live preview iframe with the html code from the  editor

function updateLiveHTMLPreview(codeEditors) {
  livePreviewFrame.contentWindow.document.body.innerHTML =
    codeEditors.html.getValue();
}

//Function to update the live preview iframe with the css code from the  editor

function updateLiveCSSPreview(codeEditors) {
  const styleElement =
    livePreviewFrame.contentWindow.document.getElementById(
      "live-preview-style"
    );
  styleElement.innerHTML = codeEditors.css.getValue();
}

//Function to update the live preview iframe with the js code from the  editor

function updateLiveJSPreview(codeEditors) {
  const scriptElement =
    livePreviewFrame.contentWindow.document.getElementById("script");
  scriptElement.innerHTML = codeEditors.css.getValue();
  livePreviewFrame.contentWindow.document.head.appendChild(scriptElement);
}

// Function to initialize codeMirror editors for html, css and javascript

function initializeCodeEditors() {
  function getDefaultOptions(object) {
    const defaultOptions = {
      lineNumbers: true,
      autoClosetags: true,
      autoCloseBrackets: true,
      theme: "panda-syntax",
    };
    if (object) {
      const keys = Object.keys(object);
      for (const key of keys) {
        defaultOptions[key] = object[key];
      }
    }
    return defaultOptions;
  }

  const codeEditors = {
    html: CodeMirror(
      htmlEditor,
      getDefaultOptions({
        mode: "text/html",
        value: "",
      })
    ),
    css: CodeMirror(
      cssEditor,
      getDefaultOptions({
        mode: "css",
        value: "",
        extrakeys: { "ctrl-space": "autocomplete" },
        hintOptions: {
          completeSingle: false,
          closeOnUnfocus: false,
        },
      })
    ),
    js: CodeMirror(
      jsEditor,
      getDefaultOptions({
        mode: "javascript",
        value: "",
      })
    ),
  };
  return codeEditors;
}

// Function to set up the live preview studio with codeMirror editors and event listeners
function setupLivePreviewStudio() {
  const codeEditors = initializeCodeEditors();
  //EVent listener for changes in html editor
  CodeMirror.on(codeEditors.html, "change", () => {
    updateLiveHTMLPreview(codeEditors);
  });
  //Event listener for changes in CSS Editor
  CodeMirror.on(codeEditors.css, "change", () => {
    updateLiveCSSPreview(codeEditors);
  });
  // Event Listener For Changes In JS Editor
  CodeMirror.on(codeEditors.js, "change", () => {
    updateLiveJSPreview(codeEditors);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLivePreview();
  setupLivePreviewStudio();
});
