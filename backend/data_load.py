import csv
from datetime import date, datetime

from app import create_app

app = create_app()
app.app_context().push()
from app import db
from models import Car

with open("df_spec_final.csv", "r", encoding="UTF-8") as f:
    reader = csv.DictReader(f)

    for row in reader:
        
        release_date = row["출시일"]
        try:
            release_date = datetime.strptime(release_date, "%Y-%m-%d").date()
        except:
            release_date = None

        discontinued_date = row["단종일"]
        try:
            discontinued_date = datetime.strptime(discontinued_date, "%Y-%m-%d").date()
        except:
            discontinued_date = None

        print(release_date, discontinued_date)
        car = Car(
            name=row["car_name"],
            photolink=row["url"],
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

        db.session.commit()