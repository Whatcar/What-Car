# 왓카

- **차알못**(차에 대해 잘 알지 못하는 사람들)이 원하는 차를 쉽고 빠르게 찾을 수 있는 서비스를 제공

## 기술 스택

<div align="center">
<img alt="Javascript" src ="https://img.shields.io/badge/Javascript-F7DF1E.svg?&style=for-the-badge&logo=Javascript&logoColor=black"/>
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=black"/>
<img alt="MUI" src ="https://img.shields.io/badge/MUI-007FFF.svg?&style=for-the-badge&logo=MUI&logoColor=white"/>
<img alt="styled-components" src ="https://img.shields.io/badge/styled--components-DB7093.svg?&style=for-the-badge&logo=styled-components&logoColor=black"/>
<img alt="Python" src ="https://img.shields.io/badge/Python-3776AB.svg?&style=for-the-badge&logo=Python&logoColor=white"/>
<img alt="Flask" src ="https://img.shields.io/badge/Flask-000000.svg?&style=for-the-badge&logo=Flask&logoColor=white"/>
<img alt="MariaDB" src ="https://img.shields.io/badge/Maria DB-1F305F.svg?&style=for-the-badge&logo=MariaDB&logoColor=white"/>
<img alt="Amazon AWS" src ="https://img.shields.io/badge/Amazon AWS-232F3E.svg?&style=for-the-badge&logo=Amazon AWS&logoColor=white"/>
<img alt="Amazon S3" src ="https://img.shields.io/badge/Amazon S3-569A31.svg?&style=for-the-badge&logo=Amazon S3&logoColor=white"/>
<img alt="Tensorflow" src ="https://img.shields.io/badge/Tensorflow-FF6F00.svg?&style=for-the-badge&logo=Tensorflow&logoColor=white"/>
<img alt="Keras" src ="https://img.shields.io/badge/Keras-D00000.svg?&style=for-the-badge&logo=Keras&logoColor=white"/>
<img alt="OpenCV" src ="https://img.shields.io/badge/OpenCV-5C3EE8.svg?&style=for-the-badge&logo=OpenCV&logoColor=white"/>
<img alt="NGINX" src ="https://img.shields.io/badge/NGINX-009639.svg?&style=for-the-badge&logo=NGINX&logoColor=white"/>
<img alt="Gunicorn" src ="https://img.shields.io/badge/Gunicorn-499848.svg?&style=for-the-badge&logo=Gunicorn&logoColor=white"/>
</div>

## 1. 프로젝트 소개

### 목표

**차에 대해 잘 알지 못하는 사람들**이 **원하는 차**를 **쉽고 빠르게** 찾을 수 있는 서비스를 제공한다.

- 사용자가 가지고 있는 이미지를 이용해 차를 찾을 수 있다.
- 차량의 상세 스펙을 보여주며, 댓글 기능으로 해당 차량에 대한 리뷰를 쓸 수 있다.
- 기능을 조건으로 선택해 차를 찾을 수 있다.
- 간단한 게임을 통해 사용자가 어떤 이미지의 자동차를 선호하는지 알 수 있다.
- 간단한 게임을 통해 사용자의 이미지와 맞는 자동차 브랜드를 알 수 있다.
- 공유 기능을 통해 주변인들에게 사용자가 관심있는 차량을 알려주고, 서비스를 홍보할 수 있다.

### 기획 의도

### **이 차 뭔가요?**

**차종 인식**과 관련된 연구와 논문은 많다. 그러나, 관련 서비스를 제공하는 사이트는 없다. 차 전문가가 아닌 이상 일반인이 사진 속 차량의 이름을 알려면 커뮤니티에 글을 올려 물어보는 방법 밖에 없다.

**→ 사진만 찍어서 올리면 쉽게 차 모델을 알 수 있는 서비스는 없을까?**

:raising_hand:**왓카의 페르소나, 이머선(29세, 개발자)씨의 고민**

- 이제 막 취업한 사회초년생
- 회사가 **제주도**라서 최근 거주지를 이사했다
- **차.알.못**이지만 최근 면허를 땄다
- 출퇴근을 위해 **차를 구매할 예정**이다
- 길을 다니며 마음의 드는 디자인의 자동차를 발견하면 사진을 찍어 놓는다
- sns에 사진 올리는 것을 좋아하기 때문에 이왕이면 **디자인이 멋진 차량**을 구매하고 싶다
- 최근 길가다 마음에 드는 디자인의 자동차를 발견했는데, 검색 방법을 몰라 포기했다
- 다나오는 사이트에서 자동차를 검색해보려 했지만, 조건이 너무 많고 용어가 어렵다

**→ 이머선씨와 같은 차.알.못을 위한 자동차 검색 서비스, 🚙 왓카 탄생!**

## 2. 프로젝트 목표

- 사용자가 가지고 있는 이미지를 이용해 차를 찾을 수 있다.
- 차량의 상세 스펙을 보여주며, 댓글 기능으로 해당 차량에 대한 리뷰를 쓸 수 있다.
- 기능을 조건으로 선택해 차를 찾을 수 있다.
- 간단한 게임을 통해 사용자가 어떤 이미지의 자동차를 선호하는지 알 수 있다.
- 간단한 게임을 통해 사용자의 이미지와 맞는 자동차 브랜드를 알 수 있다.
- 공유 기능을 통해 주변인들에게 사용자가 관심있는 차량을 알려주고, 서비스를 홍보할 수 있다.
- 사용자들이 업로드한 사진을 모아놓아 커뮤니티의 기능을 수행할 수 있다.

## 3. 프로젝트 기능 설명

### 메인 페이지

![ezgif com-gif-maker-8](https://user-images.githubusercontent.com/22341452/146490803-cabdeaa2-9817-4de0-a1dd-0cc69906ddcd.gif)

### 이미지 검색 결과 페이지
![ezgif com-gif-maker-9](https://user-images.githubusercontent.com/22341452/146490829-6cf5c8d2-e5ad-488b-8c59-272b19f92603.gif)



### 검색 페이지

![ezgif com-gif-maker-7](https://user-images.githubusercontent.com/22341452/146490838-027cc66c-4922-4d77-9d02-c463bdb98ea9.gif)


### 차량 상세 페이지

![ezgif com-gif-maker-11](https://user-images.githubusercontent.com/22341452/146490843-44f3ff04-89f0-4b96-a00a-182d28edbb01.gif)


### 갤러리

![1231232123136](https://user-images.githubusercontent.com/22341452/146490861-f6617536-5413-4d35-bdcf-d026fbbdc3a2.gif)



### 팀 소개 페이지

<img src="https://user-images.githubusercontent.com/22341452/146490981-d6f4a508-ac53-4b96-8b7d-7797f34e684e.png" width="70%" height="70%" />

## 4. 프로젝트 구성도

<img src="https://user-images.githubusercontent.com/22341452/146490886-83f1c724-cdb3-4926-9619-176b11644a60.png" width="70%" height="70%"/>

- [와이어프레임](https://www.figma.com/file/WeTyad4D651hQcpD041Ppg/%EB%A8%B8%EC%84%A0%EB%9F%AC%EB%8B%9D29?node-id=2%3A4)
- [스토리보드](https://docs.google.com/presentation/d/1QKu6nnS17Fxv6M02sVy1flslcMH5x7v0x_Y80Cj5mv4/edit#slide=id.p)

## 5. 프로젝트 팀원 역할 분담

| 이름   | 역할                     | 담당 부분                                                                                                                                    |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 김나현 | 프론트엔드, 서기         | 1. UI/UX 디자인 및 개발<br>2. 검색/검색 결과 페이지 구현<br>3. 스크럼 작성 및 이슈 관리                                                      |
| 김민지 | 백엔드                   | 1. DB 설계 및 관리<br>2. Web Crawling 및 전처리<br>3. AWS S3 연동 및 관리<br>4. API 설계 및 구현<br>5. API 문서화                            |
| 김재현 | 프론트엔드               | 1. 카카오 및 URL 공유 기능 개발<br>2. Disqus 기능개발                                                                                        |
| 백승욱 | 👑팀장, 인공지능, 백엔드 | 1. Web Crawling<br>2. 데이터 전처리<br>3. 이미지 Segmentation 따는 것 구현<br>4. MVC구조 조정                                                |
| 이정규 | 인공지능, 백엔드         | 1. 인공지능 모델 설계<br>2. 데이터 전처리<br>3. 인공지능 연동<br>4. 서버 배포                                                                |
| 최연주 | 프론트엔드, 인공지능     | 1. 메인 페이지 구현<br>2. 네비게이션 바(반응형) 구현<br>3. 결과 페이지 레이아웃 구현<br>4. MBTI/이상형 월드컵/404/갤러리/팀 소개 페이지 구현 |

## 6. 실행 방법

- Frontend

```
cd frontend

# .env.example 파일 참고 후 .env 파일에 환경변수 설정 필요

yarn 또는 yarn install
yarn start
```
- Backend

[model download (Resnet-152)](https://drive.google.com/file/d/1ZlLxbpcS6PVyUBEmbgjjGqfOukfIN-25/view?usp=sharing)
```
pip3 install -r requirements.txt

python app.py
```


## 7. 버전

- 1.0.0

## Reference

Centernet  
https://tfhub.dev/tensorflow/centernet/hourglass_512x512/1

Resnet-152  
https://github.com/foamliu/Car-Recognition

Data processing repo  
https://kdt-gitlab.elice.io/002-part3-cnn/team4/car_data
