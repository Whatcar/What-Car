from operator import le

from db_connect import db
from flask_restx import fields


# 임시 AI 처리 결과 저장 정보
class Temporary_Ai_Car(db.Model):
    __tablename__ = "temporary_ai_car"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    most_similar_car = db.Column(db.String(255), nullable=False)
    less_similar_cars = db.Column(db.String(255), nullable=True)
    most_similar_car_url = db.Column(db.Text, nullable=False)
    is_upload = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        most_similar_car = (
            self.most_similar_car.replace("'", "").replace("[", "").replace("]", "")
        )
        most_similar_car = most_similar_car.split(", ")
        most_similar_car = list(map(float, most_similar_car))
        most_similar_car[0] = int(most_similar_car[0])

        re = "("
        re2 = ")"
        less_similar_cars = (
            self.less_similar_cars.replace("'", "")
            .replace("[", "")
            .replace("]", "")
            .replace(re, "")
            .replace(re2, "")
        )
        less_similar_cars = less_similar_cars.split(", ")
        less_similar_cars = list(map(float, less_similar_cars))

        less_similar_cars_fix = []
        for i in range(len(less_similar_cars)):
            if i % 2 == 0:
                less_similar_cars_fix.append(int(less_similar_cars[i]))
            if i % 2 == 1:
                less_similar_cars_fix.append(less_similar_cars[i])
        less_similar_cars = less_similar_cars_fix

        n = 2
        less_similar_cars = [
            less_similar_cars[i * n : (i + 1) * n]
            for i in range((len(less_similar_cars) + n - 1) // n)
        ]

        return {
            "most_similar_car": most_similar_car,
            "less_similar_cars": less_similar_cars,
        }
