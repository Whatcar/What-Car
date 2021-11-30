// 백엔드 스키마 ; method->drive_method, cost->price

const selectList = {
  grade: ['경형', '소형', '준중형', '중형', '준대형', '대형'],
  shape: ['SUV', '세단', '왜건', '컨버터블', '해치백', '쿠페'],
  method: ['FF', 'FR', '4WD', 'RR', 'MR', 'AWD'],
  fuel: [
    '전체',
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
  cost: [
    '전체',
    '0원',
    '1,000만원',
    '2,000만원',
    '3,000만원',
    '4,000만원',
    '7,000만원',
    '1억원',
    '2억원',
    '5억원',
  ],
  displacement: ['1,000cc', '1,600cc', '2,000cc', '3,000cc'],
  fuelEfficiency: ['전체', '1km/l', '5km/l', '10km/l', '15km/l', '20km/l'],
};

export default selectList;
