import React from "react";
import "../src/assets/css/style.scss";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
// import DashbordLayout from "./components/layouts/DashbordLayout";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home/Home";
import Package from "./pages/package/Package";
import Billing from "./pages/Billing/Billing";
import Login from "./pages/Login/Login";
import DashbordLayout from "./components/layouts/DashbordLayout";
import Profile from "./pages/Profile/Profile";
import Policy from "./pages/Policy/Policy";
import Settings from "./pages/Settings/Settings";
import Claims from "./pages/Claims/Claims";
import ClaimsAdd from "./pages/Claims/Add";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "./components/Common/Loader";
import LoaderContextProvider from "./context/LoaderContext";
function App() {
  const stripePromise = loadStripe(
    "pk_test_51JXmAMEsez0fFagsz7MeCO58x3A4lxZ04t50rib3wQNnrZ33XpCgYz4eDEwH2hKe3jTGiKA6vK5tV9RGxqlsqMAo00MORcVUJA"
  );

  return (
    <>
      <LoaderContextProvider>
        <Router>
          <Elements stripe={stripePromise}>
            <Switch>
              <AppRoutes exact path="/" Layout={MainLayout} Component={Home} />
              <AppRoutes exact path="/package" Layout={MainLayout} Component={Package} />
              <AppRoutes exact path="/billing" Layout={MainLayout} Component={Billing} />
              <Route path="/login" component={Login} />
              <AppRoutes exact path="/profile" Layout={DashbordLayout} Component={Profile} />
              <AppRoutes exact path="/policy" Layout={DashbordLayout} Component={Policy} />
              <AppRoutes exact path="/settings" Layout={DashbordLayout} Component={Settings} />
              <AppRoutes exact path="/claims" Layout={DashbordLayout} Component={Claims} />
              <AppRoutes exact path="/claims/add" Layout={DashbordLayout} Component={ClaimsAdd} />
            </Switch>
          </Elements>
        </Router>
        <Loader />
        <ToastContainer position="bottom-right" hideProgressBar={true} />
      </LoaderContextProvider>
    </>
  );
}

export default App;
