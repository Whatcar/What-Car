import styled from 'styled-components';

export const MainTitle = styled.h2`
  ${({ theme }) => theme.fontStyle.mainTitle};
  color: ${(props) =>
    props.blue ? ({ theme }) => theme.colors.blueM : props.white ? 'white' : ''};
  margin-top: ${(props) => props.top && `${props.top}rem`};
  text-shadow: ${(props) => props.shadow && '0 5px 5px rgba(0,0,0,0.2)'};
`;

export const SubTitle = styled.h3`
  ${({ theme }) => theme.fontStyle.subTitle};
  text-align: ${(props) => props.center && 'center'};
  margin-top: ${(props) => props.top && `${props.top}rem`};
  color: ${(props) => props.dark && (({ theme }) => theme.colors.blueD)};
`;

export const MainDesc = styled.p`
  ${({ theme }) => theme.fontStyle.menu};
  text-align: ${(props) => props.center && 'center'};
  margin-top: ${(props) => props.top && `${props.top}rem`};
  color: ${(props) => props.dark && (({ theme }) => theme.colors.blueD)};
`;

export const Desc = styled.p`
  ${({ theme }) => theme.fontStyle.body};
  color: ${(props) =>
    props.highlight
      ? ({ theme }) => theme.colors.blueM
      : props.dark
      ? ({ theme }) => theme.colors.blueD
      : ({ theme }) => theme.colors.black900};
  text-align: ${(props) => props.center && 'center'};
  margin-top: ${(props) => (props.top ? `${props.top}rem` : '')};
  cursor: ${(props) => props.pointer && 'pointer'};
`;
