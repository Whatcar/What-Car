from db_connect import db


# 차량 색상 정보
class CarColor(db.Model):
    __tablename__ = "car_color"
    car_id = db.Column(
        db.Integer, db.ForeignKey("car.id"), primary_key=True, nullable=False
    )
    color_name = db.Column(db.Text, nullable=True)
    color_url = db.Column(db.Text, nullable=True)

    def to_dict(self):
        color_name = self.color_name.replace("'", "").replace("[", "").replace("]", "")
        color_name = color_name.split(", ")

        color_url = self.color_url.replace("'", "").replace("[", "").replace("]", "")
        color_url = color_url.split(", ")

        return {"color_name": color_name, "color_url": color_url}
