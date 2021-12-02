import re

import config
from models.car import Car
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from werkzeug.exceptions import abort

engine = create_engine(config.SQLALCHEMY_DATABASE_URI)


def pagination(query_list, count, num):

    query_data_num = count
    per_page = 24
    range_start = per_page * (num - 1)
    total_page = query_data_num // per_page
    rest_data = query_data_num % per_page

    # # 검색 결과가 없으면
    if count == 0:
        car_list = []

    # per_page가 다 채워지지 않은 마지막 페이지를 넘으면
    elif num >= (total_page + 1) and rest_data == 0:
        abort(404, "페이지 범위를 초과했습니다.")

    # 전체 데이터 개수//페이지 당 데이터가 들어온 페이지 범위를 넘으면
    elif num > (total_page + 1):
        abort(404, "페이지 범위를 초과했습니다.")

    # 전체 데이터 개수//페이지 당 데이터가 들어온 페이지 같으면
    if num == (total_page + 1) and not rest_data == 0:
        # 범위 시작값부터 마지막 데이터까지
        query_list = query_list[range_start:query_data_num]
    else:
        query_list = query_list[range_start : per_page * num]

    car_list = [Car.to_dict_part(car) for car in query_list]

    return {"result_num": count}, car_list


def get_search(
    brand,
    cost,
    displacement,
    fuelEfficiency,
    grade,
    shape,
    name,
    method,
    fuel,
    num,
    sort_criteria,
):
    # 전체
    query_all = ""

    # 브랜드
    if brand and not brand == "전체":
        brands = brand.split(",")
        for brand1 in brands:
            query_all += f'brand = "{brand1}" OR '
        query_all = "(" + query_all[:-4] + ") AND "

    # 가격
    if cost and not cost == "전체":

        numbers = re.sub(r"[^0-9~]", "", cost)
        costs = numbers.split("~")

        for i in range(len(costs)):
            if costs[i]:
                costs[i] = int(costs[i])
                if costs[i] <= 5:
                    costs[i] *= 100000000
                else:
                    costs[i] *= 10000
            is_none = str(costs[i])

        if len(costs) == 1 or is_none == "":
            pass
        elif costs[0] == "":
            query_all += f"(price_int_high <= {costs[1]} ) AND "
        elif costs[1] == "":
            query_all += f"(price_int_low >= {costs[0]} ) AND "
        else:
            query_all += (
                f"(price_int_low >= {costs[0]} AND price_int_high <= {costs[1]} ) AND "
            )

    # 배기량
    if displacement and not displacement == "전체":

        numbers = re.sub(r"[^0-9~]", "", displacement)
        displacements = numbers.split("~")

        for i in range(len(displacements)):
            if displacements[i]:
                displacements[i] = int(displacements[i])
            is_none = str(displacements[i])

        if len(displacements) == 1 or is_none == "":
            pass
        elif displacements[0] == "":
            query_all += f"(displacement_int <= {displacements[1]} ) AND "
        elif displacements[1] == "":
            query_all += f"(displacement_int >= {displacements[0]} ) AND "
        else:
            query_all += f"(displacement_int >= {displacements[0]} AND displacement_int <= {displacements[1]} ) AND "

    # 연비
    if fuelEfficiency and not fuelEfficiency == "전체":

        numbers = re.sub(r"[^0-9~]", "", fuelEfficiency)
        fuelEfficiencys = numbers.split("~")

        for i in range(len(fuelEfficiencys)):
            if fuelEfficiencys[i]:
                fuelEfficiencys[i] = float(fuelEfficiencys[i])
            is_none = str(fuelEfficiencys[i])

        if len(fuelEfficiencys) == 1 or is_none == "":
            pass
        elif fuelEfficiencys[0] == "":
            query_all += f"(fuel_efficiency_int_high <= {fuelEfficiencys[1]} ) AND "
        elif fuelEfficiencys[1] == "":
            query_all += f"(fuel_efficiency_int_low >= {fuelEfficiencys[0]} ) AND "
        else:
            query_all += f"(fuel_efficiency_int_low >= {fuelEfficiencys[0]} AND fuel_efficiency_int_high <= {fuelEfficiencys[1]} ) AND "

    # 차급
    ql = ""
    if grade and not grade == "전체":
        grades = grade.split(",")
        for grade1 in grades:
            ql += f'car_grade = "{grade1}" OR '
        query_all += "(" + ql[:-4] + ") AND "

    # 외형
    ql = ""
    if shape and not shape == "전체":
        shapes = shape.split(",")
        for shape1 in shapes:
            ql += f'appearance = "{shape1}" OR '
        query_all += "(" + ql[:-4] + ") AND "

    # 구동방식
    ql = ""
    if method and not method == "전체":
        methods = method.split(",")
        for method1 in methods:
            ql += f'drive_method = "{method1}" OR '
        query_all += "(" + ql[:-4] + ") AND "

    # 연료
    if fuel and not fuel == "전체":
        query_all += f'fuel = "{fuel}" AND'

    # 기본 정렬
    if not sort_criteria:
        sort_criteria == "출시일순"

    # 이름
    if name:
        search = "%{}%".format(name)
        query_type = "SELECT * FROM CAR WHERE " + query_all + " name LIKE %s ORDER BY "

        # 출시일순 최신
        if sort_criteria == "출시일순":
            query_all_list = engine.execute(
                query_type + "release_date DESC",
                [search],
            ).fetchall()

        # 연비순 오름차순
        if sort_criteria == "연비순":
            query_all_list = engine.execute(
                query_type + "fuel_efficiency DESC",
                [search],
            ).fetchall()

        # 가격순 내림차순
        if sort_criteria == "가격순":
            query_all_list = engine.execute(
                query_type + "price_int_low ASC",
                [search],
            ).fetchall()

        star = "(*) "

        count_query = engine.execute(
            "SELECT COUNT" + star + " FROM CAR WHERE " + query_all + " name LIKE %s",
            [search],
        )
        count = int(re.sub(r"[^0-9]", "", str(count_query.first())))

    # 이름 검색 안들어오면
    if not name:
        query_all = query_all[:-4]

        # 출시일순 최신
        if sort_criteria == "출시일순":
            query_all_list = Car.query.filter(text(query_all)).order_by(
                Car.release_date.desc()
            )
        # 연비순 오름차순
        if sort_criteria == "연비순":
            query_all_list = Car.query.filter(text(query_all)).order_by(
                Car.fuel_efficiency_int_high.desc()
            )
        # 가격순 내림차순
        if sort_criteria == "가격순":
            query_all_list = Car.query.filter(text(query_all)).order_by(
                Car.price_int_low.asc()
            )
        count = query_all_list.count()

    print("쿼리 출력", query_all)
    car = pagination(query_all_list, count, num)

    return car
