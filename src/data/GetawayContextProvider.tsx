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

//dummy starting data intentions, highly tailored for the author :-)
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

//TODO Type it further so it's only 24, 36, 48, 72? This might be an actually good use case for enum?
// Or, it's too limiting for the user?
export interface Timespan {
  hours: number;
}

/* type definition for the Context data store */
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

/* this is the initial state of the Context data store */
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

/* now, create the actual component for accessing data in the store */
const GetawayContextProvider: React.FC = (props) => {
  const [intentions, setIntentions] = useState<Intention[]>(initialIntentions);
  const [currentIntention, setCurrentIntention] =
    useState<Intention>(initialCurrentIntent);

  const [name, setName] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [lengthOfStay, setLengthOfStay] = useState<Timespan>({ hours: 0 });
  const [methodOfTransport, setMethodOfTransport] = useState("");

  //ISO 8601 Datetime Format is: YYYY-MM-DDTHH:mmZ​
  const [startDate, setStartDate] = useState(new Date().toISOString());

  //manipulates currentIntention state only
  const selectOneIntent = (intentId: number) => {
    const foundIntention: Intention =
      intentions.find((intent) => intent.id === intentId) ||
      initialCurrentIntent;

    setCurrentIntention(foundIntention);
  };

  const addNewIntent = (title: string) => {
    const newIntent: Intention = {
      id: Math.random(),
      title,
    };

    setIntentions((stockIntents) => {
      return stockIntents.concat(newIntent);
    });
  };

  const deleteIntent = () => {};

  //TODO may consider using reducers to group related bits of state data?
  // would be good when saving a form incrementally after each input loses focus versus submit all at once
  const saveName = (name: string) => {
    setName(name);
  };

  const appendDestination = (place: Destination) => {
    place.id = destinations.length + 1;
    setDestinations((currentDestinations) => [...currentDestinations, place]);
  };

  const removeDestination = (placeId: number) => {
    setDestinations((currentDestinations) =>
      currentDestinations.filter((place) => {
        console.log(place);
        return place.id !== placeId;
      })
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

  /* return the actual React structure which access the data store via our hand-crafted functions */
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
