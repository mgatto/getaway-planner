import React, { EventHandler } from "react";
import { IonItem } from "@ionic/react";
import { Intention } from "../data/GetawayContextProvider";

export interface GetawayTypeProps extends Intention {
  selectIntention: (id: number) => void;
}
//EventHandler<any>

const GetawayTypeTile: React.FC<GetawayTypeProps> = (props) => {
  return (
    <IonItem
      key={props.id}
      button
      onClick={(e) => {
        e.stopPropagation();
        props.selectIntention(props.id); //TODO why don't I need to use bind(null, props.id) here?
      }}
      color="default"
      detail={true}
    >
      {props.title}
    </IonItem>
  );
};

export default React.memo(GetawayTypeTile);
