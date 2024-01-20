import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import TestComp from "./TestComp";
class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<TestComp />} />
      </Routes>
    );
  }
}

export default App;
