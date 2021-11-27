import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import mbtiDesc from '../../data/mbtiCar';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ mbti }) {
  const data = {
    labels: mbti.map((item) => mbtiDesc[item.type].brand),
    datasets: [
      {
        label: 'MBTI 분포',
        data: mbti.map((item) => item.count),
        backgroundColor: [
          '#7267CB',
          '#98BAE7',
          '#F4BEEE',
          '#0B4619',
          '#0F2C67',
          '#FFCA03',
          '#EED7CE',
          '#DADDFC',
          '#71DFE7',
          '#8A8635',
          '#B4C6A6',
          '#B85252',
          '#D4AC2B',
          '#94B3FD',
          '#E6DDC4',
          '#DED9C4',
        ],
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
}
