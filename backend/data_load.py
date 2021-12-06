import csv
from datetime import datetime

from app import create_app

app = create_app()
app.app_context().push()
from werkzeug.exceptions import abort

from app import db
from models.__init__ import *

with open("car_spec_real_final.csv", "r", encoding="UTF-8") as f:
    reader = csv.DictReader(f)

    for row in reader:

        release_date = row["출시일"]
        discontinued_date = row["단종일"]

        try:
            release_date = datetime.strptime(release_date, "%Y-%m-%d").date()
        except:
            release_date = None
        try:
            discontinued_date = datetime.strptime(discontinued_date, "%Y-%m-%d").date()
        except:
            discontinued_date = None

        print(release_date, discontinued_date)
        car = Car(
            name=row["car_name"],
            carisyou_url=row["carisyou_url"],
            aws_url=row["aws_url"],
            brand=row["브랜드"],
            imported_domestic=row["국산/수입"],
            price=row["가격"],
            fuel_efficiency=row["연비"],
            fuel=row["연료"],
            car_grade=row["차급"],
            appearance=row["외형"],
            grade_name=row["등급명"],
            on_sale=row["판매여부"],
            release_date=release_date,
            discontinued_date=discontinued_date,
            ride_capacity=row["승차정원"],
            top_speed=row["최고속도"],
            displacement=row["배기량"],
            engine_type=row["엔진형식"],
            drive_method=row["구동방식"],
            fuel_efficiency_rating=row["연비등급"],
        )

        db.session.add(car)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(400, {"error": str(e)})

num = 1
with open("car_spec_real_final.csv", "r", encoding="UTF-8") as f:
    reader = csv.DictReader(f)

    for row in reader:

        print(num)
        car_int = CarInt(
            car_id=num,
            price_int_low=int(row["price_int_low"]),
            price_int_high=int(row["price_int_high"]),
            displacement_int=int(row["displacement_int"]),
            fuel_efficiency_int_low=float(row["fuel_efficiency_int_low"]),
            fuel_efficiency_int_high=float(row["fuel_efficiency_int_high"]),
        )

        db.session.add(car_int)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(400, {"error": str(e)})
        num += 1


with open("mbti.csv", "r", encoding="UTF-8") as f:
    reader = csv.DictReader(f)

    for row in reader:

        mbti = MbtiResult(type=row["type"], count=row["count"])
        db.session.add(mbti)

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(400, {"error": str(e)})

with open("worldcup.csv", "r", encoding="UTF-8") as f:
    reader = csv.DictReader(f)

    for row in reader:

        car = WorldCup(car_id=row["car_id"], count=row["count"])
        db.session.add(car)

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(400, {"error": str(e)})
