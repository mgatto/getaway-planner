import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { Getaway, Intention } from "../data/GetawayContextProvider";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  Tooltip,
} from "react-leaflet";
import PastTripsList from "../components/PastTrips/PastTripsList";

import "./WhereTo.css";
import {
  LatLng,
  LatLngExpression,
  LeafletMouseEvent,
  LocationEvent,
} from "leaflet";
import { useHistory } from "react-router";

interface WhereToProps {
  near?: boolean;
  cluster?: boolean;
}

interface Destinations {
  position: LatLngExpression;
  name: string;
}

//start us off in Santa Fe!
const initialPosition: LatLngExpression = [35.68, -105.94];

const WhereTo: React.FC<WhereToProps> = ({
  near = true,
  cluster = false,
}): JSX.Element => {
  const [route, setRoute] = useState<string>();
  const [markers, setMarkers] = useState<Destinations[]>([]);
  const getawayNameRef = useRef<HTMLIonInputElement>(null);

  const history = useHistory();

  const getawayCtx = useContext(Getaway);
  const intentionForTravel = getawayCtx.currentIntention;

  const submitHandler = () => {
    console.log(getawayNameRef.current!.value);
    history.push("/how");
  };

  //ah, this is basically a React Component, which must be a child element of MapContainer; neat!
  function DestinationMarker() {
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    // or start with the center: map.getCenter() or simply "initialPosition"

    const map = useMapEvents({
      click(e: LeafletMouseEvent) {
        setPosition(e.latlng);

        const GEOCODE_URL =
          "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
        async function reverseGeoCoding(coordinates: LatLng) {
          const data = await (
            await fetch(GEOCODE_URL + `${coordinates.lng},${coordinates.lat}`)
          ).json();

          // const addressLabel =
          //   data.address !== undefined ? data.address.LongLabel : "Unknown";
          return data;
        }

        reverseGeoCoding(e.latlng).then((data) => {
          console.log(data);

          // make level of name detail depend on zoom level
          let name = `${data.address.City}, ${data.address.RegionAbbr}`;
          console.log(map.getZoom());
          const zoom = map.getZoom();
          if (zoom >= 15.5) {
            name = `${data.address.ShortLabel} ` + name;
          }

          setMarkers((existingMarkers) => [
            ...existingMarkers,
            {
              position: e.latlng,
              // also .Neighborhood, PlaceName, ShortLabel
              name,
            },
          ]);
        });

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
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Getaway Planner</IonTitle>
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

        <MapContainer
          id={"getaway-map"}
          center={initialPosition}
          zoom={11}
          scrollWheelZoom={false}
          whenReady={() => {}}
          whenCreated={(map) => {
            map.invalidateSize();
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((destination, idx) => (
            <Marker key={`marker-${idx}`} position={destination.position}>
              {/*<Tooltip>{destination.name}</Tooltip>*/}
              <Popup onOpen={() => {}}>
                <span>{destination.name}</span>
              </Popup>
            </Marker>
          ))}

          <DestinationMarker />
        </MapContainer>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your list of places</IonCardTitle>
            <IonCardSubtitle>
              Next, save this getaway and go on to choose how you're getting
              there
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <ol>
              {markers.map((destination, idx) => {
                return (
                  <li key={`dest-${idx}`}>
                    {destination.name} [{destination.position.toString()}]
                  </li>
                );
              })}
            </ol>
            <IonItem>
              <IonLabel position="stacked">Name this Getaway</IonLabel>
              <IonInput
                required={true}
                ref={getawayNameRef}
                size={20}
                type="text"
              />
            </IonItem>

            <IonItem>
              <IonTextarea value={route} className={"ion-margin"}></IonTextarea>
              {/*<IonToolbar>*/}
              {/*  <IonButtons slot="primary">*/}
              {/*   */}
              {/*  </IonButtons>*/}
              {/*  /!*<IonTitle>Default Buttons</IonTitle>*!/*/}
              {/*</IonToolbar>*/}
              <IonButton
                fill="outline"
                size="small"
                className={"ion-align-self-baseline"}
                onClick={() =>
                  setRoute(
                    "Santa Fe, NM --> Espanola, NM --> Taos, NM --> Abiquiu, NM --> Santa Fe, NM"
                  )
                }
              >
                Calculate shortest movement plan
              </IonButton>
            </IonItem>

            <IonItem>
              <IonButton onClick={submitHandler}>Save this Getaway</IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <PastTripsList intention={intentionForTravel} />
      </IonContent>
    </IonPage>
  );
};

export default WhereTo;
