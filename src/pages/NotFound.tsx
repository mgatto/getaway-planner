import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../components/Header";

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <Header title={"404: Not Found"} />
      <IonContent fullscreen>
        <p>Try something else.</p>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
