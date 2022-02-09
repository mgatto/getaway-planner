import React, { EventHandler, useContext } from "react";

import {
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
import { Intention, Getaway } from "../data/GetawayContextProvider";

export interface GetawayTypeProps extends Intention {
  handler: EventHandler<any>;
}

const WhyGo: React.FC = () => {
  const getawayCtx = useContext(Getaway);

  const getawayTypeSelectionHandler = (id: number) => {
    // console.log(id);
    getawayCtx.selectOneIntent(id);
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
      </IonContent>
    </IonPage>
  );
};

export default WhyGo;
