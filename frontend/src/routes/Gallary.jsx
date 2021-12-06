import React, { useEffect, useState, useMemo, useRef } from 'react';
import Layout from '../components/Layout';
import { MainTitle, Desc } from '../css/mainStyles';
import { ImageList, ImageListItem, Button, ImageListItemBar, IconButton } from '@mui/material';
import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useInfinity from '../utils/useInfinity';
import Swal from 'sweetalert2';
import axios from 'axios';

const fakeFetch = (delay = 1000) => new Promise((res) => setTimeout(res, delay));

export default function Gallary() {
  // const [data, setData] = useState(itemData);
  const [state, setState] = useState({ item: itemData, isLoading: false });
  console.log('맨 바깥');
  // const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const refs = useMemo(() => state.item.map(() => React.createRef()), [state.item]);

  const handleDelete = async (idx) => {
    alert('삭제?');
    const temp = [...state.item];
    temp.splice(idx, 1);
    setState((prev) => ({ ...prev, item: temp }));
  };

  const fetchItems = async () => {
    // setLoading(true);
    setState((prev) => ({ ...prev, isLoading: true }));
    await fakeFetch();
    // setData((prev) => [...prev, ...itemData]);
    // setLoading(false);
    setState((prev) => ({ item: prev.item.concat(itemData), isLoading: false }));
  };

  const [_, setRef] = useInfinity(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});

  useEffect(() => {
    let imgStack = [0, 0, 0];
    let colWidth = 250;
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
    console.log('useEffect 내부');
  }, [state.item]);

  return (
    <Layout style={{ marginBottom: '2rem' }}>
      <MainTitle style={{ textAlign: 'center' }}>갤러리</MainTitle>
      <Desc center>
        다른 유저들이 올린 차량을 볼 수 있는 페이지예요! 이미지로 자동차를 검색하고 함께
        공유해보세요.
      </Desc>
      <GridWrapper ref={imageRef}>
        {state.item.map((item, index) => (
          <ItemWrapper ref={refs[index]} key={`${item.title}-${index}`}>
            <img src={item.img} loading="lazy" style={{ width: '100%', position: 'relative' }} />
            <ItemDesc>
              <ItemTop>
                <div>김머선</div>
                <CloseRoundedIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(index)} />
              </ItemTop>
              <ItemDetail>
                <Desc style={{ color: 'white' }}>{item.title}</Desc>
                <p style={{ marginBottom: '0.5rem' }}>97% 일치</p>

                <Button
                  variant="outlined"
                  color="white"
                  onClick={() => alert('결과 페이지로 이동하기')}
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
            <img src={item.img} loading="lazy" style={{ width: '100%', position: 'relative' }} />
            <ItemDesc>
              <ItemTop>
                <div>김머선</div>
                <CloseRoundedIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete()} />
              </ItemTop>
              <ItemDetail>
                <Desc style={{ color: 'white' }}>{item.title}</Desc>
                <p style={{ marginBottom: '0.5rem' }}>97% 일치</p>

                <Button
                  variant="outlined"
                  color="white"
                  onClick={() => alert('결과 페이지로 이동하기')}
                >
                  차 보러가기
                </Button>
              </ItemDetail>
            </ItemDesc>
          </ItemWrapper>
        ))}
      </MobileWrapper>
      {state.isLoading && <div style={{ width: '100%', height: '50vh' }}>로딩중...</div>}
      {!state.isLoading && <div ref={setRef} style={{ width: '100%', height: '150px' }}></div>}
      {/* <ImageWrapper>
        <ImageList variant="masonry" cols={window.innerWidth >= 480 ? 3 : 2} gap={12}>
          {data.map((item, idx) => (
            <ImageListItem
              key={`${item.img}${idx}`}
              style={{ borderRadius: '0.5rem', overflow: 'hidden' }}
            >
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />

              <StyledImageListItemBar
                sx={{ padding: '0.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}
                title={item.title}
                subtitle={'인식률 97%'}
                position="bottom"
                actionIcon={
                  <Button
                    variant="outlined"
                    color="white"
                    onClick={() => alert('결과 페이지로 이동하기')}
                  >
                    차 보러가기
                  </Button>
                }
              />
              <ImageListItemBar
                sx={{ backgroundColor: 'rgba(0,0,0,0)' }}
                actionIcon={
                  <IconButton
                    onClick={() => alert('delete?')}
                    sx={{ color: 'rgba(255,255,255,0.2)' }}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                }
                position="top"
                actionPosition="right"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <div ref={setRef} style={{ border: '1px solid black' }}>
          {loading && 'Loading...'}
        </div>
      </ImageWrapper> */}
    </Layout>
  );
}

const GridWrapper = styled.div`
  display: none;
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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];
