import React, { useState, useRef } from "react";
import { Dimensions, Image, Linking } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { useNavigation } from "@react-navigation/native";

import productGeriatricDieperImg from "../../assets/images/geriatric_dieper.png";
import iconSearch from "../../assets/images/icn_search.png";
import arrowBack from "../../assets/images/icons-dark-back.png";
import arrowFwd from "../../assets/images/icons-dark-fwd.png";
import productRivotrilImg from "../../assets/images/rivotril.png";
import BackButton from "../../components/BackButton";
import Col from "../../components/Col";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Row from "../../components/Row";
import colors from "../../config/colors";
import {
  ArrowContainer,
  ButtonActions,
  FilterText,
  OrderByButton,
  CarouselContainer,
  CarouselItemWrapper,
  CarouselImage,
  CarouselText,
  PaginationWrapper,
  SectionTitleText,
  SearchContainer,
  CardWrapper,
  CardBody,
  ProductImageWrapper,
  ProductImage,
  Details,
  Name,
  Info,
  Price,
  PriceMessage,
  AdditionalPricesWrapper,
  AdditionalPrices,
  StoreLinkButton,
} from "./styles";

const Products: React.FC = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [lastSearchedProducts] = useState([
    {
      id: 1,
      name: "Rivotril",
      info: "2 mg",
      info2: "",
      price: "45,70",
      priceMessage: "menor preço",
      distance: "10",
      image: productRivotrilImg,
      buyInfo: [
        {
          price: "45,70",
          store: "Americanas.com",
          storeLink: "http://www.americanas.com",
          paymentMethod: "em até 12x sem juros",
        },
        {
          price: "46,50",
          store: "Drogarias Max",
          storeLink: "http://www.drograriasmax.com",
          paymentMethod: "em até 10x sem juros",
        },
        {
          price: "46,00",
          store: "Droga Raia",
          storeLink: "http://www.drogaraia.com",
          paymentMethod: "em até 12x sem juros",
        },
        {
          price: "48,15",
          store: "Drogarias Venancio",
          storeLink: "http://www.venancio.com",
          paymentMethod: "em até 12x sem juros",
        },
      ],
    },
  ]);
  const [productsList] = useState([
    {
      id: 1,
      name: "Rivotril",
      info: "2 mg",
      info2: "",
      price: "45,70",
      priceMessage: "menor preço",
      distance: "10",
      image: productRivotrilImg,
      buyInfo: [
        {
          priceMessage: "menor preço",
          price: "45,70",
          store: "Americanas.com",
          storeLink: "http://www.americanas.com",
          paymentMethod: "em até 12x sem juros",
        },
        {
          price: "46,50",
          store: "Drogarias Max",
          storeLink: "http://www.drograriasmax.com",
          paymentMethod: "em até 10x sem juros",
        },
        {
          price: "46,00",
          store: "Droga Raia",
          storeLink: "http://www.drogaraia.com",
          paymentMethod: "em até 12x sem juros",
        },
        {
          price: "48,15",
          store: "Drogarias Venancio",
          storeLink: "http://www.venancio.com",
          paymentMethod: "em até 12x sem juros",
        },
      ],
    },
    {
      id: 2,
      name: "Rivozil",
      info: "0.5 mg",
      info2: "",
      price: "99,99",
      priceMessage: "",
      distance: "1",
      image: productRivotrilImg,
      buyInfo: [
        {
          priceMessage: "menor preço",
          price: "99,99",
          store: "Americanas.com",
          storeLink: "http://www.americanas.com",
          paymentMethod: "em até 12x sem juros",
        },
      ],
    },
    {
      id: 3,
      name: "Rinergil",
      info: "1 mg",
      info2: "",
      price: "12,00",
      priceMessage: "menor preço",
      distance: "2",
      image: productRivotrilImg,
      buyInfo: [
        {
          priceMessage: "menor preço",
          price: "12,00",
          store: "Drogasmil",
          storeLink: "http://www.drogasmil.com",
          paymentMethod: "em até 12x sem juros",
        },
        {
          price: "15,99",
          store: "Americanas.com",
          storeLink: "http://www.americanas.com",
          paymentMethod: "em até 12x sem juros",
        },
      ],
    },
    {
      id: 4,
      name: "Rivotril",
      info: "1 mg",
      info2: "",
      price: "46,50",
      priceMessage: "",
      distance: "2",
      image: productRivotrilImg,
      buyInfo: [
        {
          price: "46,50",
          store: "Drogarias Max",
          storeLink: "http://www.drograriasmax.com",
          paymentMethod: "em até 10x sem juros",
        },
        {
          priceMessage: "menor preço",
          price: "46,00",
          store: "Droga Raia",
          storeLink: "http://www.drogaraia.com",
          paymentMethod: "em até 12x sem juros",
        },
        {
          price: "48,15",
          store: "Drogarias Venancio",
          storeLink: "http://www.venancio.com",
          paymentMethod: "em até 12x sem juros",
        },
      ],
    },
    {
      id: 5,
      name: "Rivotril",
      info: "5 mg",
      info2: "",
      price: "50,70",
      priceMessage: "",
      distance: "8",
      image: productRivotrilImg,
      buyInfo: [
        {
          priceMessage: "menor preço",
          price: "50,70",
          store: "Drogarias Pacheco",
          storeLink: "http://www.pacheco.com",
          paymentMethod: "em até 4x sem juros",
        },
      ],
    },
    {
      id: 6,
      name: "Fralda Geriátrica",
      info: "BIGFRAL plus grande",
      info2: "8 unidades",
      price: "20,69",
      priceMessage: "",
      distance: "8",
      image: productGeriatricDieperImg,
      buyInfo: [
        {
          priceMessage: "menor preço",
          price: "20,69",
          store: "Drogarias Pacheco",
          storeLink: "http://www.pacheco.com",
          paymentMethod: "em até 4x sem juros",
        },
      ],
    },
    {
      id: 7,
      name: "Fralda Geriátrica",
      info: "BIGFRAL plus grande",
      info2: "6 unidades",
      price: "14,57",
      priceMessage: "",
      distance: "12",
      image: productGeriatricDieperImg,
      buyInfo: [
        {
          priceMessage: "menor preço",
          price: "14,57",
          store: "Americanas.com",
          storeLink: "http://www.americanas.com",
          paymentMethod: "em até 12x sem juros",
        },
        {
          price: "15,30",
          store: "Drogarias Pacheco",
          storeLink: "http://www.pacheco.com",
          paymentMethod: "em até 12x sem juros",
        },
        {
          price: "18,99",
          store: "Drogarias Venancio",
          storeLink: "http://www.venancio.com",
          paymentMethod: "em até 12x sem juros",
        },
      ],
    },
    {
      id: 8,
      name: "Fralda Geriátrica",
      info: "BIGFRAL plus grande",
      info2: "2 unidades",
      price: "10,49",
      priceMessage: "",
      distance: "3",
      image: productGeriatricDieperImg,
      buyInfo: [
        {
          priceMessage: "menor preço",
          price: "10,49",
          store: "Drogasmil",
          storeLink: "http://www.drogasmil.com",
          paymentMethod: "em até 3x sem juros",
        },
        {
          price: "12,30",
          store: "Drogarias Pacheco",
          storeLink: "http://www.pacheco.com",
          paymentMethod: "em até 3x sem juros",
        },
        {
          price: "11,50",
          store: "Americanas.com",
          storeLink: "http://www.americanas.com",
          paymentMethod: "em até 4x sem juros",
        },
      ],
    },
  ]);
  const [filteredList, setFilteredList] = useState(productsList);
  const [orderFilters, setOrderFilters] = useState({
    price: false,
    distance: false,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef();

  const handleSearchChange = (value: string): void => {
    setSelectedProduct(null);
    setSearch(value);
    setFilteredList(
      productsList
        .filter((item) => value === "" || item.name.includes(value))
        .sort((a, b) =>
          orderFilters.price
            ? parseFloat(a.price) - parseFloat(b.price)
            : orderFilters.distance
            ? parseFloat(a.distance) - parseFloat(b.distance)
            : a.id - b.id
        )
    );
  };

  return (
    <Container
      backgroundColor="gray"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      noHeader
    >
      <Row justifyContent="flex-start" alignItems="center">
        <ArrowContainer>
          <BackButton
            onPress={(): void => {
              selectedProduct ? setSelectedProduct(null) : navigation.goBack();
            }}
          />
        </ArrowContainer>
      </Row>
      <Row>
        <Col>
          <SearchContainer>
            <Input
              placeholderTextColor="secondary"
              placeholder="Pesquisar"
              value={search}
              icon={iconSearch}
              onChangeText={(value: string): void => handleSearchChange(value)}
            />
          </SearchContainer>
          {selectedProduct ? (
            <>
              <CarouselContainer>
                <Carousel
                  ref={carouselRef}
                  data={filteredList}
                  renderItem={({ item, index }) => {
                    return (
                      <CarouselItemWrapper>
                        <CarouselImage
                          source={item.image}
                          resizeMode="contain"
                        />
                        <CarouselText>{`${item.name} ${item.info} ${item.info2}`}</CarouselText>
                        {filteredList[
                          carouselRef.current.currentIndex
                        ].buyInfo.map((inneritem) => {
                          return (
                            <CardWrapper
                              onPress={(): void =>
                                handleSearchChange(inneritem.name)
                              }
                            >
                              <CardBody>
                                <ProductImageWrapper>
                                  <ProductImage
                                    source={selectedProduct.image}
                                    resizeMode="contain"
                                  />
                                </ProductImageWrapper>
                                <Details size="2">
                                  <Name>{inneritem.store}</Name>
                                  <Info color="blue">R$ {inneritem.price}</Info>
                                  <Info color="green">
                                    {inneritem.paymentMethod}
                                  </Info>
                                </Details>
                                <Details>
                                  {inneritem.priceMessage && (
                                    <Info color="green" align="right">
                                      {inneritem.priceMessage}
                                    </Info>
                                  )}
                                  <StoreLinkButton
                                    title="ir a loja"
                                    color="primary"
                                    size="extrasmall"
                                    onPress={(): void => {
                                      Linking.openURL(inneritem.storeLink);
                                    }}
                                  />
                                </Details>
                              </CardBody>
                            </CardWrapper>
                          );
                        })}
                      </CarouselItemWrapper>
                    );
                  }}
                  sliderWidth={Dimensions.get("window").width - 20}
                  itemWidth={Dimensions.get("window").width - 50}
                  onSnapToItem={(index: number): void => setActiveSlide(index)}
                  scrollEnabled={false}
                />
                <PaginationWrapper>
                  <ArrowContainer
                    onPress={(): void => carouselRef.current.snapToPrev()}
                  >
                    <Image source={arrowBack} />
                  </ArrowContainer>
                  <Pagination
                    dotsLength={filteredList.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{ backgroundColor: "transparent" }}
                    dotStyle={{
                      width: 5,
                      height: 5,
                      borderRadius: 5,
                      backgroundColor: colors.blue01,
                    }}
                    inactiveDotStyle={
                      {
                        // Define styles for inactive dots here
                      }
                    }
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                  />
                  <ArrowContainer
                    onPress={(): void => carouselRef.current.snapToNext()}
                  >
                    <Image source={arrowFwd} />
                  </ArrowContainer>
                </PaginationWrapper>
              </CarouselContainer>
            </>
          ) : (
            <>
              <SectionTitleText>
                {search === "" && lastSearchedProducts.length > 0
                  ? "Últimas pesquisas"
                  : search !== "" &&
                    filteredList.length > 0 &&
                    `${filteredList.length} resultados encontrados`}
              </SectionTitleText>
              {search !== "" && (
                <>
                  <FilterText>Ordenar por:</FilterText>
                  <ButtonActions>
                    <OrderByButton
                      title="Menor preço"
                      color={orderFilters.price ? "green" : "secondary"}
                      size="extrasmall"
                      onPress={(): void =>
                        setOrderFilters({
                          price: !orderFilters.price,
                          distance: false,
                        })
                      }
                    />
                    <OrderByButton
                      title="Mais próximo"
                      color={orderFilters.distance ? "green" : "secondary"}
                      size="extrasmall"
                      onPress={(): void =>
                        setOrderFilters({
                          price: false,
                          distance: !orderFilters.distance,
                        })
                      }
                    />
                  </ButtonActions>
                </>
              )}
              {search === ""
                ? lastSearchedProducts.map((item) => {
                    return (
                      <CardWrapper
                        onPress={(): void => handleSearchChange(item.name)}
                      >
                        <CardBody>
                          <ProductImageWrapper>
                            <ProductImage
                              source={item.image}
                              resizeMode="contain"
                            />
                          </ProductImageWrapper>
                          <Details>
                            <Name>{item.name}</Name>
                            <Info>{item.info}</Info>
                            <Info>{item.info2}</Info>
                          </Details>
                          <Details>
                            <Price>R$ {item.price}</Price>
                            <PriceMessage>{item.priceMessage}</PriceMessage>
                          </Details>
                          {item.buyInfo.length > 0 && (
                            <AdditionalPricesWrapper>
                              <AdditionalPrices>
                                mais {item.buyInfo.length}{" "}
                                {item.buyInfo.length !== 1 ? "preços" : "preço"}
                              </AdditionalPrices>
                            </AdditionalPricesWrapper>
                          )}
                        </CardBody>
                      </CardWrapper>
                    );
                  })
                : filteredList.map((item) => {
                    return (
                      <CardWrapper
                        onPress={(): void => setSelectedProduct(item)}
                      >
                        <CardBody>
                          <ProductImageWrapper>
                            <ProductImage
                              source={item.image}
                              resizeMode="contain"
                            />
                          </ProductImageWrapper>
                          <Details>
                            <Name>{item.name}</Name>
                            <Info>{item.info}</Info>
                            <Info>{item.info2}</Info>
                          </Details>
                          <Details>
                            <Price>R$ {item.price}</Price>
                            <PriceMessage>{item.priceMessage}</PriceMessage>
                          </Details>
                          {item.buyInfo.length > 0 && (
                            <AdditionalPricesWrapper>
                              <AdditionalPrices>
                                mais {item.buyInfo.length}{" "}
                                {item.buyInfo.length !== 1 ? "preços" : "preço"}
                              </AdditionalPrices>
                            </AdditionalPricesWrapper>
                          )}
                        </CardBody>
                      </CardWrapper>
                    );
                  })}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
