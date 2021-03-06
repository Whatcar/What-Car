const selectList = {
  grade: ['경형', '소형', '준중형', '중형', '준대형', '대형'],
  shape: ['SUV', '세단', '해치백', '컨버터블', '왜건', '쿠페'],
  method: ['FF', 'FR', 'MR', 'AWD', '4WD', 'RR'],
  fuel: [
    '디젤',
    '가솔린',
    'LPG',
    '가솔린/하이브리드',
    '디젤/하이브리드',
    '가솔린/수소',
    '전기',
    '수소',
    'LPG/하이브리드',
  ],
  cost: ['0', '1천만', '2천만', '3천만', '4천만', '7천만', '1억', '2억', '5억', '~(원)'],
  displacement: ['0', '1,000', '1,600', '2,000', '3,000', '~(cc)'],
  fuelEfficiency: ['0', '5', '10', '15', '20', '~(km/l)'],
};

export default selectList;
