from db_connect import db


# 월드컵
class WorldCup(db.Model):
    __tablename__ = "WORLD_CUP"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    car_id = db.Column(db.Integer, db.ForeignKey("CAR.id"))
    photolink = db.Column(db.Text, nullable=False)
    count = db.Column(db.Integer, nullable=False)

    def __init__(self, car_id, count):
        self.car_id = car_id
        self.photolink = (
            "https://whatcar.s3.ap-northeast-2.amazonaws.com/worldcup_photo/"
            + str(car_id)
            + ".png"
        )
        self.count = count

    def to_dict(self):
        return {"car_id": self.car_id, "photolink": self.photolink}
