import styled from "styled-components/native";

import Button from "../../components/Button";
import colors from "../../config/colors";

interface InfoProps {
  color?: "blue" | "green";
  align?: "left" | "center" | "right";
}

interface DetailsProps {
  size?: string;
}

export const ArrowContainer = styled.TouchableOpacity.attrs({
  underlayColor: "transparent",
})`
  width: 40px;
  width: 40px;
`;

export const CarouselContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;

export const CarouselItemWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CarouselImage = styled.Image`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CarouselText = styled.Text`
  font-size: 14px;
  color: ${colors.black};
  font-weight: bold;
  margin-top: 75px;
  text-align: center;
  margin-bottom: 30px;
`;

export const PaginationWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 85px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
`;

export const SectionTitleText = styled.Text`
  font-size: 15px;
  color: ${colors.black};
  font-weight: bold;
  margin: 15px 0 25px 10px;
  width: 100%;
  text-align: left;
`;

export const ButtonActions = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

export const FilterText = styled.Text`
  font-size: 14px;
  color: ${colors.black};
  margin: 0 0 8px 10px;
  width: 100%;
  text-align: left;
`;

export const OrderByButton = styled(Button)`
  height: 30px;
  width: 120px;
  margin: 0 5px;
`;

export const SearchContainer = styled.View`
  padding: 0 30px 0 10px;
  margin: 30px 0 10px 0;
`;

export const CardWrapper = styled.TouchableOpacity.attrs({
  underlayColor: colors.white,
})`
  background-color: transparent;
`;

export const CardBody = styled.View`
  background: ${colors.white};
  border-radius: 24px;
  height: 100px;
  width: 90%;
  elevation: 1;
  box-shadow: 0px 3px 3px #00000029;
  margin: 0 0 30px 30px;
  padding: 20px 20px 20px 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductImageWrapper = styled.View`
  position: absolute;
  left: -30px;
  top: 8px;
  elevation: 1;
  box-shadow: 0px 3px 8px #00000029;
`;

export const ProductImage = styled.Image`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Details = styled.View<DetailsProps>`
  flex: ${({ size }): string => size || "1"};
`;

export const Name = styled.Text`
  font-size: 14px;
  color: ${colors.black};
  font-weight: bold;
`;

export const Info = styled.Text<InfoProps>`
  font-size: ${({ color }): string =>
    color === "blue" ? "15px" : color === "green" ? "10px" : "12px"};
  color: ${({ color }): string =>
    color === "blue"
      ? colors.blue01
      : color === "green"
      ? colors.green
      : colors.black};
  opacity: ${({ color }): string => (color ? "1" : "0.5")};
  margin-top: 5px;
  text-align: ${({ align }): string => align || "left"};
`;

export const Price = styled.Text`
  font-size: 15px;
  color: ${colors.blue01};
  font-weight: bold;
  text-align: right;
`;

export const PriceMessage = styled.Text`
  font-size: 10px;
  color: ${colors.green};
  text-align: right;
`;

export const AdditionalPricesWrapper = styled.View`
  position: absolute;
  bottom: -10px;
  right: 20px;
  background-color: ${colors.blue01};
  padding: 5px 15px;
  border-radius: 16px;
`;

export const AdditionalPrices = styled.Text`
  font-size: 14px;
  color: ${colors.white};
`;

export const StoreLinkButton = styled(Button)`
  height: 30px;
  width: 80px;
  margin: 5px 0 0 0;
  padding: 5px 15px;
  border-radius: 16px;
`;
