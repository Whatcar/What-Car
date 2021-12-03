import React from 'react';
import Layout from '../components/Layout';
import MainTemplate from '../components/worldcup/MainTemplate';

export default function MBTI() {
  return (
    <Layout>
      <MainTemplate
        mainDesc="나의 운전 성향과 찰떡인 차 브랜드는?"
        subDesc="운전 성향을 검사하고, 나와 어울리는 차 브랜드가 무엇인지 알아봐요!"
        linkTo="test"
        page="mbti"
      />
    </Layout>
  );
}
