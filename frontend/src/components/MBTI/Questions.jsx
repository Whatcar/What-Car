import styled from 'styled-components';
import { Desc } from '../../css/mainStyles';
import campingCar from '../../img/mbti/campingCar.svg';
import carbti1 from '../../img/mbti/carbti1.png';
import carbti2 from '../../img/mbti/carbti2.png';
import carbti3 from '../../img/mbti/carbti3.png';
import carbti4 from '../../img/mbti/carbti4.png';

export default function Questions({ item, progress, answer, setAnswer }) {
  console.log(progress, answer, item);
  const handleClick = (num) => {
    setAnswer({ ...answer, [progress]: num });
  };
  return (
    <QnA>
      <Question>
        Q{progress + 1}. {item.q}
      </Question>

      <Answers>
        <Answer clicked={answer[progress] === 1} onClick={() => handleClick(1)}>
          <Img src={imgOrder[progress][1]} />
          <Desc highlight={answer[progress] === 1} top={2}>
            {item.a.a1.a}
          </Desc>
        </Answer>
        <Answer clicked={answer[progress] === 2} onClick={() => handleClick(2)}>
          <Img src={imgOrder[progress][2]} />
          <Desc highlight={answer[progress] === 2} top={2}>
            {item.a.a2.a}
          </Desc>
        </Answer>
        {item.a.a3.a && (
          <Answer clicked={answer[progress] === 3} onClick={() => handleClick(3)}>
            <Img src={imgOrder[progress][3]} />
            <Desc highlight={answer[progress] === 3} top={2}>
              {item.a.a3.a}
            </Desc>
          </Answer>
        )}
      </Answers>
    </QnA>
  );
}

const Question = styled.div`
  ${({ theme }) => theme.fontStyle.menu};
  margin: 1rem 0;
  text-align: start;
`;

const QnA = styled.div`
  text-align: center;
`;

const Answers = styled.div`
  display: flex;
  justify-content: space-evenly;
  column-gap: 1rem;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    row-gap: 1rem;
  }
`;

const Answer = styled.div`
  width: 50%;
  text-align: center;
  border: ${(props) =>
    props.clicked
      ? `2px solid ${props.theme.colors.blueL}`
      : `2px solid ${props.theme.colors.black300}`};
  border-radius: 15px;
  padding: 3rem 2rem;
  box-sizing: border-box;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    img {
      display: none;
    }
    width: 100%;
    min-height: 100px;
    p {
      margin: 0;
    }
    box-sizing: border-box;
  }
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  }
`;

const Img = styled.img`
  width: 50%;
`;

const imgOrder = {
  0: { 1: carbti1, 2: carbti3 },
  1: { 1: carbti2, 2: carbti3 },
  2: { 1: carbti2, 2: carbti4 },
  3: { 1: carbti4, 2: carbti3 },
  4: { 1: carbti2, 2: carbti1 },
  5: { 1: carbti1, 2: carbti4 },
  6: { 1: carbti4, 2: carbti2 },
  7: { 1: carbti2, 2: carbti3, 3: carbti1 },
};
