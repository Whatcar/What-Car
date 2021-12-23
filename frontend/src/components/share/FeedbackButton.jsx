import React from 'react';
import { Button } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Swal from 'sweetalert2';
import axios from 'axios';
import { colors } from '../../css/theme';
import { useNavigate } from 'react-router';
import { Desc } from '../../css/mainStyles';

export default function FeedbackButton({ id, carId, carUrl, similarity, setCarData, isUpload }) {
  const PATH = process.env.REACT_APP_BACKEND_URL;
  const lastNames = '김이박최정강조윤장임';
  const navigate = useNavigate();
  const handleUpload = async () => {
    Swal.fire({
      title: '업로드를 위해 아래를 채워주세요!',
      html: `<input type="text" id="nickname" class="swal2-input" placeholder="닉네임" value="${
        lastNames[Math.floor(Math.random() * 10)]
      }머선">
      <input type="password" id="password" class="swal2-input" placeholder="비밀번호">`,
      confirmButtonText: '올리기',
      confirmButtonColor: colors.blueM,
      showCancelButton: true,
      cancelButtonText: '안 올릴래요',
      focusConfirm: false,
      preConfirm: () => {
        const nickname = Swal.getPopup().querySelector('#nickname').value;
        const password = Swal.getPopup().querySelector('#password').value;
        if (!nickname || !password) {
          Swal.showValidationMessage(`닉네임과 비밀번호를 입력해주세요!`);
        }
        return axios
          .post(`${PATH}/api/gallery`, {
            ai_result_id: id,
            car_id: carId,
            car_url: carUrl,
            similarity: similarity,
            nickname: nickname,
            password: password,
          })
          .then((res) => {
            if (res.status !== 201) {
              throw new Error(res.statusText);
            }
            setCarData((prev) => ({ ...prev, isUpload: true }));
          })
          .catch((err) => {
            if (err.response.data) {
              Swal.showValidationMessage('업로드에 실패했습니다.');
            }
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '성공적으로 업로드 됐습니다!',
          text: '이제 갤러리에서 확인하실 수 있어요.',
          confirmButtonText: '넵!',
          confirmButtonColor: colors.blueM,
        });
      } else {
        Swal.fire({
          icon: 'question',
          title: '올리지 않으시나요?',
          text: '여기에서 기다리고 있을게요!',
          confirmButtonText: '넵!',
          confirmButtonColor: colors.blueM,
        });
      }
    });
  };
  const handleGallery = () => navigate('/gallery');
  return isUpload ? (
    <Button
      variant="outlined"
      startIcon={<ChevronRightRoundedIcon />}
      sx={{ padding: '15px', width: '100%', lineHeight: '1rem' }}
      onClick={handleGallery}
    >
      갤러리로 이동하기
    </Button>
  ) : (
    <>
      <Button
        variant="outlined"
        startIcon={<ChevronRightRoundedIcon />}
        sx={{ padding: '15px', width: '100%', lineHeight: '1rem' }}
        onClick={handleUpload}
      >
        왓카 갤러리에 올리기
      </Button>
      <Desc highlight center top={1}>
        *현재 페이지는 2~3일이 지나면 접속할 수 없습니다. 기록을 남기고 싶으면 왓카 갤러리에 사진을
        공유하세요!
      </Desc>
    </>
  );
}
