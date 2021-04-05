import { Switch, Route } from "react-router-dom";

import HomePage from "./components/pages/homepage/homepage.component";

const HatsPage = (props) => {
  return (
    <div>
      <h1>HATS PAGE</h1>
    </div>
  );
};

const JacketsPage = (props) => {
  console.log(props);
  return (
    <div>
      <h1>JACKETS PAGE</h1>
    </div>
  );
};

function App() {
  return (
    <div>
      {/* <Switch> */}
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop/hats' component={HatsPage} />
        <Route exact path='/shop/jackets' component={JacketsPage} />
        <Route exact path='/shop/sneakers' component={HatsPage} />
        <Route exact path='/shop/womens' component={HatsPage} />
        <Route exact path='/shop/mens' component={HatsPage} />
      {/* </Switch> */}
    </div>
  );
}

export default App;
