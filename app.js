// Class (Params: URL)
class URL {

  // let url1 = new Url("visma-identity://login?source=severa");
  constructor(uri) {
    this.uri = uri;
  }

  getScheme(){
    console.log(this.uri.slice(0, this.uri.indexOf(':'))); // visma-identity
  }

  getPath(){ // login, confirm or sign
      
  }
}

const url1 = new URL("visma-identity://login?source=severa");
url1.getScheme() // visma-identity

