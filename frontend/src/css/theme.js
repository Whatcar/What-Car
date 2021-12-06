const pixelToRem = (size) => `${size / 16}rem`;

export const colors = {
  blueM: '#2195F2',
  blueL: '#6EC5FF',
  blueD: '#0068BF',
  blueBG: 'EAF6FF',
  black900: '#212121',
  black500: '#9e9e9e',
  black300: '#E0E0E0',
  kakaocolor: '#f7e600',
  whiteM: '#ffffff',
  whiteD: '#999999',
};

export const fontSize = {
  M: pixelToRem(16),
  L: pixelToRem(24),
  XL: pixelToRem(32),
  XXL: pixelToRem(48),
  S: pixelToRem(14),
  XS: pixelToRem(12),
};

export const fontStyle = {
  mainTitle: `
  font-size: ${fontSize.XXL};
  line-height: 64px;
  font-family: 'SBAggroB';
`,
  subTitle: `
  font-size: ${fontSize.XL};
  line-height: 48px;
  font-family: 'SBAggroM';
`,
  body: `
  font-size: ${fontSize.M};
  line-height: 24px;
  font-family: 'SBAggroL';
`,
  menu: `
  font-size: ${fontSize.L};
  line-height: 40px;
  font-family: 'SBAggroM';
`,
  desc: `
  font-size: ${fontSize.S};
  line-height: 18px;
  font-family: 'SBAggroL';
`,
};

export const mainTheme = {
  colors,
  fontSize,
  fontStyle,
};
