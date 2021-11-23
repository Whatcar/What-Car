from db_connect import db


# 월드컵
class Worldcup(db.Model):
    __tablename__ = "worldcup"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    car_id = db.Column(db.Integer, db.ForeignKey("car.id"))
    count = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {"car_id": self.car_id, "count": self.count}
