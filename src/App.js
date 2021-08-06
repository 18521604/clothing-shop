import { Switch, Route, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { isUserAuthenticated } from "./redux/user/user.actions";

import { selectCurrentUser } from "./redux/user/user.selectors";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";

const App = ({ isUserAuthenticated, currentUser }) => {
  useEffect(() => {
    isUserAuthenticated();
  },[isUserAuthenticated])

  return (
    <div>
      <Header />
      <Switch>
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            )
              : (
                <SignInAndSignUpPage />
              )
          }
        />
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  isUserAuthenticated: () => dispatch(isUserAuthenticated())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
