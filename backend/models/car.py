"""
    name : 자동차 이름
    carisyou_url : 원본 링크
    aws_url : AWS S3 링크
    brand : 브랜드명
    imported_domestic : 국산/수입
    price : 가격
    fuel_efficiency : 연비
    fuel : 연료
    car_grade : 차급
    appearance : 외형
    grade_name : 등급명
    on_sale : 판매여부
    release_date : 출시일
    discontinued_date : 단종일
    ride_capacity : 승차정원
    top_speed : 최고속도
    displacement : 배기량
    engine_type : 엔진형식
    drive_method : 구동방식
    fuel_efficiency_rating : 연비등급
"""
from db_connect import db
from flask_restx import fields


# 차 정보
class Car(db.Model):
    __tablename__ = "car"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    carisyou_url = db.Column(db.Text, nullable=True)
    aws_url = db.Column(db.Text, nullable=True)
    brand = db.Column(db.String(30), nullable=False)
    imported_domestic = db.Column(db.String(30), nullable=False)
    price = db.Column(db.String(40), nullable=False)
    fuel_efficiency = db.Column(db.String(30), nullable=True)
    fuel = db.Column(db.String(30), nullable=True)
    car_grade = db.Column(db.String(30), nullable=True)
    appearance = db.Column(db.String(30), nullable=True)
    grade_name = db.Column(db.String(50), nullable=True)
    on_sale = db.Column(db.String(30), nullable=True)
    release_date = db.Column(db.Date, nullable=True)
    discontinued_date = db.Column(db.Date, nullable=True)
    ride_capacity = db.Column(db.String(30), nullable=True)
    top_speed = db.Column(db.String(30), nullable=True)
    displacement = db.Column(db.String(30), nullable=True)
    engine_type = db.Column(db.String(30), nullable=True)
    drive_method = db.Column(db.String(30), nullable=True)
    fuel_efficiency_rating = db.Column(db.String(30), nullable=True)

    def to_dict(self):
        release_date = self.release_date
        discontinued_date = self.discontinued_date

        if not release_date == None:
            release_date = self.release_date.strftime("%Y-%m-%d")

        if not discontinued_date == None:
            discontinued_date = self.discontinued_date.strftime("%Y-%m-%d")

        return {
            "id": self.id,
            "name": self.name,
            "photolink": self.aws_url,
            "brand": self.brand,
            "imported_domestic": self.imported_domestic,
            "price": self.price,
            "fuel_efficiency": self.fuel_efficiency,
            "fuel": self.fuel,
            "car_grade": self.car_grade,
            "appearance": self.appearance,
            "grade_name": self.grade_name,
            "on_sale": self.on_sale,
            "release_date": release_date,
            "discontinued_date": discontinued_date,
            "ride_capacity": self.ride_capacity,
            "top_speed": self.top_speed,
            "displacement": self.displacement,
            "engine_type": self.engine_type,
            "drive_method": self.drive_method,
            "fuel_efficiency_rating": self.fuel_efficiency_rating,
        }

    def to_dict_part(self):
        return {
            "id": self.id,
            "name": self.name,
            "photolink": self.aws_url,
            "price": self.price,
            "car_grade": self.car_grade,
        }

    def to_dict_upload(self):
        return {
            "id": self.id,
            "name": self.name,
            "photolink": self.aws_url,
            "price": self.price,
            "car_grade": self.car_grade,
            "similarity": 0,
        }

    response_model = {
        "id": fields.Integer(description="차량 고유 아이디", example=1),
        "name": fields.String(required=True, description="차량 이름", example="2021 벤츠"),
        "photolink": fields.String(description="이미지", example="https://aws.s3.car"),
        "brand": fields.String(description="브랜드", example="벤츠"),
        "imported_domestic": fields.String(description="수입/국산", example="수입"),
        "price": fields.String(description="가격", example="1억2,000~1억4,200만원"),
        "fuel_efficiency": fields.String(description="연비", example="5.3km/ℓ"),
        "fuel": fields.String(description="연료", example="가솔린"),
        "car_grade": fields.String(description="차급", example="중형"),
        "appearance": fields.String(description="외형", example="세단"),
        "grade_name": fields.String(description="등급명", example="-"),
        "on_sale": fields.String(description="판매여부", example="시판"),
        "release_date": fields.String(description="출시일", example="2021-07-01"),
        "discontinued_date": fields.String(description="단종일", example=""),
        "ride_capacity": fields.String(description="승차정원", example="5명"),
        "top_speed": fields.String(description="최고속도", example="125km/h"),
        "displacement": fields.String(description="배기량", example="2300cc"),
        "engine_type": fields.String(description="엔진형식", example="-"),
        "drive_method": fields.String(description="구동방식", example="FF"),
        "fuel_efficiency_rating": fields.String(description="연비등급", example="1등급"),
    }

    response_model_part = {
        "id": fields.Integer(description="차량 고유 아이디", required=True, example=1),
        "name": fields.String(required=True, description="차량 이름", example="2021 벤츠"),
        "photolink": fields.String(description="이미지", example="https://aws.s3.car"),
        "price": fields.String(description="가격", example="1억2,000~1억4,200만원"),
        "car_grade": fields.String(description="차급", example="중형"),
    }

    response_model_upload = {
        "most_car_db_id": fields.Integer(description="AI DB 고유 아이디", example=1),
        "most_car_url": fields.String(description="박스 표시된 이미지 url"),
        "similarity": fields.Float(
            required=True, description="차량 분석 유사도", example=0.99
        ),
        "id": fields.Integer(description="차량 고유 아이디", required=True, example=1),
        "name": fields.String(required=True, description="차량 이름", example="2021 벤츠"),
        "photolink": fields.String(description="이미지", example="https://aws.s3.car"),
        "brand": fields.String(description="브랜드", example="벤츠"),
        "imported_domestic": fields.String(description="수입/국산", example="수입"),
        "price": fields.String(description="가격", example="1억2,000~1억4,200만원"),
        "fuel_efficiency": fields.String(description="연비", example="5.3km/ℓ"),
        "fuel": fields.String(description="연료", example="가솔린"),
        "car_grade": fields.String(description="차급", example="중형"),
        "appearance": fields.String(description="외형", example="세단"),
        "grade_name": fields.String(description="등급명", example="-"),
        "on_sale": fields.String(description="판매여부", example="시판"),
        "release_date": fields.String(description="출시일", example="2021-07-01"),
        "discontinued_date": fields.String(description="단종일", example=""),
        "ride_capacity": fields.String(description="승차정원", example="5명"),
        "top_speed": fields.String(description="최고속도", example="125km/h"),
        "displacement": fields.String(description="배기량", example="2300cc"),
        "engine_type": fields.String(description="엔진형식", example="-"),
        "drive_method": fields.String(description="구동방식", example="FF"),
        "fuel_efficiency_rating": fields.String(description="연비등급", example="1등급"),
    }

    response_model_upload_less = {
        "id": fields.Integer(required=True, description="차량 고유 아이디", example=2),
        "name": fields.String(
            required=True, description="차량 모델명", example="2002 현대 뉴 베르나"
        ),
        "photolink": fields.String(
            required=True,
            description="차량 이미지 링크",
            example="https://whatcar.s3.ap-northeast-2.amazonaws.com/photo/198.jpg",
        ),
        "price": fields.String(
            required=True, description="차량 가격", example="590~1,100만원"
        ),
        "car_grade": fields.String(required=True, description="차급", example="중형"),
        "similarity": fields.Float(
            required=True, description="차량 분석 유사도", example=0.99
        ),
    }

    # worldcups = db.relationship("Worldcup", backref="car", lazy=True)
