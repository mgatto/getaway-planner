import React, { useContext } from "react";
import {
  IonContent,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonDatetime,
} from "@ionic/react";
import { Getaway, Timespan } from "../data/GetawayContextProvider";
import { Header } from "../components/Header";

const HowTo: React.FC = () => {
  const getawayCtx = useContext(Getaway);

  const method: string = getawayCtx.methodOfTransport;
  const length: Timespan = getawayCtx.lengthOfStay;
  const start: string = getawayCtx.startDate;

  const methodHandler = (method: string) => {
    console.log("method = " + method);
    getawayCtx.saveMethodOfTransport(method);
  };

  const startDateHandler = (start: string | null | undefined) => {
    console.log("start=" + start);
    getawayCtx.fixStartDate(start || "");
  };

  const lengthHandler = (hours: string) => {
    console.log("hours = " + hours);
    getawayCtx.saveLengthOfStay({ hours: +hours });
  };

  return (
    <IonPage>
      <Header title={"Getaway Planner"} />
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">How to get there?</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel position="stacked">Length of Getaway: </IonLabel>
          <IonSelect
            value={length.hours.toString()}
            placeholder="Select One"
            onIonChange={(e) => lengthHandler(e.detail?.value)}
          >
            <IonSelectOption value="24">24 hours</IonSelectOption>
            <IonSelectOption value="36">36 hours</IonSelectOption>
            <IonSelectOption value="48">48 hours</IonSelectOption>
            <IonSelectOption value="72">72 hours</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Starting on</IonLabel>
          <IonDatetime
            value={start}
            presentation="date"
            onIonChange={(e) => startDateHandler(e.detail.value)}
          />
        </IonItem>

        <IonItem>
          <IonRadioGroup
            value={method}
            allowEmptySelection={true}
            name={"method"}
            onIonChange={(e) => methodHandler(e.detail.value)}
          >
            <IonListHeader>
              <IonLabel position="stacked">Method of Transport</IonLabel>
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
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default HowTo;
