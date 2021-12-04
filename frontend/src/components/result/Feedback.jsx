import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { blue } from '../../css/colors';
import axios from 'axios';

export default function Feedback({ setIsFeedback }) {
  const handleClickFeedback = () => {
    Swal.fire({
      title: '검색 결과가 만족스러우신가요?',
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: '넵',
      confirmButtonAriaLabel: '넵',
      confirmButtonColor: blue.main,
      cancelButtonText: '아니요',
      cancelButtonAriaLabel: '아니요',
    }).then((result) => {
      setIsFeedback(true);
      if (result.isConfirmed) {
        Swal.fire({
          title: '갤러리에 업로드 하시겠습니까?',
          text: '갤러리에 올리시면 다른 사람들이 올려주신 사진을 볼 수 있어요. 차량 주변과 번호판은 안보이게 처리됩니다!',
          icon: 'question',
          showCloseButton: false,
          showCancelButton: true,
          focusConfirm: true,
          confirmButtonText: '넵, 올릴게요!',
          confirmButtonAriaLabel: '넵',
          confirmButtonColor: blue.main,
          cancelButtonText: '아니요, 안 올릴래요.',
          cancelButtonAriaLabel: '아니요',
          allowOutsideClick: false,
        }).then((res) => {
          if (res.isConfirmed) {
            // DB에 이미지와 결과 id 올리기
            Swal.fire({
              title: '피드백 남겨주셔서 감사합니다!',
              text: '곧 갤러리에서 이미지를 확인하실 수 있어요!',
              icon: 'success',
              showConfirmButton: false,
            });
          } else if (res.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: '피드백 남겨주셔서 감사합니다!',
              text: '갤러리에서 다른 차량들도 확인해보세요.',
              icon: 'success',
              showConfirmButton: false,
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: '피드백 남겨주셔서 감사합니다!',
          text: '더 좋은 서비스로 찾아뵙겠습니다.',
          icon: 'success',
          showConfirmButton: false,
        });
      }
    });
  };
  return (
    <FeedbackButton onClick={handleClickFeedback} variant="contained" size="large">
      피드백 남기기
    </FeedbackButton>
  );
}

const FeedbackButton = styled(Button)``;
