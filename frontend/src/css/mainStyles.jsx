import styled from 'styled-components';
import { blue, black } from './colors';
import { maintitle, subtitle, body } from './fonts';

export const MainTitle = styled.h2`
  ${maintitle};
  color: ${(props) => props.blue && blue.main};
  margin-top: ${(props) => props.top && `${props.top}rem`};
`;

export const SubTitle = styled.h3`
  ${subtitle}
  text-align: ${(props) => props.center && 'center'};
  margin-top: ${(props) => props.top && `${props.top}rem`};
`;

export const Desc = styled.p`
  ${body}
  color: ${(props) => (props.highlight ? blue.main : black[900])};
  text-align: ${(props) => props.center && 'center'};
  margin-top: ${(props) => (props.top ? `${props.top}rem` : '')};
  cursor: ${(props) => props.pointer && 'pointer'};
`;
