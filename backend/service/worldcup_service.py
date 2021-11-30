import itertools
import random

from flask.json import jsonify
from models.car import *
from models.worldcup import *


def select_car():
    worldcup = WorldCup.query.all()
    car_list = [WorldCup.to_dict(car) for car in worldcup]

    nums = set()
    while len(nums) != 32:
        nums.add(random.randint(0, 72))

    select_id_list = []
    for num in nums:
        select_id_list.append(car_list[num])

    return select_id_list


def modify_worldcup_result(car_id):
    worldcup_count = WorldCup.query.filter_by(car_id=car_id).first()
    WorldCup.query.filter_by(car_id=car_id).update({"count": worldcup_count.count + 1})
    db.session.commit()

    return {"result": "success"}


def get_worldcup_result(car_id):

    total = WorldCup.query.order_by(WorldCup.count.desc()).all()
    total_count = [t.count for t in total]
    total_count_sum = sum(total_count)
    count_car_id = list(set(total_count))
    count_car_id.reverse()

    worldcup_result = []
    num = 1
    count = count_car_id[0]
    print(len(total))
    print(count_car_id)

    for t in total:
        original = Car.query.filter(Car.id == t.car_id).first()

        result = {
            "car_id": t.car_id,
            "name": original.name,
            "count": t.count,
            "rate": round((t.count / total_count_sum) * 100, 2),
            "rank": num,
            "photolink": original.aws_url,
            "is_result": True,
        }

        if count == t.count:
            if not t.car_id == car_id:
                result["is_result"] = False
            worldcup_result.append(result)
            continue
        else:
            num += 1
            count = t.count
            result["rank"] = num
            if not t.car_id == car_id:
                result["is_result"] = False

            worldcup_result.append(result)
    worldcup_list = []
    worldcup_list = [car for car in worldcup_result if car["is_result"] == True]
    worldcup_list.append([car for car in worldcup_result if car["rank"] <= 3])

    return worldcup_list
