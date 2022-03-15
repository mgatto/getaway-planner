import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WhyGo from "./pages/WhyGo";
import GetawayContextProvider from "./data/GetawayContextProvider";
import WhereTo from "./pages/WhereTo";
import HowTo from "./pages/HowTo";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/*need to wrap the router with the data store access component*/}
      <GetawayContextProvider>
        <IonRouterOutlet>
          <Switch>
            {/*App starting point and default; different style of routing to a component is intentional*/}
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {/*Get the user's intention for travel to match places */}
            <Route path={"/why"} component={WhyGo} />
            {/*Get the user's desired destination(s)*/}
            <Route path={"/where"} component={WhereTo} />
            {/*Help user plan transit to destination(s)*/}
            <Route path={"/how"} component={HowTo} />
            {/*Basically, a 404*/}
            <Route path="*" component={NotFound} />
          </Switch>
        </IonRouterOutlet>
      </GetawayContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
