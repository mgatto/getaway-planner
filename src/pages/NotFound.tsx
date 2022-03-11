import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404: Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p>Try something else.</p>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
