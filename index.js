// Grab elements 
const form = document.querySelector(".form");
const input = document.querySelector("input");
const urlContainer = document.querySelector(".url-container");

// Form eventlistener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Get url value
  const newUrl = new URL(input.value);

  Client.displayData(newUrl.url, newUrl.validateScheme(), newUrl.getPath());
  Client.clearInput();
});

class URL {

  constructor(url) {
    this.url = url;
  }

  validateScheme(){
    const scheme = this.url.slice(0, this.url.indexOf(':')); // visma-identity

    if (scheme === 'visma-identity') {
      return `Correct scheme: ${scheme}`;
    } else {
      return `Incorrect scheme: ${scheme}`;
    }
  }

  // Is path login, confirm or sign?
  getPath(){
    const path = this.url.substring(this.url.lastIndexOf('/') + 1, this.url.indexOf('?'));
    if (path === 'login' || 'confirm' || 'sign' ) {
      return `Allowed path: ${path}`
    } else {
      return 'Incorrect path'
    }
  }
}

class Client {

  static displayData(url, scheme, path){

    // Create elements
    const UrlDisplay = document.createElement("p");
    UrlDisplay.setAttribute('class', 'url-display');

    const schemeDisplay = document.createElement("p");
    schemeDisplay.setAttribute('class', 'scheme-display');

    const pathDisplay = document.createElement("p");
    pathDisplay.setAttribute('class', 'path-display');

    // Add values
    UrlDisplay.innerHTML = 'URL: ' + url
    schemeDisplay.innerHTML = scheme
    pathDisplay.innerHTML = path

    // Add to page
    urlContainer.append(UrlDisplay)
    urlContainer.append(schemeDisplay)
    urlContainer.append(pathDisplay)
  }

  static clearInput(){
    input.value = "";
  }
}