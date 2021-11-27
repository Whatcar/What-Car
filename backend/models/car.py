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

    ex) 5,400~6,510만원
    price_int : 가격 숫자 형식으로 변환(str) "54000000, 65100000"
    price_int_low : 54000000
    price_int_high : 65100000

    displacement_int : 배기량 int 형식으로 변환
    
    ex) 5.5~6.8km/ℓ
    fuel_efficiency_int : 연비 숫자 형식으로 변환(str) "5.5, 6.8"
    fuel_efficiency_int_low : 5.5
    fuel_efficiency_int_high : 6,8
"""
from db_connect import db


# 차 정보
class Car(db.Model):
    __tablename__ = "CAR"
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
    price_int = db.Column(db.String(40), nullable=True)
    price_int_low = db.Column(db.BigInteger, nullable=True)
    price_int_high = db.Column(db.BigInteger, nullable=True)
    displacement_int = db.Column(db.BigInteger, nullable=True)
    fuel_efficiency_int = db.Column(db.String(30), nullable=True)
    fuel_efficiency_int_low = db.Column(db.Float, nullable=True)
    fuel_efficiency_int_high = db.Column(db.Float, nullable=True)

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

    def to_dict_int(self):
        return {
            "price_int_low": self.price_int_low,
            "price_int": self.price_int,
            "displacement_int": self.displacement_int,
            "fuel_efficiency_int": self.fuel_efficiency_int,
        }

    # worldcups = db.relationship("Worldcup", backref="car", lazy=True)
