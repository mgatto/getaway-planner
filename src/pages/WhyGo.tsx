import React, { EventHandler, useContext } from "react";

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
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import GetawayTypeTile from "../components/GetawayTypeTile";
import { Intention, Getaway } from "../data/GetawayContextProvider";

export interface GetawayTypeProps extends Intention {
  handler: EventHandler<any>;
}

const WhyGo: React.FC = () => {
  const getawayCtx = useContext(Getaway);
  // const currentIntention = getawayCtx.currentIntention;

  const getawayTypeSelectionHandler = (id: number) => {
    // console.log(id);
    getawayCtx.selectOneIntent(id);

    //TODO add a card below the options to show the current intention
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar />
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle size="large">What kind of getaway?</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {getawayCtx.intentions.map((intention, idx) => (
              <IonCol size="6" key={idx}>
                <GetawayTypeTile
                  handler={getawayTypeSelectionHandler}
                  id={intention.id}
                  title={intention.title}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        {getawayCtx.currentIntention.id > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Your reason for getting away</IonCardSubtitle>
              <IonCardTitle>{getawayCtx.currentIntention.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {/*TODO convert into RouterLink*/}
              <IonButton fill="outline" slot="end">
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
