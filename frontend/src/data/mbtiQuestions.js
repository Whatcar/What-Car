const questions = [
  {
    q: '가장 친한 친구가 차를 장만한다고 한다. 이때 당신의 선택은?',
    a: {
      a1: {
        a: '"중고차는 아무래도 불안하니깐 기왕이면 믿음직스러운 신차를 사렴"',
        type: ['ENFJ', 'ENTJ', 'ENTP', 'ESFJ', 'ESTJ', 'INFJ', 'ISFP'],
      },
      a2: {
        a: '"신차보단 중고차가 조금이라도 가격이 떨어지니까 합리적인 가격을 위해 중고차를 사렴"',
        type: ['ENFP', 'ESFP', 'ESTP', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISTJ', 'ISTP'],
      },
      a3: { a: '', type: [] },
    },
  },
  {
    q: '친구들끼리 여름휴가를 갈 때 차를 렌트하고자 한다. 이때 당신의 선택은?',
    a: {
      a1: {
        a: '"기분 좋게 여행 가는 건데 기왕이면 폼 나게 외제차나 오픈카 타자"',
        type: ['ENFP', 'ENTP', 'ESFP', 'ESTP', 'INFP', 'ISFP'],
      },
      a2: {
        a: '"우리 예산과 조건에 맞춰 거기에 맞는 차를 타자"',
        type: ['ENFJ', 'ENTJ', 'ESFJ', 'ESTJ', 'INFJ', 'INTJ', 'INTP', 'ISFJ', 'ISTJ', 'ISTP'],
      },
      a3: { a: '', type: [] },
    },
  },
  {
    q: '운전 중 사고가 났지만 크게 다친 사람이 있진 않다. 이때 당신의 선택은?',
    a: {
      a1: {
        a: '"사람이 다친 것도 아니니 저희끼리 협의하고 끝내죠!"',
        type: ['ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESFJ', 'ESFP', 'INFJ', 'INFP', 'INTJ', 'ISFP'],
      },
      a2: {
        a: '"보험 있으세요? 일단 제 보험사 연락해볼게요!"',
        type: ['ESTJ', 'ESTP', 'INTP', 'ISFJ', 'ISTJ', 'ISTP'],
      },
      a3: { a: '', type: [] },
    },
  },
  {
    q: '운전면허시험에 합격하고 드디어 내 차를 장만하려고 한다. 이때 당신의 선택은?',
    a: {
      a1: {
        a: '"기왕 탈 거면 내가 좋아하는 컬러의 색을 고를래!"',
        type: ['ENFP', 'ENTP', 'ESFP', 'ESTP', 'INFP', 'ISFJ'],
      },
      a2: {
        a: '"나중에 되팔 거 생각하면 제일 잘 팔리는 무채색이 합리적인 거 같아!"',
        type: ['ENFJ', 'ENTJ', 'ESFJ', 'ESTJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISTJ', 'ISTP'],
      },
      a3: { a: '', type: [] },
    },
  },
  {
    q: '친구가 내 차에 실수로 음식을 흘렸다. 이때 당신의 선택은?',
    a: {
      a1: {
        a: '"괜찮아, 나중에 세차하면 되지 뭐! 걱정 마~"',
        type: ['ENFJ', 'ENFP', 'ESFJ', 'ESFP', 'ESTP', 'INFJ', 'INFP', 'ISFJ', 'ISFP', 'ISTP'],
      },
      a2: {
        a: '"이거 청소하려면 세차까지 해야겠는데… 나중에 세차하게 세차비 조금만 보태줘~"',
        type: ['ENTJ', 'ENTP', 'ESTJ', 'INTJ', 'INTP', 'ISTJ'],
      },
      a3: { a: '', type: [] },
    },
  },
  {
    q: '친구와 함께 드라이브를 하던 중 노래를 틀어달라고 한다. 이때 당신의 선택은?',
    a: {
      a1: {
        a: '"너네 이거 들어봤어? 내가 요즘 자주 듣는 노래야!"',
        type: ['ENTJ', 'ESTJ', 'INFP', 'INTJ', 'ISFJ', 'ISTJ'],
      },
      a2: {
        a: '"오늘처럼 화창한 날엔 다들 뭔지 알지? 신나는 노래 가자!"',
        type: ['ENFJ', 'ENFP', 'ENTP', 'ESFJ', 'ESFP', 'ESTP', 'INFJ', 'INTP', 'ISFP', 'ISTP'],
      },
      a3: { a: '', type: [] },
    },
  },
  {
    q: '아끼던 차를 팔 때가 됐다. 이때 당신의 선택은?',
    a: {
      a1: {
        a: '"꼼꼼히 따져보고 기왕이면 합리적인 가격으로 팔자! 일단 커뮤니티에 글을 올려보자!”',
        type: ['ESFJ', 'ESFP', 'INFP', 'INTP', 'ISFJ', 'ISTJ'],
      },
      a2: {
        a: '“시간도 없는데 번거롭게 일 늘리지 말고 전문가에게 맡기자!”',
        type: ['ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESTJ', 'ESTP', 'INFJ', 'INTJ', 'ISFP', 'ISTP'],
      },
      a3: { a: '', type: [] },
    },
  },
  {
    q: '앞차가 규정 속도보다 느리게 갈 때',
    a: {
      a1: {
        a: '"교통체증이 화를 낸다고 해결이 되나?"',
        type: ['ENFJ', 'ENTP', 'INFJ', 'INFP', 'ISTJ'],
      },
      a2: {
        a: '"사고가 나거나 공사중일 수 있으니 기다려보자"',
        type: ['ESFP', 'ESTJ', 'ISFJ', 'ISFP', 'ISTP'],
      },
      a3: {
        a: '"앞에 참 느긋하고 여유 넘쳐 보여서 좋네"',
        type: ['ENFP', 'ENTJ', 'ESFJ', 'ESTP', 'INTJ', 'INTP'],
      },
    },
  },
];

export default questions;
