from datetime import datetime

from db_connect import db


# AI 처리 결과 저장 정보
class Ai_Result(db.Model):
    __tablename__ = "ai_result"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    car_id = db.Column(
        db.Integer,
        db.ForeignKey("car.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    gallary_id = db.Column(
        db.Integer,
        db.ForeignKey("gallary.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=True,
        default=None,
    )
    similarity = db.Column(db.Float, nullable=True)
    less_similar_cars = db.Column(db.String(255), nullable=True)
    most_similar_car_url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_dict(self):
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
            "less_similar_cars": less_similar_cars,
        }
