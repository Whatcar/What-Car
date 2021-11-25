import re

import config
from models.car import Car
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from werkzeug.exceptions import abort

engine = create_engine(config.SQLALCHEMY_DATABASE_URI)


def pagination(query_list, count, num):
    # query_data_num = len(query_list)
    query_data_num = count
    per_page = 16
    range_start = per_page * (num - 1)
    total_page = query_data_num // per_page
    rest_data = query_data_num % per_page

    # # 검색 결과가 없으면
    # if count == 0:
    #     car_list = []
    if count == 0:
        abort(404, "검색 결과가 없습니다.")
    # per_page가 다 채워지지 않은 마지막 페이지를 넘으면
    if num >= (total_page + 1) and rest_data == 0:
        abort(404, "페이지 범위를 초과했습니다.")
    # 전체 데이터 개수//페이지 당 데이터가 들어온 페이지 범위를 넘으면
    if num > (total_page + 1):
        abort(404, "페이지 범위를 초과했습니다.")
    # 전체 데이터 개수//페이지 당 데이터가 들어온 페이지 같으면
    if num == (total_page + 1) and not rest_data == 0:
        # 범위 시작값부터 마지막 데이터까지
        query_list = query_list[range_start:query_data_num]
    else:
        query_list = query_list[range_start : per_page * num]

    car_list = [Car.to_dict_part(car) for car in query_list]
    # car = car_list.paginate(page, per_page=16)
    # print(len(car_list))
    return {"result_num": count}, car_list


def car_list(num):
    car_list = Car.query.order_by(Car.release_date.asc())
    count = car_list.count()
    car = pagination(car_list, count, num)
    return car


def search(
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
        fuelEfficiencys = [float(fuelEfficiency) for fuelEfficiency in fuelEfficiencys]

        q = f"(fuel_efficiency_int_low >= {fuelEfficiencys[0]} AND fuel_efficiency_int_high <= {fuelEfficiencys[1]} ) AND "
        query_all += q

    # 차급
    ql = ""
    if grade == "전체":
        pass
    elif grade == "":
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
    if shape == "전체":
        pass
    elif shape == "":
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
    if method == "전체":
        pass
    elif method == "":
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

        # 출시일순 최신
        if sort_criteria == "출시일순" or sort_criteria == "":
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

    else:
        search = "%{}%".format(name)
        # 출시일순 최신
        if sort_criteria == "출시일순" or sort_criteria == "":
            query_all_list = engine.execute(
                "SELECT * FROM Car WHERE "
                + query_all
                + " name LIKE %s ORDER BY release_date DESC",
                [search],
            ).fetchall()

        # 연비순 오름차순
        if sort_criteria == "연비순":
            query_all_list = engine.execute(
                "SELECT * FROM Car WHERE "
                + query_all
                + " name LIKE %s ORDER BY fuel_efficiency DESC",
                [search],
            ).fetchall()

        # 가격순 내림차순
        if sort_criteria == "가격순":
            query_all_list = engine.execute(
                "SELECT * FROM Car WHERE "
                + query_all
                + " name LIKE %s ORDER BY price_int_low ASC",
                [search],
            ).fetchall()

        star = "(*) "

        count_query = engine.execute(
            "SELECT COUNT" + star + " FROM Car WHERE " + query_all + " name LIKE %s",
            [search],
        )
        count = str(count_query.first())
        count = re.sub(r"[^0-9]", "", count)
        count = int(count)

    print("쿼리 출력", query_all)
    # print("개수!!!!!!!!", len(car_list))
    car = pagination(query_all_list, count, num)

    return car
