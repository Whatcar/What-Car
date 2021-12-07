import React from 'react';
import { Button } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Swal from 'sweetalert2';
import axios from 'axios';
import { colors } from '../../css/theme';

export default function FeedbackButton({ carId, carUrl, similarity }) {
  const PATH = process.env.REACT_APP_BACKEND_URL;
  const lastNames = '김이박최정강조윤장임';
  const handleClick = async () => {
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
          .post(`${PATH}/api/gallary`, {
            car_id: carId,
            car_url: carUrl,
            similarity: similarity,
            nickname: nickname,
            password: password,
          })
          .then((res) => {
            console.log(res);
            if (res.status !== 201) {
              throw new Error(res.statusText);
            }
          })
          .catch((err) => {
            Swal.showValidationMessage(`요청 실패: ${err}`);
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
  return (
    <Button
      variant="outlined"
      startIcon={<ChevronRightRoundedIcon />}
      sx={{ padding: '15px', width: '100%', lineHeight: '1rem' }}
      onClick={handleClick}
    >
      왓카 갤러리에 올리기
    </Button>
  );
}
