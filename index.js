// Get elements 
const form = document.querySelector(".form");
const input = document.querySelector("input");
const urlContainer = document.querySelector(".urls-container");

// Form eventlistener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Get url value
  const newUrl = new URL(input.value);

  Client.displayData(newUrl.url, newUrl.validateScheme(), newUrl.validatePath(), newUrl.validateParams());
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

    if (path === 'login' || 
        path === 'confirm' || 
        path === 'sign') {
      return `Allowed path: ${path}`
    } else {
      return 'Incorrect path'
    }
  }

  validateParams(){ // Must return params as key: value pairs
    const path = this.url.substring(this.url.lastIndexOf('/') + 1, this.url.indexOf('?'));

    const searchParams = new URLSearchParams(this.url.substring(this.url.indexOf('?')));

    const paramsObj = {};
    for (const [key, value] of searchParams.entries()) {
      paramsObj[key] = value;
    }

    // Login: source(type:string)
    if ((path === 'login') && (typeof paramsObj.source === 'string')) {
      return `Valid parameters for login path: source= ${paramsObj.source}`;
    }
    // Confirm: source(type:string), payment number(type:integer)
    else if ((path === 'confirm') && (typeof paramsObj.source === 'string') && (/^\d+$/.test(paramsObj.paymentnumber) === true)) {
      return `Valid parameters for confirm path: source= ${paramsObj.source}, payment number= ${paramsObj.paymentnumber}`;
    }
    // Sign: source(type: string), documentid(type:string)
    else if ((path === 'sign') && (typeof paramsObj.documentid === 'string')) {
      return `Valid parameters for sign path: source= ${paramsObj.source}, document id= ${paramsObj.documentid}`;
    } else {
      return 'Incorrect parameters';
    }

  }
}

class Client {

  static displayData(url, scheme, path, params){

    // Create elements
    const newDiv = document.createElement("div");
    const UrlDisplay = document.createElement("h3");
    const schemeDisplay = document.createElement("p");
    const pathDisplay = document.createElement("p");
    const paramDisplay = document.createElement("p");

    // Add values
    UrlDisplay.innerHTML = 'URL: ' + url
    schemeDisplay.innerHTML = scheme
    pathDisplay.innerHTML = path
    paramDisplay.innerHTML = params

    // Add to page
    newDiv.append(UrlDisplay, schemeDisplay, pathDisplay, paramDisplay)
    urlContainer.append(newDiv)
  }

  static clearInput(){
    input.value = "";
  }
}