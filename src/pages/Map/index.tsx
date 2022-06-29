import React, { useState } from "react";
import { useWindowDimensions, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import pinBlueImg from "../../assets/images/icn_pin_blue.png";
import pinImg from "../../assets/images/icn_pin.png";
import Container from "../../components/Container";
import {
  MapWrapper,
  FilterButtonsRow,
  LabsButton,
  PharmButton,
  LabsButtonText,
  PharmButtonText,
  PinInfoWrapper,
  PinInfoOffer,
  PinInfoTitle,
  PinInfoParagraph,
  GoBackButtonRow,
  GoBackButton,
  GoBackButtonText,
} from "./styles";

const Map: React.FC = () => {
  const navigation = useNavigation();
  const location = useSelector(
    (state: {
      location: { coordinates: { latitude: number; longitude: number } };
    }) => state.location.coordinates
  );
  const [labMarkers] = useState([
    {
      id: 1,
      latlng: { latitude: location.latitude, longitude: location.longitude },
      title: "LabCenter",
      address: "Rua Teodoro da Silva, 145 Vila Isabel, Rio de Janeiro",
      offer: "10% Off Cupom PG2020",
      contact: "E-mail: contato@labcenter.com Telefone: (21) 2625 7892",
    },
  ]);
  const [pharmMarkers] = useState([
    {
      id: 2,
      latlng: {
        latitude: location.latitude + 0.001,
        longitude: location.longitude - 0.002,
      },
      title: "Pharmacall",
      address: "Rua Teodoro da Silva, 145 Vila Isabel, Rio de Janeiro",
      offer: "",
      contact: "E-mail: contato@pharmacall.com Telefone: (21) 3333 3333",
    },
    {
      id: 3,
      latlng: {
        latitude: location.latitude - 0.001,
        longitude: location.longitude - 0.003,
      },
      title: "Drogasmil",
      address: "Rua Teodoro da Silva, 145 Vila Isabel, Rio de Janeiro",
      offer: "",
      contact: "E-mail: contato@drogasmil.com Telefone: (21) 3333 3333",
    },
  ]);
  const [selectedFilter, setSelectedFilter] = useState({
    laboratories: true,
    pharmacies: false,
  });
  const [selectedPin, setSelectedPin] = useState(null);

  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;

  return (
    <Container
      backgroundColor="gray"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      noPadding
      noScroll
    >
      <MapWrapper height={windowHeight} width={windowWidth}>
        <FilterButtonsRow>
          <LabsButton
            selected={selectedFilter.laboratories}
            onPress={(): void =>
              setSelectedFilter({ laboratories: true, pharmacies: false })
            }
          >
            <LabsButtonText selected={selectedFilter.laboratories}>
              Laboratórios
            </LabsButtonText>
          </LabsButton>
          <PharmButton
            selected={selectedFilter.pharmacies}
            onPress={(): void =>
              setSelectedFilter({ laboratories: false, pharmacies: true })
            }
          >
            <PharmButtonText selected={selectedFilter.pharmacies}>
              Farmácias
            </PharmButtonText>
          </PharmButton>
        </FilterButtonsRow>
        <MapView
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {selectedFilter.laboratories &&
            labMarkers.map((marker) => (
              <Marker
                coordinate={marker.latlng}
                image={selectedPin === marker.id ? pinBlueImg : pinImg}
                onSelect={(): void => setSelectedPin(marker.id)}
                onDeselect={(): void => setSelectedPin(null)}
              >
                <Callout tooltip>
                  <PinInfoWrapper>
                    {marker.offer !== "" && (
                      <PinInfoOffer>{marker.offer}</PinInfoOffer>
                    )}
                    <PinInfoTitle>{marker.title}</PinInfoTitle>
                    <PinInfoParagraph>{marker.address}</PinInfoParagraph>
                    <PinInfoParagraph>{marker.contact}</PinInfoParagraph>
                  </PinInfoWrapper>
                </Callout>
              </Marker>
            ))}
          {selectedFilter.pharmacies &&
            pharmMarkers.map((marker) => (
              <Marker
                coordinate={marker.latlng}
                image={selectedPin === marker.id ? pinBlueImg : pinImg}
                onSelect={(): void => setSelectedPin(marker.id)}
                onDeselect={(): void => setSelectedPin(null)}
              >
                <Callout tooltip>
                  <PinInfoWrapper>
                    {marker.offer !== "" && (
                      <PinInfoOffer>{marker.offer}</PinInfoOffer>
                    )}
                    <PinInfoTitle>{marker.title}</PinInfoTitle>
                    <PinInfoParagraph>{marker.address}</PinInfoParagraph>
                    <PinInfoParagraph>{marker.contact}</PinInfoParagraph>
                  </PinInfoWrapper>
                </Callout>
              </Marker>
            ))}
        </MapView>
        <GoBackButtonRow>
          <GoBackButton onPress={(): void => navigation.goBack()}>
            <GoBackButtonText>Voltar</GoBackButtonText>
          </GoBackButton>
        </GoBackButtonRow>
      </MapWrapper>
    </Container>
  );
};

export default Map;
