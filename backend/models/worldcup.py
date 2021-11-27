from db_connect import db


# 월드컵
class WorldCup(db.Model):
    __tablename__ = "WORLD_CUP"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    car_id = db.Column(db.Integer, db.ForeignKey("CAR.id"))
    count = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {"car_id": self.car_id, "count": self.count}
