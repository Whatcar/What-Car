import React from 'react';
import { Helmet } from 'react-helmet';

export default function CustomHelmet({ title, description }) {
  return (
    <Helmet>
      <meta name="description" content={description} />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="왓카 | WhatCar" />
      <meta property="og:description" content={description} />

      {/* <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content='https://drive.google.com/uc?export=view&id=1a3ijrS6CADP_dw1BQrc0bsN4oxNKdIpt' /> */}
    </Helmet>
  );
}
