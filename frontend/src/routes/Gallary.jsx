import React, { useEffect, useState, useMemo, useRef } from 'react';
import Layout from '../components/Layout';
import { MainTitle, Desc } from '../css/mainStyles';
import { ImageList, ImageListItem, Button, ImageListItemBar, IconButton } from '@mui/material';
import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useInfinity from '../utils/useInfinity';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../components/Loading';
import { colors } from '../css/theme';
import { useNavigate } from 'react-router';

export default function Gallary() {
  const [state, setState] = useState({ item: [], isLoading: false });
  const [loadable, setLoadable] = useState(true);
  let num = 0;
  const navigate = useNavigate();
  const imageRef = useRef();
  const refs = useMemo(() => state.item.map(() => React.createRef()), [state.item]);
  const PATH = process.env.REACT_APP_BACKEND_URL;
  const LIMITS = 2;

  const handleDelete = async (idx, id) => {
    const temp = [...state.item];
    Swal.fire({
      title: '비밀번호를 입력해주세요!',
      html: `
      <input type="password" id="password" class="swal2-input" placeholder="비밀번호">`,
      confirmButtonText: '지우기',
      confirmButtonColor: colors.blueM,
      showCancelButton: true,
      cancelButtonText: '안 지울래요',
      focusConfirm: false,
      preConfirm: () => {
        const password = Swal.getPopup().querySelector('#password').value;
        if (!password) {
          Swal.showValidationMessage(`비밀번호를 입력해주세요!`);
        }
        return axios
          .delete(`${PATH}/api/gallary`, {
            data: { gallary_id: id, password: password },
          })
          .then((res) => {
            console.log(res);
            if (res.status !== 200) {
              throw new Error(res.data);
            }
          })
          .catch((err) => {
            Swal.showValidationMessage(`요청 실패: ${err}`);
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        temp.splice(idx, 1);
        setState((prev) => ({ ...prev, item: temp }));
        Swal.fire({
          icon: 'success',
          title: '성공적으로 삭제되었습니다!',
          confirmButtonText: '넵!',
          confirmButtonColor: colors.blueM,
        });
      } else {
        Swal.fire({
          icon: 'question',
          title: '삭제하지 않으시나요?',
          confirmButtonText: '넵!',
          confirmButtonColor: colors.blueM,
        });
      }
    });
  };

  const fetchNew = async () => {
    console.log('renewed', num);
    setState((prev) => ({ ...prev, isLoading: true }));
    axios
      .get(`${PATH}/api/gallary`, {
        params: { offset: num, limit: LIMITS },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.result_num === 0) {
            return setLoadable(false);
          }
          setState((prev) => ({ ...prev, item: prev.item.concat(res.data.cars) }));
          num += LIMITS;
        }
        setTimeout(() => setState((prev) => ({ ...prev, isLoading: false })), 1000);
      });
  };

  useEffect(() => {
    console.log(state.item);
  }, [state.item]);

  const [_, setRef] = useInfinity(async (entry, observer) => {
    if (entry.isIntersecting && !state.isLoading) {
      observer.unobserve(entry.target);
      await fetchNew();
      observer.observe(entry.target);
    }
  }, {});

  useEffect(() => {
    console.log('initial');
    axios
      .get(`${PATH}/api/gallary`, {
        params: { offset: 0, limit: LIMITS },
      })
      .then((res) => {
        setState((prev) => ({ ...prev, item: res.data.cars }));
        num += LIMITS;
      });
  }, []);

  useEffect(() => {
    console.log('useEffect');
    let imgStack = [0, 0, 0];
    let colWidth = 250;
    setTimeout(() => {
      for (let i = 0; i < refs.length; i++) {
        let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        let x = colWidth * minIndex;
        let y = imgStack[minIndex];
        imgStack[minIndex] += refs[i].current.children[0].height + 20;
        refs[i].current.style.transform = `translateX(${x}px) translateY(${y}px)`;
        if (i === refs.length - 1) {
          imageRef.current.style.height = `${Math.max.apply(0, imgStack)}px`;
        }
      }
    }, 1000);
  }, [state.item]);

  return (
    <Layout>
      <MainTitle style={{ textAlign: 'center' }}>갤러리</MainTitle>
      <Desc center>
        다른 유저들이 올린 차량을 볼 수 있는 페이지예요! 이미지로 자동차를 검색하고 함께
        공유해보세요.
      </Desc>
      <GridWrapper ref={imageRef}>
        {state.item.map((item, index) => (
          <ItemWrapper ref={refs[index]} key={`${item.title}-${index}`}>
            <img
              src={item.car_url}
              loading="lazy"
              style={{ width: '100%', position: 'relative' }}
            />
            <ItemDesc>
              <ItemTop>
                <div>{item.nickname}</div>
                <CloseRoundedIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(index, item.gallary_id)}
                />
              </ItemTop>
              <ItemDetail>
                <Desc style={{ color: 'white' }}>{item.title}</Desc>
                <p style={{ marginBottom: '0.5rem' }}>{(item.similarity * 100).toFixed(2)}% 일치</p>

                <Button
                  variant="outlined"
                  color="white"
                  onClick={() => navigate(`/search/detail/${item.car_id}`)}
                >
                  차 보러가기
                </Button>
              </ItemDetail>
            </ItemDesc>
          </ItemWrapper>
        ))}
      </GridWrapper>
      <MobileWrapper>
        {state.item.map((item, index) => (
          <ItemWrapper mobile key={`mobile-${item.title}-${index}`}>
            <img
              src={item['car_url']}
              loading="lazy"
              style={{ width: '100%', position: 'relative' }}
            />
            <ItemDesc>
              <ItemTop>
                <div>{item.nickname}</div>
                <CloseRoundedIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(index, item.gallary_id)}
                />
              </ItemTop>
              <ItemDetail>
                <Desc style={{ color: 'white' }}>{item.title}</Desc>
                <p style={{ marginBottom: '0.5rem' }}>{item.similarity} 일치</p>

                <Button
                  variant="outlined"
                  color="white"
                  onClick={() => alert('결과 페이지로 이동하기', item['car_id'])}
                >
                  차 보러가기
                </Button>
              </ItemDetail>
            </ItemDesc>
          </ItemWrapper>
        ))}
      </MobileWrapper>
      {loadable ? (
        state.isLoading ? (
          <div style={{ width: '100%', height: '50vh' }}>
            <Loading />
          </div>
        ) : (
          <div
            ref={setRef}
            style={{ width: '100%', height: '100px', border: '1px solid black' }}
          ></div>
        )
      ) : (
        <div style={{ textAlign: 'center' }}>더이상 불러올 이미지가 없어요!</div>
      )}
    </Layout>
  );
}

const GridWrapper = styled.div`
  display: none;
  min-height: 70vh;
  @media screen and (min-width: 480px) {
    max-width: 730px;
    margin: 3rem auto 0;
    height: 80vh;
    display: block;
  }
`;

const MobileWrapper = styled.div`
  display: none;
  @media screen and (max-width: 480px) {
    width: 100%;
    display: block;
  }
`;

const ItemWrapper = styled.div`
  display: inline-block;
  position: ${(props) => (props.mobile ? 'relative' : 'absolute')};
  width: ${(props) => (props.mobile ? '100%' : '230px')};
  box-sizing: content-box;
  border-radius: 1rem;
`;

const ItemDesc = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 5px;

  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  justify-content: space-between;
  transition: opacity 0.5s ease;
  color: white;
  &:hover {
    opacity: 1;
  }
`;

const ItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
`;

const ItemDetail = styled.div`
  box-sizing: border-box;
  button {
    width: 100%;
    color: white;
  }
`;

const Image = styled.div`
  margin: 0.5rem;
  img {
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 750px;
  .MuiImageList-masonry {
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
  margin: 3rem auto 0;
`;

const StyledImageListItemBar = styled(ImageListItemBar)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: none;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: all 0.5s ease;
  }

  .MuiImageListItemBar-title {
    text-shadow: 0 2px 0.2rem rgba(37, 22, 22, 0.7);
    margin: 0;
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
  }
  .MuiImageListItemBar-subtitle {
    line-height: 1rem;
    text-shadow: 0 1px 0.2rem rgba(37, 22, 22, 0.7);
    @media screen and (max-width: 480px) {
      font-size: 0.4rem;
      line-height: 0.5rem;
    }
  }
  .MuiImageListItemBar-titleWrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-self: flex-start;
    padding: 8px 12px;
  }

  .MuiImageListItemBar-actionIcon {
    align-self: center;
    width: 90%;

    button {
      margin: 0.5rem 0;
      width: 100%;
      @media screen and (max-width: 480px) {
        margin: 0;
        font-size: 0.5rem;
      }
    }
  }
`;
