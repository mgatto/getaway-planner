import React from "react";
import { Intention } from "../../data/GetawayContextProvider";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonList,
  IonListHeader,
  IonTitle,
} from "@ionic/react";

interface PastTripProps {
  intention: Intention;
}

interface Trip {
  id: number;
  name: string;
  places: string[];
  start: Date;
  end: Date;
  rating: number;
}

/* dummy initial data */
const pastTrips: Trip[] = [
  {
    id: 1,
    name: "Awesome bookhounding 2020",
    places: [
      "Davis, California",
      "West Sacramento, California",
      "Napa, California",
    ],
    start: new Date(2020, 2, 18),
    end: new Date(2020, 2, 21),
    rating: 5,
  },
];

const PastTripsList: React.FC<PastTripProps> = ({ intention }): JSX.Element => {
  return (
    <IonList>
      <IonListHeader>
        <IonTitle>Your Past Getaways for {intention.title}</IonTitle>
      </IonListHeader>

      {pastTrips.map((trip, idx) => {
        // "return" because we're in a lambda
        return (
          // must have a unique key since it's in a list
          <IonItem key={idx}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{trip.name}</IonCardTitle>
                <IonCardSubtitle>
                  {trip.start.toDateString()} to {trip.end.toDateString()}{" "}
                  Rating: {trip.rating}/5
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <ul>
                  {trip.places.map((place, idx2) => (
                    <li key={idx2 + 100}>{place}</li>
                  ))}
                </ul>
              </IonCardContent>
            </IonCard>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default PastTripsList;
