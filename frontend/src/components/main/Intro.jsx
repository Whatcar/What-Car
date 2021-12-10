import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { MainTitle, SubTitle, Desc } from '../../css/mainStyles';
import { colors } from '../../css/theme';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useSrr from '../../utils/useSrr';
import HowTo from './HowTo';
import Loading from '../Loading';
import mainPerson from '../../img/main/mainperson.png';
import { BoxGrid, DescGrid, ImgGrid } from '../../css/IntroGrid';
import imageCompression from 'browser-image-compression';

export default function Intro({ swiper }) {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sent, setSent] = useState(false);
  const PATH = process.env.REACT_APP_BACKEND_URL;

  const compressImage = async (image) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
      };
      return await imageCompression(image, options);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeFile = async (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      const compressedImage = await compressImage(files[0]);
      setImgFile(compressedImage);
    }
    if (event.target.files.length) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          let base64Sub = base64.toString();
          setImgBase64([base64Sub]);
        }
      };
    }
  };

  const handleUploadImage = async () => {
    if (imgFile) {
      if (
        !['jpg', 'png', 'jpeg'].includes(
          imgFile.name.toLowerCase().split('.')[imgFile.name.split('.').length - 1],
        )
      ) {
        setImgFile(null);
        setImgBase64(null);
        return Swal.fire({
          title: '파일 형식을 확인해주세요!',
          text: '.jpg, .png 확장자만 업로드 할 수 있습니다.',
          icon: 'error',
          confirmButtonText: '넵!',
          confirmButtonColor: colors.blueM,
        });
      }
      setSent(true);
      const formData = new FormData();
      formData.append('file', imgFile);
      axios
        .post(`${PATH}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          setSent(false);
          if (res.status === 200) {
            navigate(`/result/${res.data.id}`);
          } else {
            Swal.fire({
              icon: 'error',
              title: '서버에 문제가 있나봐요!',
              text: '잠시 후에 다시 시도해주세요!',
              confirmButtonText: '넵!',
              confirmButtonColor: colors.blueM,
            });
          }
        })
        .catch((err) => {
          setSent(false);
          if (err.response.status === 409) {
            Swal.fire({
              icon: 'error',
              title: '자동차를 찾을 수 없어요!',
              text: '가이드라인에 맞추어 다시 업로드해주세요!',
              confirmButtonText: '넵!',
              confirmButtonColor: colors.blueM,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '다시 한 번 시도해주세요!',
              confirmButtonText: '넵!',
              confirmButtonColor: colors.blueM,
            });
          }
        });
    } else {
      Swal.fire({
        title: '엇, 아무 것도 없는 거 같아요.',
        icon: 'warning',
        text: '이미지를 가이드라인에 맞추어 업로드 해주세요!',
        confirmButtonColor: colors.blueM,
        confirmButtonText: '넵!',
      });
    }
  };
  return (
    <>
      <BoxGrid container columns={8} spacing={2}>
        <DescGrid item xs={8} md={4} lg={3}>
          <SubTitle {...useSrr('down', 1, 0.2)}>찰칵!</SubTitle>
          <MainTitle blue {...useSrr('down', 1, 0.5)}>
            저 차는 뭐징?
          </MainTitle>
          <Desc>
            사진을 업로드 해보세요! <br />
            왓카가 해당 차량의 정보를 알려드립니다.
          </Desc>
          <Description>
            *결과 링크를 제공하기 위해 업로드된 이미지는 왓카 서버에 24시간 동안 저장됩니다. 24시간
            후에는 관련 데이터가 모두 삭제되니 걱정하지 마세요!
          </Description>

          <InputDiv style={{ display: 'flex' }}>
            {imgBase64 && <img src={imgBase64} alt="이미지 미리보기" />}
            <div style={{ flexGrow: 1, margin: 'auto' }}>
              <label htmlFor="img-upload">
                <div>
                  <input
                    id="img-upload"
                    accept="image/jpg, image/png, image/jpeg"
                    type="file"
                    hidden
                    onChange={handleChangeFile}
                  />
                  <div>
                    <Desc pointer>+</Desc>
                    <Desc pointer>{imgFile ? '다시 고르기' : '이미지 추가하기'}</Desc>
                  </div>
                </div>
              </label>
            </div>
          </InputDiv>

          <ImageUploadButton
            variant="contained"
            sx={{ backgroundColor: imgFile ? colors.blueM : colors.blueD, color: 'white' }}
            onClick={handleUploadImage}
          >
            이미지 검색하기
          </ImageUploadButton>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Desc
              highlight
              onClick={handleOpen}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              사용법을 모르겠다면?
            </Desc>
            <Dialog
              open={open}
              onClose={handleClose}
              scroll={'paper'}
              sx={{ zIndex: 1050 }}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle
                style={{ textAlign: 'center', color: colors.blueM, fontFamily: 'SBAggroM' }}
              >
                어떻게 검색하나요?
              </DialogTitle>
              <DialogContent>
                <HowTo />
              </DialogContent>

              <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={handleClose} style={{ marginBottom: '0.5rem' }}>
                  이제 알겠어요!
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </DescGrid>
        <ImgGrid
          item
          xs={12}
          md={4}
          lg={5}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <MainImage src={mainPerson} />
        </ImgGrid>
        <Grid
          item
          xs={12}
          style={{
            order: 3,
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
            paddingLeft: '1rem',
          }}
        >
          <ScrollDiv onClick={() => swiper.slideTo(1)}>
            <span></span>더 알아보기
          </ScrollDiv>
        </Grid>
      </BoxGrid>
      <LoadingWrapper sent={sent}>
        <Loading />
      </LoadingWrapper>
    </>
  );
}

const scroll = keyframes`
    0% {
      transform: rotate(-45deg) translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotate(-45deg) translate(-20px, 20px);
      opacity: 0;
    }
`;

export const ScrollDiv = styled.div`
  padding-top: 70px;
  position: relative;
  color: ${({ theme }) => theme.colors.blueM};
  margin: 2rem auto 0;
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    margin: 1rem auto;
    padding-top: 0;
  }
  span {
    position: absolute;
    top: 0;
    left: 50%;
    width: 24px;
    height: 24px;
    margin-left: -12px;
    border-left: 1px solid ${({ theme }) => theme.colors.blueM};
    border-bottom: 1px solid ${({ theme }) => theme.colors.blueM};
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: ${scroll} 1.5s infinite;
    animation: ${scroll} 1.5s infinite;
    box-sizing: border-box;
  }
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 500px;
  display: block;
  margin-left: 2rem;
  @media screen and (max-width: 480px) {
    width: 80%;
    margin: auto;
  }
`;

const InputDiv = styled.div`
  width: 100%;
  border: 1px dotted #d9d9d9;
  background-color: #fafafa;
  margin: 0.5rem 0;
  text-align: center;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  img {
    width: 100px;
  }
`;

const ImageUploadButton = styled(Button)({
  width: '100%',
});

const Description = styled.p`
  ${({ theme }) => theme.fontStyle.desc};
  color: ${({ theme }) => theme.colors.blueM};
  margin-top: 0.5rem;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  transition: opacity 0.5s ease;
  display: ${(props) => (props.sent ? 'flex' : 'none')};
  opacity: ${(props) => (props.sent ? 1 : 0)};
  justify-content: center;
  align-items: center;
`;
