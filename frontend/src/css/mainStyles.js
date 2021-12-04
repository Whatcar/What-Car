import styled from 'styled-components';
import { blue, black } from './colors';
import { maintitle, subtitle, body, menu } from './fonts';

export const MainTitle = styled.h2`
  ${maintitle};
  color: ${(props) => (props.blue ? blue.main : props.white ? 'white' : '')};
  margin-top: ${(props) => props.top && `${props.top}rem`};
  text-shadow: ${(props) => props.shadow && '0 5px 5px rgba(0,0,0,0.2)'};
`;

export const SubTitle = styled.h3`
  ${subtitle}
  text-align: ${(props) => props.center && 'center'};
  margin-top: ${(props) => props.top && `${props.top}rem`};
  color: ${(props) => props.dark && blue.dark};
`;

export const MainDesc = styled.p`
  ${menu}
  text-align: ${(props) => props.center && 'center'};
  margin-top: ${(props) => props.top && `${props.top}rem`};
  color: ${(props) => props.dark && blue.dark};
`;

export const Desc = styled.p`
  ${body}
  color: ${(props) => (props.highlight ? blue.main : props.dark ? blue.dark : black[900])};
  text-align: ${(props) => props.center && 'center'};
  margin-top: ${(props) => (props.top ? `${props.top}rem` : '')};
  cursor: ${(props) => props.pointer && 'pointer'};
`;
