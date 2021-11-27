const pixelToRem = (size) => `${size / 16}rem`;

const colors = {
  blueM: '#2195F2',
  blueL: '#6EC5FF',
  blueD: '#0068BF',
  black900: '#212121',
  black300: '#E0E0E0',
  kakaocolor: '#f7e600',
  whiteM: '#ffffff',
  whiteD: '#999999',
};

const fontSize = {
  M: pixelToRem(16),
  L: pixelToRem(24),
  XL: pixelToRem(32),
  XXL: pixelToRem(48),
  S: pixelToRem(14),
  XS: pixelToRem(12),
};

const fontStyle = {
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
  line-height: 30px;
  font-family: 'SBAggroL';
`,
  menu: `
  font-size: ${fontSize.L};
  line-height: 40px;
  font-family: 'SBAggroM';
`,
  desc: `
  font-size: ${fontSize.S};
  line-height: 15px;
  font-family: 'SBAggroL';
`,
};

export const mainTheme = {
  colors,
  fontSize,
  fontStyle,
};
