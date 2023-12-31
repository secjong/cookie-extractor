console.log('inject 파일 로드');

const chromeLocalStorage = chrome.storage.local;

function setCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}

chromeLocalStorage.get(['id_token'], async function (result) {
  const idToken = result['id_token'];
  setCookie('id_token', idToken);
});
