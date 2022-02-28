import React, { useState } from "react";
import { LatLngExpression } from "leaflet";

export interface Intention {
  id: number;
  title: string;
}

//TODO this could also be a class from ../models
const initialCurrentIntent: Intention = {
  id: 0,
  title: "",
};
const initialIntentions: Intention[] = [
  { id: 1, title: "Book Hunting" },
  { id: 2, title: "Beach Combing" },
  { id: 3, title: "Sightseeing" },
  { id: 4, title: "Wine Trail" },
];

export interface Destination {
  id: number;
  position: LatLngExpression;
  name: string;
}

export interface Timespan {
  hours: number;
}
//Type it further so it's only 24, 36, 48, 72? This might be an actually good use case for enum?

interface GetawayContext {
  intentions: Intention[];
  currentIntention: Intention;
  selectOneIntent: (intentId: number) => void; //allows to overwrite an existing currentIntent
  addNewIntent: (title: string) => void;
  deleteIntent: (intentId: number) => void;
  name: string;
  saveName: (name: string) => void;
  destinations: Destination[];
  appendDestination: (place: Destination) => void;
  removeDestination: (placeId: number) => void;
  lengthOfStay: Timespan;
  saveLengthOfStay: (length: Timespan) => void;
  methodOfTransport: string;
  saveMethodOfTransport: (method: string) => void;
  startDate: string;
  fixStartDate: (start: string) => void;
}

export const Getaway = React.createContext<GetawayContext>({
  intentions: [],
  currentIntention: initialCurrentIntent,
  selectOneIntent: () => {},
  addNewIntent: () => {},
  deleteIntent: () => {},
  destinations: [],
  name: "",
  saveName: () => {},
  appendDestination: () => {},
  removeDestination: () => {},
  lengthOfStay: { hours: 0 },
  saveLengthOfStay: () => {},
  methodOfTransport: "",
  saveMethodOfTransport: () => {},
  startDate: "",
  fixStartDate: () => {},
});

const GetawayContextProvider: React.FC = (props) => {
  const [intentions, setIntentions] = useState<Intention[]>(initialIntentions);
  const [currentIntention, setCurrentIntention] =
    useState<Intention>(initialCurrentIntent);

  const [name, setName] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [lengthOfStay, setLengthOfStay] = useState<Timespan>({ hours: 0 });
  const [methodOfTransport, setMethodOfTransport] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString()); //ISO 8601 Datetime Format: YYYY-MM-DDTHH:mmZ​

  //manipulates currentIntention state only
  const selectOneIntent = (intentId: number) => {
    const foundIntention: Intention =
      intentions.find((intent) => intent.id === intentId) ||
      initialCurrentIntent;

    setCurrentIntention(foundIntention);
  };

  //TODO currently unused
  const addNewIntent = (title: string) => {
    const newIntent: Intention = {
      //TODO plus 1 from the previous?
      id: Math.random(),
      title,
    };

    setIntentions((stockIntents) => {
      return stockIntents.concat(newIntent);
    });
  };

  const deleteIntent = () => {};

  //TODO may consider using reducers to group related bits of state data?
  // would be good when saving a form via submit all at once
  const saveName = (name: string) => {
    setName(name);
  };

  const appendDestination = (place: Destination) => {
    setDestinations((currentDestinations) => [...currentDestinations, place]);
  };

  const removeDestination = (placeId: number) => {
    setDestinations((currentDestinations) =>
      currentDestinations.filter((place) => place.id !== placeId)
    );
  };

  const saveLengthOfStay = (length: Timespan) => {
    setLengthOfStay(length);
  };
  const saveMethodOfTransport = (method: string) => {
    setMethodOfTransport(method);
  };

  const fixStartDate = (start: string) => {
    setStartDate(start);
  };

  return (
    <Getaway.Provider
      value={{
        intentions,
        currentIntention,
        selectOneIntent,
        addNewIntent,
        deleteIntent,
        destinations,
        appendDestination,
        removeDestination,
        lengthOfStay,
        methodOfTransport,
        saveLengthOfStay,
        saveMethodOfTransport,
        startDate,
        fixStartDate,
        name,
        saveName,
      }}
    >
      {props.children}
    </Getaway.Provider>
  );
};

export default GetawayContextProvider;
