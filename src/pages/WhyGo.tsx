import React, { useContext } from "react";

import {
  IonButton,
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
import { Header } from "../components/Header";

const WhyGo: React.FC = () => {
  const getawayCtx = useContext(Getaway);

  const intentionSelectionHandler = (id: number) => {
    getawayCtx.selectOneIntent(id);
  };

  return (
    <IonPage>
      <Header title={"Getaway Planner"} />
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle size="large">What kind of getaway?</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {getawayCtx.intentions.map((intention, idx) => {
              return (
                <IonCol size="6" key={idx}>
                  <GetawayTypeTile
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
