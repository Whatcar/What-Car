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
          title: '?????? ????????? ??????????????????!',
          text: '.jpg, .png ???????????? ????????? ??? ??? ????????????.',
          icon: 'error',
          confirmButtonText: '???!',
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
              title: '????????? ????????? ????????????!',
              text: '?????? ?????? ?????? ??????????????????!',
              confirmButtonText: '???!',
              confirmButtonColor: colors.blueM,
            });
          }
        })
        .catch((err) => {
          setSent(false);
          if (err.response.status === 409) {
            Swal.fire({
              icon: 'error',
              title: '???????????? ?????? ??? ?????????!',
              text: '?????????????????? ????????? ?????? ?????????????????????!',
              confirmButtonText: '???!',
              confirmButtonColor: colors.blueM,
            });
          } else if (err.response.status === 403) {
            Swal.fire({
              icon: 'error',
              title: '???????????? ????????? ?????? ??? ?????????!',
              text: '????????? ???????????? ??? ??????????????? ???????????????.',
              confirmButtonText: '????????????!',
              confirmButtonColor: colors.blueM,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '?????? ??? ??? ??????????????????!',
              confirmButtonText: '???!',
              confirmButtonColor: colors.blueM,
            });
          }
        });
    } else {
      Swal.fire({
        title: '???, ?????? ?????? ?????? ??? ?????????.',
        icon: 'warning',
        text: '???????????? ?????????????????? ????????? ????????? ????????????!',
        confirmButtonColor: colors.blueM,
        confirmButtonText: '???!',
      });
    }
  };
  return (
    <>
      <BoxGrid container columns={8} spacing={2}>
        <DescGrid item xs={8} md={4} lg={3}>
          <SubTitle {...useSrr('down', 1, 0.2)}>??????!</SubTitle>
          <MainTitle blue {...useSrr('down', 1, 0.5)}>
            ??? ?????? ???????
          </MainTitle>
          <Desc>
            ????????? ????????? ????????????! <br />
            ????????? ?????? ????????? ????????? ??????????????????.
          </Desc>
          <Description>
            *?????? ????????? ???????????? ?????? ???????????? ???????????? ??????????????? ?????? ????????? ???????????????. 2~3???
            ????????? ?????? ???????????? ?????? ???????????? ???????????? ?????????!
          </Description>

          <InputDiv style={{ display: 'flex' }}>
            {imgBase64 && <img src={imgBase64} alt="????????? ????????????" />}
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
                    <Desc pointer>{imgFile ? '?????? ?????????' : '????????? ????????????'}</Desc>
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
            ????????? ????????????
          </ImageUploadButton>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Desc
              highlight
              onClick={handleOpen}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              ???????????? ????????????????
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
                ????????? ????????????????
              </DialogTitle>
              <DialogContent>
                <HowTo />
              </DialogContent>

              <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={handleClose} style={{ marginBottom: '0.5rem' }}>
                  ?????? ????????????!
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
            <span></span>??? ????????????
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
