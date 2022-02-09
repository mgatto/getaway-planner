import React, { useState } from "react";

export interface Intention {
  id: number;
  title: string;
}

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

interface GetawayContext {
  intentions: Intention[];
  currentIntention: Intention;
  selectOneIntent: (intentId: number) => void; //allows to overwrite an existing currentIntent
  addNewIntent: (title: string) => void;
  deleteIntent: (intentId: number) => void;
}

export const Getaway = React.createContext<GetawayContext>({
  intentions: [],
  currentIntention: initialCurrentIntent,
  selectOneIntent: () => {},
  addNewIntent: () => {},
  deleteIntent: () => {},
});

const GetawayContextProvider: React.FC = (props) => {
  const [intentions, setIntentions] = useState<Intention[]>(initialIntentions);

  const [currentIntention, setCurrentIntention] =
    useState<Intention>(initialCurrentIntent);

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

  return (
    <Getaway.Provider
      value={{
        intentions,
        currentIntention,
        selectOneIntent,
        addNewIntent,
        deleteIntent,
      }}
    >
      {props.children}
    </Getaway.Provider>
  );
};

export default GetawayContextProvider;
