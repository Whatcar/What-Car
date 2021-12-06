import bcrypt
from db_connect import db


# 갤러리 정보
class Gallery(db.Model):
    __tablename__ = "gallery"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    car_id = db.Column(db.Integer, db.ForeignKey("car.id"), nullable=False)
    similarity = db.Column(db.Text, nullable=True)
    car_url = db.Column(db.Text, nullable=True)
    nickname = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def __init__(self, nickname: str, password: str):
        self.nickname = nickname
        self.password = bcrypt.generate_password_hash(password)

    def is_password_correct(self, password: str):
        return bcrypt.check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "car_id": self.car_id,
            "similarity": self.similarity,
            "car_url": self.car_url,
            "nickname": self.nickname,
        }
