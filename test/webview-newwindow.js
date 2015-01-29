
/**
 * @unit-test-setup
 * @ignore
 */
function setup() {
  require('Common');
}

function baseline() {
}

/**
 * @see {WebView}
 * @example
 */
function run($utils) {
  $utils.ok();
  var mainWindow = new Window();
  mainWindow.visible = true;
  var webview = new WebView();
  mainWindow.appendChild(webview);
  webview.left = webview.right = webview.top = webview.bottom = 0;
  webview.location = 'app://assets/webview-newwindow.html';
  webview.addEventListener('new-window', function(newWebView) {
    var newWindow = new Window();
    newWindow.visible = true;
    newWindow.x += 20;
    newWindow.appendChild(newWebView);
    newWebView.left=newWebView.right=newWebView.top=newWebView.bottom=0;
  });
}

/**
 * @unit-test-shutdown
 * @ignore
 */
function shutdown() {
}

module.exports = {
  setup:setup, 
  run:run, 
  shutdown:shutdown, 
  shell:false,
  timeout:true,
  name:"WebViewNewWindow",
};