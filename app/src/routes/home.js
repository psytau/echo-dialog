import React from "react";
import SplashHero from "../components/SplashHero";
import "./home.scss";
// import withAuth from "../withAuth";
import { useAuth0 } from "@auth0/auth0-react";

import { wakeUpServer } from "../models/api";

function HomeRoute (props) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  wakeUpServer();
  return (
    <React.Fragment>
      <SplashHero 
        loginWithRedirect={loginWithRedirect}
        isAuthenticated={isAuthenticated}>
    </SplashHero>
    </React.Fragment>
  );
}

export default HomeRoute;
