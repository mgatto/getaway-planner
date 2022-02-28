import React, { useContext, useRef, useState } from "react";
import { Getaway } from "../data/GetawayContextProvider";
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
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import PastTripsList from "../components/PastTrips/PastTripsList";
import axios from "axios";

import { LatLng, LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router";

import classes from "./WhereTo.module.css";

import { trash } from "ionicons/icons";

interface WhereToProps {
  near?: boolean;
  cluster?: boolean;
}

//start us off in Santa Fe!
const initialPosition: LatLngExpression = [35.68, -105.94];

const WhereTo: React.FC<WhereToProps> = ({
  near = true,
  cluster = false,
}): JSX.Element => {
  const [imgurl, setImgurl] = useState<string>("");
  // const [route, setRoute] = useState<string>("");
  // const [markers, setMarkers] = useState<Destinations[]>([]);
  const getawayNameRef = useRef<HTMLIonInputElement>(null);
  const history = useHistory();
  const getawayCtx = useContext(Getaway);

  const intentionForTravel = getawayCtx.currentIntention;
  const getawayName = getawayCtx.name;

  //TODO Add name to Context API; only do onIonBlur else it'll update Context on each keystroke
  const submitHandler = () => {
    console.log(getawayNameRef.current!.value);
    //TODO Validate form here
    getawayCtx.saveName(String(getawayNameRef.current!.value));

    history.push("/how");
  };

  //ah, this is basically a React Component, which must be a child element of MapContainer; neat!
  function DestinationMarker() {
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    // or start with the center: map.getCenter() or simply "initialPosition"

    const map = useMapEvents({
      click(e: LeafletMouseEvent) {
        //TODO maybe going to the user's current location is good to get their departure point?
        setPosition(e.latlng);

        const GEOCODE_URL =
          "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
        async function reverseGeoCoding(coordinates: LatLng) {
          // const addressLabel =
          //   data.address !== undefined ? data.address.LongLabel : "Unknown";
          return await (
            await fetch(GEOCODE_URL + `${coordinates.lng},${coordinates.lat}`)
          ).json();
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

          getawayCtx.appendDestination({
            id: 0,
            position: e.latlng, // also .Neighborhood, PlaceName, ShortLabel
            name,
          });
          // setMarkers((existingMarkers) => [
          //   ...existingMarkers,
          //   {
          //     position: e.latlng,
          //     // also .Neighborhood, PlaceName, ShortLabel
          //     name,
          //   },
          // ]);
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
      <IonContent className="ion-padding">
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
          style={{ height: "75vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {getawayCtx.destinations.map((destination, idx) => (
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
            {getawayCtx.destinations.map((destination, idx) => {
              return (
                <IonItemSliding key={`dest-${idx}`}>
                  <IonItem>
                    <IonLabel>
                      {destination.name} [{destination.position.toString()}]
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption
                      color="danger"
                      onClick={() => console.log("share clicked")}
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                      Delete
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              );
            })}
          </IonCardContent>
        </IonCard>

        {/*TODO add another card for the route optimization?*/}
        <IonItem>
          {/*<IonToolbar>*/}
          {/*  <IonButtons slot="primary">*/}
          {/*  </IonButtons>*/}
          {/*  /!*<IonTitle>Default Buttons</IonTitle>*!/*/}
          {/*</IonToolbar>*/}
          <IonButton
            fill="outline"
            size="small"
            className={"ion-align-self-baseline"}
            onClick={() => {
              //TODO make API call to Python app
              //127.0.0.1:5000/img/Santa_Fe,_New_Mexico
              axios
                .get("http://127.0.0.1:5000/img/Santa_Fe,_New_Mexico")
                .then((resp) => {
                  console.log(resp.data.imgurl);
                  setImgurl(resp.data.imgurl);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Get city image
          </IonButton>
          {imgurl && <IonImg src={imgurl} />}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Name this Getaway</IonLabel>
          <IonInput
            value={getawayName}
            required={true}
            ref={getawayNameRef}
            size={20}
            type="text"
            // onIonBlur={}
          />
        </IonItem>

        <IonItem>
          <IonButton onClick={submitHandler}>Save this Getaway</IonButton>
        </IonItem>

        <PastTripsList intention={intentionForTravel} />
      </IonContent>
    </IonPage>
  );
};

export default WhereTo;
