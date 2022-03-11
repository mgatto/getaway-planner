import React, { useContext } from "react";
import { IonItem, IonText } from "@ionic/react";
import { Getaway, Intention } from "../data/GetawayContextProvider";

export interface GetawayTypeProps extends Intention {
  selectIntention: (id: number) => void;
}

const GetawayTypeTile: React.FC<GetawayTypeProps> = (props) => {
  const getawayCtx = useContext(Getaway);
  const currentIntention = getawayCtx.currentIntention;

  /* highlight the currently selected intention */
  let highlightClass = "";
  if (props.id === currentIntention.id) highlightClass = "secondary";

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
      <IonText className={highlightClass}>{props.title}</IonText>
    </IonItem>
  );
};

export default React.memo(GetawayTypeTile);
