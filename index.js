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
    this.scheme = url.slice(0, url.indexOf(':'));
    this.path = url.substring(url.lastIndexOf('/') + 1, url.indexOf('?'));

    // Setting url parameters as key: value pairs
    const searchParams = new URLSearchParams(this.url.substring(this.url.indexOf('?')));
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    this.params = params;
  }
  
  validateScheme(){
    if (this.scheme === 'visma-identity') {
      return `Correct scheme: ${this.scheme}`;
    } else {
      return `Incorrect scheme: ${this.scheme}`;
    }
  }
  
  validatePath(){
    if (this.path === 'login' || 
    this.path === 'confirm' || 
    this.path === 'sign') {
      return `Allowed path: ${this.path}`
    } else {
      return 'Incorrect path'
    }
  }
  
  validateParams(){
    // Login path
    if ((this.path === 'login') && (typeof this.params.source === 'string')) {
      return `Valid parameters for login path: source= ${this.params.source}`;
    }
    // Confirm path
    else if ((this.path === 'confirm') && (typeof this.params.source === 'string') && (/^\d+$/.test(this.params.paymentnumber) === true)) {
      return `Valid parameters for confirm path: source= ${this.params.source}, payment number= ${this.params.paymentnumber}`;
    }
    // Sign path
    else if ((this.path === 'sign') && (typeof this.params.documentid === 'string')) {
      return `Valid parameters for sign path: source= ${this.params.source}, document id= ${this.params.documentid}`;
    } else {
      return 'Incorrect parameters for this path';
    }
  }
};

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