import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import LiveStreams from "./component/LiveStreams/LiveStreams";
import Settings from "./component/Settings/Settings";
import VideoPlayer from "./component/VideoPlayer/VideoPlayer";
function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={LiveStreams}></Route>
          <Route path="/stream/:username" component={VideoPlayer}></Route>
          <Route path="/settings" component={Settings}></Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
