import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import FileList from "./components/FileList";
import NotFound404 from "./components/NotFound404";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/files/:id">
            <FileList />
          </Route>
          <Route path="/error">
            <NotFound404 />
          </Route>
          <Route path="*">
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
