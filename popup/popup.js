const ulElem = document.getElementById('ul');
const chromeCookies = chrome.cookies;
const chromeLocalStorage = chrome.storage.local;
const chromeTabs = chrome.tabs;

const spanElem = document.getElementById('span');

// const cookiesGetHandler = (cookies) => {
//   for (let i in cookies) {
//     const cookie = cookies[i];

//     const liElem = document.createElement('li');
//     liElem.innerText = cookie.value;

//     ulElem.appendChild(liElem);
//   }
// };

const buttonClickHandler = (e) => {
  // const cookieName = e.target.dataset.cookieName;
  // const cookieValue = e.target.dataset.cookieValue;
  const cookieName = e.target.getAttribute('cookieName');
  const cookieValue = e.target.getAttribute('cookieValue');

  spanElem.innerText = `${cookieName} = ${cookieValue}`;

  chromeLocalStorage.set({ [cookieName]: cookieValue });
};

const cookieGetHandler = (cookie) => {

  const liElem = document.createElement('li');
  const buttonElem = document.createElement('button');
  
  if (cookie) {

    const isInterparkDomain = cookie.domain === '.interpark.com';
    if (!isInterparkDomain) {
      return;
    }

    const cookieName = cookie.name;
    const cookieValue = cookie.value;

    liElem.innerText = `${cookieName} = ${cookieValue}`;
    // liElem.dataset.cookieName = cookieName;
    // liElem.dataset.cookieValue = cookieValue;
    buttonElem.setAttribute('cookieName', cookieName);
    buttonElem.setAttribute('cookieValue', cookieValue);
    buttonElem.innerText = '공유';
    buttonElem.addEventListener('click', buttonClickHandler);

    liElem.appendChild(buttonElem);
    ulElem.appendChild(liElem);
  } else {
    liElem.innerText = `쿠키가 없습니다.`;
  }
  
};

chromeCookies.get({name: 'id_token', url: 'https://travel.interpark.com'}, cookieGetHandler);
