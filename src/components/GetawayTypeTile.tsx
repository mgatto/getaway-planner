import React from "react";
import { IonItem } from "@ionic/react";
import { GetawayTypeProps } from "../pages/WhyGo";

const GetawayTypeTile: React.FC<GetawayTypeProps> = (props) => {
  return (
    <IonItem
      button
      onClick={(e) => {
        e.stopPropagation();
        props.handler(props.id);
      }}
      color="default"
      detail={true}
    >
      {props.title}
    </IonItem>
  );
};

export default GetawayTypeTile;
