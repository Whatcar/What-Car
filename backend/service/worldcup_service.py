import itertools
import random

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


def worldcup_result(car_id):
    worldcup_count = WorldCup.query.filter_by(car_id=car_id).first()
    WorldCup.query.filter_by(car_id=car_id).update({"count": worldcup_count.count + 1})
    db.session.commit()

    total = WorldCup.query.order_by(WorldCup.count.desc())
    total_count = [t.count for t in total]
    total_count_sum = sum(total_count)
    count_car_id = list(set(total_count))
    count_car_id.reverse()

    worldcup_result = []
    num = 1
    count = count_car_id[0]
    print(count)

    for t in total:
        if count == t.count:
            if t.car_id == car_id:
                worldcup_result.append(
                    {
                        "car_id": t.car_id,
                        "count": t.count,
                        "rate": round((t.count / total_count_sum) * 100, 2),
                        "rank": num,
                        "photolink": t.photolink,
                        "is_result": True,
                    }
                )
            else:
                worldcup_result.append(
                    {
                        "car_id": t.car_id,
                        "count": t.count,
                        "rate": round((t.count / total_count_sum) * 100, 2),
                        "rank": num,
                        "photolink": t.photolink,
                        "is_result": False,
                    }
                )
            continue
        else:
            num += 1
            count = t.count
            if t.car_id == car_id:
                worldcup_result.append(
                    {
                        "car_id": t.car_id,
                        "count": t.count,
                        "rate": round((t.count / total_count_sum) * 100, 2),
                        "rank": num,
                        "photolink": t.photolink,
                        "is_result": True,
                    }
                )
            else:
                worldcup_result.append(
                    {
                        "car_id": t.car_id,
                        "count": t.count,
                        "rate": round((t.count / total_count_sum) * 100, 2),
                        "rank": num,
                        "photolink": t.photolink,
                        "is_result": False,
                    }
                )
    worldcup_result = [car for car in worldcup_result if car["rank"] <= 3]

    return worldcup_result
