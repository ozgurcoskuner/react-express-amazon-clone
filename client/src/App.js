import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/Cart";
import background from "./Media/background.jpg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import { OrderProvider } from "./components/contexts/OrderContext";
import ProductsContainer from "./components/ProductsContainer";
import ProductOwnPage from "./components/ProductOwnPage";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { myreduxstore } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SuccessfulPayment from "./components/SuccessfulPayment";

function App() {
  const { persistor, store } = myreduxstore();
  const stripePromise = loadStripe('pk_test_51J4079IIFQqdbfp7rv4suSi3Vg5Jyv5m3tObidPGi4sUW3Xdr6yaROUR3Fy1eh8xpDJ9IKsJBoqDA1kCOBfg8mUw00NkablfXc')
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <OrderProvider>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Header />
                  <img className="bg-image" src={background} alt="bg-img" />
                  <ProductsContainer />
                  <Footer />
                </Route>

                <Route exact path={`/:type/:id`}>
                  <Header />
                  <img className="bg-image" src={background} alt="bg-img" />
                  <ProductOwnPage />
                </Route>

                <Route exact path="/signin">
                  <SignIn />
                </Route>

                <Route exact path="/signup">
                  <SignUp />
                </Route>

                <Route exact path="/cart">
                  <Header />
                  <Elements stripe={stripePromise}>
                  <Cart />
                  </Elements>
                </Route>

                <Route exact path="/successful-payment">
                
                  <SuccessfulPayment/>
                </Route>
              </Switch>
            </Router>
          </OrderProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
