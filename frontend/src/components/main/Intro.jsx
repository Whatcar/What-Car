import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Button } from '@mui/material';
import MainImg from '../../img/main/main_img.svg';
import { blue, black } from '../../css/colors';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { MainTitle, SubTitle, Desc } from '../../css/mainStyles';

export default function Intro() {
  const [imgFile, setImgFile] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const handleChangeFile = (event) => {
    setImgFile(event.target.files);
    if (event.target.files) {
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
    // TODO: 파일 형식 및 파일 크기 체크하기
    if (imgFile) {
      // TODO: FormData로 보내기
      alert('전송중...');
      // TODO: 응답 받고 결과 페이지로 리다이렉트
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6} img>
          <MainImage src={MainImg} />
        </Grid>
        <Grid item xs={12} md={6} lg={6} desc>
          <SubTitle>찰칵!</SubTitle>
          <MainTitle blue>저 차는 뭐징?</MainTitle>
          <Desc>
            내가 방금 본 차는 이름이 뭘까? 이런 궁금증을 갖고 있지는 않았나요? 왓카는 자동차
            이미지를 인식해 당신이 찾고 있는 자동차의 종류를 알려줍니다. 자동차 이미지를 업로드
            해보세요!
          </Desc>

          <InputDiv style={{ display: 'flex' }}>
            {imgBase64 && <img src={imgBase64} />}
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
            sx={{ backgroundColor: blue.main, color: 'white' }}
            onClick={handleUploadImage}
          >
            이미지 검색하기
          </ImageUploadButton>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Desc highlight top={2}>
              사용법을 모르겠다면?
            </Desc>
            <ArrowDownwardRoundedIcon sx={{ color: blue.main }} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

const MainImage = styled.img`
  width: 100%;
  max-width: 350px;
  display: block;
  margin: auto;
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
