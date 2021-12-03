import React from 'react';
import Layout from '../components/Layout';
import MainTemplate from '../components/worldcup/MainTemplate';

export default function Worldcup() {
  return (
    <Layout>
      <MainTemplate
        mainDesc="외관만큼은 내 이상형인 차는?"
        subDesc="브랜드, 가격, 연식 기준 다~ 내려놓고, 오직 외관만 보고 이상형을 찾아봐요!"
        linkTo="test"
      />
    </Layout>
  );
}
