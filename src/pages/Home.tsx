import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import React from "react";
import PastTripsList from "../components/PastTrips/PastTripsList";
import { BrowserRouterProps } from "react-router-dom";

const Home: React.FC<BrowserRouterProps> = (props) => {
  // const

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PastTripsList />
      </IonContent>
    </IonPage>
  );
};

export default Home;
