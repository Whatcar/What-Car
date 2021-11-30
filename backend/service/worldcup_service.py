import itertools
import random

from flask.json import jsonify
from models.car import *
from models.worldcup import *


def select_car():
    worldcup = WorldCup.query.all()
    id_list = [car.car_id for car in worldcup]
    car_list = [WorldCup.to_dict(car) for car in worldcup]
    nums = set()
    while len(nums) != 32:
        nums.add(random.randint(0, 72))
    select_id_list = []
    for num in nums:
        select_id_list.append(car_list[num])
    print(id_list)
    print(nums)
    print(select_id_list)
    return select_id_list


def modify_worldcup_result(car_id):
    print("들어옴")
    print(car_id)
    worldcup_count = WorldCup.query.filter_by(car_id=car_id).first()
    WorldCup.query.filter_by(car_id=car_id).update({"count": worldcup_count.count + 1})
    db.session.commit()

    return {"result": "success"}


def get_worldcup_result(car_id):

    total = WorldCup.query.order_by(WorldCup.count.desc())
    total_count = [t.count for t in total]
    total_count_sum = sum(total_count)
    count_car_id = list(set(total_count))
    count_car_id.reverse()

    worldcup_result = []
    num = 1
    count = count_car_id[0]

    for t in total:
        original = Car.query.filter(Car.id == t.car_id).first()
        is_result = {
            "car_id": t.car_id,
            "name": original.name,
            "count": t.count,
            "rate": round((t.count / total_count_sum) * 100, 2),
            "rank": num,
            "photolink": original.aws_url,
            "is_result": True,
        }
        is_not_result = {
            "car_id": t.car_id,
            "name": original.name,
            "count": t.count,
            "rate": round((t.count / total_count_sum) * 100, 2),
            "rank": num,
            "photolink": original.aws_url,
            "is_result": False,
        }

        if count == t.count:
            if t.car_id == car_id:
                worldcup_result.append(is_result)
            else:
                worldcup_result.append(is_not_result)
            continue

        num += 1
        count = t.count
        if t.car_id == car_id:
            worldcup_result.append(is_result)
        else:
            worldcup_result.append(is_not_result)

    worldcup_result = [car for car in worldcup_result if car["rank"] <= 3]

    return worldcup_result
