import styled from "styled-components/native";

import colors from "../../../../../config/colors";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.View`
  display: flex;
  align-items: center;
  height: auto;
  width: 90%;
  background-color: ${colors.white};
  position: relative;
  border-radius: 40px;
  padding: 10px 15px 30px 15px;
`;

export const Page = styled.Text`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 12px;
  font-weight: 500;
  color: ${colors.grayBG};
`;

export const Footer = styled.View`
  display: flex;
  width: 90%;
  height: auto;
  margin: 30px 0;
`;
