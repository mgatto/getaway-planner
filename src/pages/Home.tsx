import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import React, { useContext } from "react";
import PastTripsList from "../components/PastTrips/PastTripsList";
import { BrowserRouterProps } from "react-router-dom";
import { Getaway } from "../data/GetawayContextProvider";
import { Header } from "../components/Header";

const Home: React.FC<BrowserRouterProps> = (props) => {
  const getawayCtx = useContext(Getaway);
  const intentionForTravel = getawayCtx.currentIntention;

  return (
    <IonPage>
      <Header title={"Getaway Planner"} />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PastTripsList intention={intentionForTravel} />
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>What Next?</IonCardTitle>
            <IonCardSubtitle></IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton fill="outline" slot="end" routerLink={"/why"}>
              Start a new Getaway
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
