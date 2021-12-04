import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import mbtiDesc from '../../data/mbtiCar';
import { blue } from '../../css/colors';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ mbti, special }) {
  const dataLabels = mbti.map((item) => mbtiDesc[item.type].brand);
  const specialIndex = dataLabels.findIndex((item) => item === mbtiDesc[special].brand);
  const colorChart = Array.from({ length: 12 }, (v, i) => '#EEE');
  colorChart.splice(specialIndex, 1, blue.main);

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: 'MBTI 분포',
        data: mbti.map((item) => item.rate),
        backgroundColor: colorChart,
      },
    ],
  };
  const opts = {
    plugins: {
      legend: {
        display: true,
        labels: {
          filter: function (tooltipItem, data) {
            let label = data.datasets[0].data[tooltipItem.index];
            if (label < 5) {
              return false;
            } else {
              return true;
            }
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (item) => [item.label, `${item.raw}%`],
        },
      },
    },
  };

  return (
    <div style={{ width: '60%', margin: '3rem auto' }}>
      <Pie data={data} options={opts} />
    </div>
  );
}
