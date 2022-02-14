import React from "react";
import {
  IonContent,
  IonItem,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
} from "@ionic/react";

const HowTo: React.FC = () => {
  const lengthHandler = (length: string) => {
    console.log(length);
  };

  const methodHandler = (method: string) => {
    console.log(method);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Getaway Planner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">How to get there?</IonTitle>
            {/*TODO replace "there" with first item on route list*/}
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>From: </IonCardSubtitle>
            <IonCardTitle>To: </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Length of Getaway: </IonLabel>

              <IonSelect
                // value={length}
                placeholder="Select One"
                onIonChange={(e) => lengthHandler(e.detail.value)}
              >
                <IonSelectOption value="24">24 hours</IonSelectOption>
                <IonSelectOption value="36">36 hours</IonSelectOption>
                <IonSelectOption value="48">48 hours</IonSelectOption>
                <IonSelectOption value="72">72 hours</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Starting on</IonLabel>
              <IonInput type={"date"} />
            </IonItem>
            <IonList>
              <IonRadioGroup
                allowEmptySelection={true}
                name={"method"}
                onIonChange={(e) => methodHandler(e.detail.value)}
              >
                <IonListHeader>
                  <IonLabel>Method of Transport</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>Drive</IonLabel>
                  <IonRadio value="drive" />
                </IonItem>

                <IonItem>
                  <IonLabel>Train</IonLabel>
                  <IonRadio value="train" />
                </IonItem>

                <IonItem>
                  <IonLabel>Bus</IonLabel>
                  <IonRadio value="bus" />
                </IonItem>

                <IonItem>
                  <IonLabel>Fly</IonLabel>
                  <IonRadio value="fly" />
                </IonItem>

                <IonItem>
                  <IonLabel>Boat</IonLabel>
                  <IonRadio value="boat" />
                </IonItem>
              </IonRadioGroup>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HowTo;
