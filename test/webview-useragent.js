
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
  var mainWindow = new Window();
  mainWindow.visible = true;
  var webview = new WebView();
  mainWindow.appendChild(webview);
  webview.left = webview.right = webview.bottom = webview.top = 0;
  var agent = "This is my user agent.";
  webview.useragent = agent;
  webview.addEventListener('load', function() {
    var response = webview.execute("document.querySelector('h2.info').innerText");
    $utils.assert(agent === response);
    $utils.assert(agent === webview.useragent);
    $utils.ok();
  });
  webview.location = 'http://whatsmyuseragent.com';
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
  name:"WebViewUserAgent",
};