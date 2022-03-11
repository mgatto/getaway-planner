import React, { EventHandler, useContext } from "react";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import GetawayTypeTile from "../components/GetawayTypeTile";
import { Getaway } from "../data/GetawayContextProvider";

const WhyGo: React.FC = () => {
  const getawayCtx = useContext(Getaway);
  const currentIntention = getawayCtx.currentIntention;

  const intentionSelectionHandler = (id: number) => {
    getawayCtx.selectOneIntent(id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {" "}
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Getaway Planner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle size="large">What kind of getaway?</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {getawayCtx.intentions.map((intention, idx) => {
              // TODO highlight the currently selected intention; use currentIntention from the Context
              let highlightClass = "";
              if (intention.id === currentIntention.id)
                highlightClass = "activeSelection";
              return (
                <IonCol size="6" key={idx}>
                  {/*TODO proxy the className attr*/}
                  <GetawayTypeTile
                    // className={}
                    selectIntention={intentionSelectionHandler}
                    id={intention.id}
                    title={intention.title}
                  />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        {getawayCtx.currentIntention.id > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Your reason for getting away</IonCardSubtitle>
              <IonCardTitle>{getawayCtx.currentIntention.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton fill="outline" slot="end" routerLink={"/where"}>
                Let's go!
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default WhyGo;
