"""
    ex) 5,400~6,510만원-
    price_int_low : 54000000
    price_int_high : 65100000

    displacement_int : 배기량 int 형식으로 변환
    
    ex) 5.5~6.8km/ℓ
    fuel_efficiency_int_low : 5.5
    fuel_efficiency_int_high : 6,8
"""
from db_connect import db
from flask_restx import fields


# 차 정보
class Car_Int(db.Model):
    __tablename__ = "CAR_INT"
    car_id = db.Column(
        db.Integer, db.ForeignKey("CAR.id"), primary_key=True, nullable=False
    )
    price_int_low = db.Column(db.BigInteger, nullable=True)
    price_int_high = db.Column(db.BigInteger, nullable=True)
    displacement_int = db.Column(db.BigInteger, nullable=True)
    fuel_efficiency_int_low = db.Column(db.Float, nullable=True)
    fuel_efficiency_int_high = db.Column(db.Float, nullable=True)

    # worldcups = db.relationship("Worldcup", backref="car", lazy=True)
