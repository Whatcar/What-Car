import re

import config
from flask import Blueprint, json, jsonify, request
from models import *
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from werkzeug.exceptions import abort

bp = Blueprint("search", __name__, url_prefix="/api")
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)


@bp.route("/car/list", methods=["GET"])
def car_list():
    car_list = Car.query.order_by(Car.release_date.desc())
    car = [Car.to_dict_part(car) for car in car_list]
    return jsonify(car)


@bp.route("/search", methods=["GET"])
def search():
    if request.method == "GET":
        data = request.json
        if not data:
            abort(404, "조건을 선택해주세요.")
        brand = data["brand"]
        cost = data["cost"]
        displacement = data["displacement"]
        fuelEfficiency = data["fuelEfficiency"]
        grade = data["grade"]
        shape = data["shape"]
        name = data["name"]
        method = data["method"]
        fuel = data["fuel"]

        # 전체
        query_all = ""

        # 브랜드
        if brand == "":
            pass
        else:
            brands = brand.split(",")
            for brand1 in brands:
                q = f'brand = "{brand1}" OR '
                query_all += q
            query_all = query_all[:-4]
            query_all = "( " + query_all + ")"
            query_all += " AND "

        # 가격
        numbers = re.sub(r"[^0-9~]", "", cost)
        costs = numbers.split("~")
        if len(costs) == 1:
            pass
        elif costs[0] == "":
            if costs[1] == "":
                pass
            else:
                costs[1] = int(costs[1])
                if costs[1] <= 5:
                    costs[1] *= 100000000
                else:
                    costs[1] *= 10000
                q = f"(price_int_high <= {costs[1]} ) AND "
                query_all += q
        elif costs[1] == "":
            if costs[0] == "":
                pass
            else:
                costs[0] = int(costs[0])
                if costs[0] <= 5:
                    costs[0] *= 100000000
                else:
                    costs[0] *= 10000
                q = f"(price_int_low >= {costs[0]} ) AND "
                query_all += q
        else:
            costs = [int(cost) for cost in costs]
            if costs[0] <= 5:
                costs[0] *= 100000000
            else:
                costs[0] *= 10000
            if costs[1] <= 5:
                costs[1] *= 100000000
            else:
                costs[1] *= 10000
            q = f"(price_int_low >= {costs[0]} AND price_int_high <= {costs[1]} ) AND "
            query_all += q

        # 배기량
        numbers = re.sub(r"[^0-9~]", "", displacement)
        displacements = numbers.split("~")

        if len(displacements) == 1:
            pass
        elif displacements[0] == "":
            if displacements[1] == "":
                pass
            else:
                displacements[1] = int(displacements[1])
                q = f"(displacement_int <= {displacements[1]} ) AND "
                query_all += q
        elif displacements[1] == "":
            if displacements[0] == "":
                pass
            else:
                displacements[0] = int(displacements[0])

                q = f"(displacement_int >= {displacements[0]} ) AND "
                query_all += q
        else:
            displacements = [int(displacement) for displacement in displacements]

            q = f"(displacement_int >= {displacements[0]} AND displacement_int <= {displacements[1]} ) AND "
            query_all += q

        # 연비
        numbers = re.sub(r"[^0-9~]", "", fuelEfficiency)

        fuelEfficiencys = numbers.split("~")

        if len(fuelEfficiencys) == 1:
            pass
        elif fuelEfficiencys[0] == "":
            if fuelEfficiencys[1] == "":
                pass
            else:
                fuelEfficiencys[1] = float(fuelEfficiencys[1])
                q = f"(fuel_efficiency_int_high <= {fuelEfficiencys[1]} ) AND "
                query_all += q
        elif fuelEfficiencys[1] == "":
            if fuelEfficiencys[0] == "":
                pass
            else:
                fuelEfficiencys[0] = float(fuelEfficiencys[0])

                q = f"(fuel_efficiency_int_low >= {fuelEfficiencys[0]} ) AND "
                query_all += q
        else:
            fuelEfficiencys = [
                float(fuelEfficiency) for fuelEfficiency in fuelEfficiencys
            ]

            q = f"(fuel_efficiency_int_low >= {fuelEfficiencys[0]} AND fuel_efficiency_int_high <= {fuelEfficiencys[1]} ) AND "
            query_all += q

        # 차급
        ql = ""
        if grade == "":
            pass
        else:
            grades = grade.split(",")
            for grade1 in grades:
                q = f'car_grade = "{grade1}" OR '
                ql += q
            ql = ql[:-4]
            ql = "( " + ql + ") AND "
            query_all += ql
            print(query_all)

        # 외형
        ql = ""
        if shape == "":
            pass
        else:
            shapes = shape.split(",")
            for shape1 in shapes:
                q = f'appearance = "{shape1}" OR '
                ql += q
            ql = ql[:-4]
            ql = "( " + ql + ") AND "
            query_all += ql
            print(query_all)

        # 구동방식
        ql = ""
        if method == "":
            pass
        else:
            methods = method.split(",")
            for method1 in methods:
                q = f'drive_method = "{method1}" OR '
                ql += q
            ql = ql[:-4]
            ql = "( " + ql + ") AND "
            query_all += ql

        # 연료
        if fuel == "전체":
            pass
        elif fuel == "":
            pass
        else:
            query_all += f'fuel = "{fuel}" AND'

        # 이름
        if name == "":
            query_all = query_all[:-4]
            query_all = Car.query.filter(text(query_all))
        else:
            search = "%{}%".format(name)
            print(search)
            query_all = engine.execute(
                "SELECT * FROM Car WHERE " + query_all + " name LIKE %s",
                [search],
            )
        print("쿼리 출력", query_all)
        car_brand = [Car.to_dict_part(car) for car in query_all]
        print("개수!!!!!!!!", len(car_brand))

        return jsonify(car_brand)


@bp.route("/car/list/sorted", methods=["GET"])
def car_list_sorted():
    data = request.json
    creiteria = data["sort_criteria"]

    # 출시일순 최신
    if creiteria == "출시일순":
        release_date_desc = Car.query.order_by(Car.release_date.desc())
        car = [Car.to_dict_part(car) for car in release_date_desc]

    # 연비순 오름차순
    if creiteria == "연비순":
        fuel_efficiency_desc = Car.query.order_by(Car.fuel_efficiency_int_high.desc())
        car = [Car.to_dict_part(car) for car in fuel_efficiency_desc]

    # 가격순 내림차순
    if creiteria == "가격순":

        price_asc = Car.query.order_by(Car.price_int_low.asc())
        car = [Car.to_dict_part(car) for car in price_asc]

    return jsonify(car)
