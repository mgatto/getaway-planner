import React, { useContext, useRef, useState } from "react";
import { Getaway } from "../data/GetawayContextProvider";
import {
  IonButton,
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
import { trash } from "ionicons/icons";
import { Header } from "../components/Header";

interface WhereToProps {
  near?: boolean;
  cluster?: boolean;
}

//start us off in Santa Fe, New Mexico!
const initialPosition: LatLngExpression = [35.68, -105.94];

const WhereTo: React.FC<WhereToProps> = ({
  near = true,
  cluster = false,
}): JSX.Element => {
  const [imgurl, setImgurl] = useState<string>("");
  const getawayNameRef = useRef<HTMLIonInputElement>(null);
  const history = useHistory();
  const getawayCtx = useContext(Getaway);
  const intentionForTravel = getawayCtx.currentIntention;
  const getawayName = getawayCtx.name;

  const submitHandler = () => {
    // console.log(getawayNameRef.current!.value);
    getawayCtx.saveName(String(getawayNameRef.current!.value));
    history.push("/how");
  };

  /* define a sub-component for a marker on the map */
  function DestinationMarker() {
    const map = useMapEvents({
      click(e: LeafletMouseEvent) {
        /**
         * Get the accepted name for the lat/long pair
         */
        const GEOCODE_URL =
          "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

        async function reverseGeoCoding(coordinates: LatLng) {
          return await (
            await fetch(GEOCODE_URL + `${coordinates.lng},${coordinates.lat}`)
          ).json();
        }

        reverseGeoCoding(e.latlng).then((data) => {
          let name = `${data.address.City}, ${data.address.Region}`;

          /* make level of name detail depend on zoom level */
          const zoom = map.getZoom();
          if (zoom >= 15.5) {
            name = `${data.address.ShortLabel} ` + name;
          }

          getawayCtx.appendDestination({
            id: 0,
            position: e.latlng, //e also has: .Neighborhood, .PlaceName, .ShortLabel
            name,
          });
        });

        map.flyTo(e.latlng, map.getZoom());
      },
    });

    //we don't need to return Marker JSX since we save the marker in the state, and render below.
    return null;
  }

  return (
    <IonPage>
      <Header title={"Getaway Planner"} />
      <IonContent className="ion-padding">
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">
              Choose Destinations for {intentionForTravel.title}
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {/*TODO "center=..." maybe going to the user's current location is better to get their departure point?*/}
        {/*Or start with the center: map.getCenter()*/}
        <MapContainer
          id={"getaway-map"}
          center={initialPosition}
          // default initial zoom
          //TODO store current zoom in state for better UX when moving between pages
          zoom={11}
          scrollWheelZoom={false}
          whenReady={() => {}}
          whenCreated={(map) => {
            // needed to workaround a bug in the library where tiles appear sparingly
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
              Next, save this getaway then go to how you're getting there.
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {getawayCtx.destinations.map((destination, idx) => {
              return (
                <IonItemSliding key={`dest-${idx}`}>
                  <IonItem>
                    <IonLabel>{destination.name}</IonLabel>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption
                      color="danger"
                      onClick={(e) => {
                        console.log(e);
                        getawayCtx.removeDestination(destination.id);
                      }}
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

        {/*Get a representative image for the destination*/}
        <IonItem>
          <IonButton
            fill="outline"
            size="small"
            className={"ion-align-self-baseline"}
            onClick={() => {
              /* reformat because API's source data expects it as so with underscores: Santa_Fe,_New_Mexico */
              axios
                .get(
                  `http://127.0.0.1:5000/img/${getawayCtx.destinations[0].name.replace(
                    /\s+/g,
                    "_"
                  )}`
                )
                .then((resp) => {
                  setImgurl(resp.data.imgurl);
                })
                .catch((err) => {
                  //TODO should display img error to screen...
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
