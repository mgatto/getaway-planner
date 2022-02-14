import React from "react";
import { IonItem } from "@ionic/react";
import { GetawayTypeProps } from "../pages/WhyGo";

const GetawayTypeTile: React.FC<GetawayTypeProps> = (props) => {
  return (
    <IonItem
      key={props.id}
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

export default React.memo(GetawayTypeTile);
