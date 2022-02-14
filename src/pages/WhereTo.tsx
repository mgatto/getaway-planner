import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { Getaway, Intention } from "../data/GetawayContextProvider";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMapEvent,
  useMap,
  Tooltip,
} from "react-leaflet";
import PastTripsList from "../components/PastTrips/PastTripsList";

import "./WhereTo.css";
// import "leaflet/dist/leaflet.css";
import { LatLng, LatLngExpression, LatLngTuple, LocationEvent } from "leaflet";

interface WhereToProps {
  near?: boolean;
  cluster?: boolean;
}

const initialPosition: LatLngExpression = [35.68, -105.94];

const WhereTo: React.FC<WhereToProps> = ({
  near = true,
  cluster = false,
}): JSX.Element => {
  const [markers, setMarkers] = useState<LatLngExpression[]>([]);

  const getawayCtx = useContext(Getaway);
  const intentionForTravel = getawayCtx.currentIntention;

  //ah, this is basically a React Component, which must be a child element of MapContainer; neat!
  function DestinationMarker() {
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    // or start with the center: map.getCenter() or simply "initialPosition"

    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setMarkers((existingMarkers) => [...existingMarkers, e.latlng]);

        map.flyTo(e.latlng, map.getZoom());
      },
    });

    //we don't need to return Marker JSX since we save the marker to the state, and render below.
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">
              Choose Destinations for {intentionForTravel.title}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <MapContainer id={"getaway-map"} center={initialPosition} zoom={11}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((position, idx) => (
            <Marker key={`marker-${idx}`} position={position}>
              {/*<Tooltip></Tooltip>*/}
              {/*    <Popup>*/}
              {/*      <span>Popup</span>*/}
              {/*    </Popup>*/}
            </Marker>
          ))}

          <DestinationMarker />
        </MapContainer>

        <ul>
          {markers.map((position, idx) => {
            return <li key={`dest-${idx}`}>{position.toString()}</li>;
          })}
        </ul>

        <PastTripsList intention={intentionForTravel} />
      </IonContent>
    </IonPage>
  );
};

export default WhereTo;
