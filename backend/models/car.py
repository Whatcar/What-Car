from db_connect import db

# 차 정보
class Car(db.Model):
    __tablename__ = "car"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    photolink = db.Column(db.Text, nullable=True)
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
        return {
            "id": self.id,
            "name": self.name,
            "photolink": self.photolink,
            "brand": self.brand,
            "imported_domestic": self.imported_domestic,
            "price": self.price,
            "fuel_efficiency": self.fuel_efficiency,
            "fuel": self.fuel,
            "car_grade": self.car_grade,
            "appearance": self.appearance,
            "grade_name": self.grade_name,
            "on_sale": self.on_sale,
            "release_date": self.release_date,
            "discontinued_date": self.discontinued_date,
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
            "photolink": self.photolink,
            "price": self.price,
            "car_grade": self.car_grade,
        }

    def to_dict_int(self):
        return {
            "price_int_low": self.price_int_low,
            "price_int_high": self.price_int_high,
            "price_int": self.price_int,
            "displacement_int": self.displacement_int,
            "fuel_efficiency_int": self.fuel_efficiency_int,
            "fuel_efficiency_int_low": self.fuel_efficiency_int_low,
            "fuel_efficiency_int_high": self.fuel_efficiency_int_high,
        }

    worldcups = db.relationship("Worldcup", backref="car", lazy=True)
