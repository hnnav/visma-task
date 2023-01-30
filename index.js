// Get elements 
const form = document.querySelector(".form");
const input = document.querySelector("input");
const urlContainer = document.querySelector(".urls-container");

// Form eventlistener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Get url value
  const newUrl = new URL(input.value);

  Client.displayData(newUrl.url, newUrl.validateScheme(), newUrl.validatePath());
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

  validatePath(){
    const path = this.url.substring(this.url.lastIndexOf('/') + 1, this.url.indexOf('?'));
    console.log(path);
    if (path === 'login' || 
        path === 'confirm' || 
        path === 'sign') {
      return `Allowed path: ${path}`
    } else {
      return 'Incorrect path'
    }
  }

  validateParams(){ // Must return params as key: value pairs

    // Login: source(type:string)

    // Confirm: source(type:string), payment number(type:integer)

    // Sign: source(type: string), documentid(type:string)

  }
}

class Client {

  static displayData(url, scheme, path){

    // Create elements
    const newDiv = document.createElement("div");
    newDiv.setAttribute('class', 'url-container');

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
    newDiv.append(UrlDisplay, schemeDisplay, pathDisplay)
    urlContainer.append(newDiv)
  }

  static clearInput(){
    input.value = "";
  }
}