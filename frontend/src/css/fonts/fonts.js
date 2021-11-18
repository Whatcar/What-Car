import { createGlobalStyle } from 'styled-components';
import SBAggroB from './SBAggroB.woff';
import SBAggroM from './SBAggroM.woff';
import SBAggroL from './SBAggroL.woff';

export default createGlobalStyle`
    @font-face {
        font-family: "SBAggroB";
        src: local("SBAggroB"), url(${SBAggroB}) format('woff');
    }

    @font-face {
        font-family: "SBAggroM";
        src: local("SBAggroM"), url(${SBAggroM}) format('woff');
    }

    @font-face {
        font-family: "SBAggroL";
        src: local("SBAggroL"), url(${SBAggroL}) format('woff');
    }
`;
