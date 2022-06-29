import styled from "styled-components/native";

interface Props {
  row?: boolean;
}

export const Container = styled.View<Props>`
  display: flex;
  flex-direction: ${({ row }): string => (row ? "row" : "column")};
  margin-top: 25px;
  width: 100%;
`;
