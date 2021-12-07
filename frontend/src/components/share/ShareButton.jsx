import React from 'react';
import LinkShareButton from '../share/LinkShareButton';
import RestartButton from '../share/RestartButton';
import { Grid } from '@mui/material';
import KakaoShare from './KakaoShare';

export default function ShareButton({
  title,
  description,
  imgUrl,
  buttonTitle,
  linkTo,
  additionalButton,
  restartTitle,
}) {
  return (
    <Grid container spacing={2} sx={{ width: ['100%', '50%'], margin: 'auto' }}>
      <Grid item xs={6}>
        <KakaoShare
          title={title}
          description={description}
          imgUrl={imgUrl}
          buttonTitle={buttonTitle}
        />
      </Grid>
      <Grid item xs={6}>
        <LinkShareButton />
      </Grid>
      <Grid item xs={12}>
        <RestartButton linkTo={linkTo} buttonTitle={restartTitle} />
      </Grid>
      <Grid item xs={12}>
        {additionalButton}
      </Grid>
    </Grid>
  );
}
