import { css } from 'styled-components';

export const maintitle = css`
  font-size: 48px;
  line-height: 64px;
  font-family: 'SBAggroB';
  @media screen and (max-width: 480px) {
    font-size: 32px;
    line-height: 48px;
  }
`;

export const subtitle = css`
  font-size: 32px;
  line-height: 48px;
  font-family: 'SBAggroM';
  @media screen and (max-width: 480px) {
    font-size: 24px;
    line-height: 36px;
  }
`;

export const body = css`
  font-size: 16px;
  line-height: 30px;
  font-family: 'SBAggroL';
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 24px;
  }
`;

export const menu = css`
  font-size: 24px;
  line-height: 40px;
  font-family: 'SBAggroM';
`;

export const desc = css`
  font-size: 12px;
  line-height: 15px;
  font-family: 'SBAggroL';
`;
