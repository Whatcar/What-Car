import random

from models import Car, WorldCup, db
from werkzeug.exceptions import abort


def get_random_cars():
    TOURNAMENT_STEPS = 5

    worldcup = WorldCup.query.all()
    worldcup_num = len(worldcup)
    car_list = [WorldCup.to_dict(car) for car in worldcup]

    nums = set()
    while len(nums) != (2 ** TOURNAMENT_STEPS):
        nums.add(random.randint(0, worldcup_num - 1))

    select_id_list = []
    for num in nums:
        select_id_list.append(car_list[num])
    db.session.close()

    return select_id_list


def modify_worldcup_result(car_id):
    total = WorldCup.query.order_by(WorldCup.count.desc()).all()
    car_id_list = [car.car_id for car in total]
    if not car_id in car_id_list:
        abort(404, "후보에 해당하는 차량이 없습니다.")
    worldcup_count = WorldCup.query.filter_by(car_id=car_id).first()
    WorldCup.query.filter_by(car_id=car_id).update({"count": worldcup_count.count + 1})

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort(400, {"error": str(e)})
    db.session.close()

    return {"result": "success"}


def get_worldcup_result(car_id):

    total = WorldCup.query.order_by(WorldCup.count.desc()).all()
    car_id_list = [car.car_id for car in total]
    if not car_id in car_id_list:
        abort(404, "후보에 해당하는 차량이 없습니다.")

    total_count = [t.count for t in total]
    total_count_sum = sum(total_count)
    count_car_id = list(set(total_count))
    count_car_id.reverse()

    worldcup_result = []
    num = 1
    count = count_car_id[0]

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

    db.session.close()

    return worldcup_list
