import React, { Component } from "react";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login = (callback) => {
    this.authenticated = true;
    callback();
  };

  logout=(callback)=>{
    this.authenticated = false
    callback()
  }

  is
}

export default new Auth();
