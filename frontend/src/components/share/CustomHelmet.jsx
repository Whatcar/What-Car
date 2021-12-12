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
    </Helmet>
  );
}
