from models import Ai_Result, Car, CarColor, Gallary
from werkzeug.exceptions import abort


def pagination(query_list, num):

    query_data_num = query_list.count()
    print(query_data_num)
    per_page = 9
    range_start = per_page * (num - 1)
    total_page = query_data_num // per_page
    rest_data = query_data_num % per_page

    # # 검색 결과가 없으면
    if query_data_num == 0:
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
    result = list()
    result.append({"result_num": query_data_num})
    for car in query_list:
        gallary_data = Gallary.query.filter(Gallary.id == car.gallary_id).first()
       
        result.append(
            {
                "car_id": car.car_id,
                "ai_result_id": car.id,
                "similarity": car.similarity,
                "car_url": car.most_similar_car_url,
                "nickname": gallary_data.nickname,
            }
        )

    return result


def get_detail(id):
    car = Car.query.filter(Car.id == id).first()
    car_color = CarColor.query.filter(CarColor.car_id == id).first()

    car_content = Car.to_dict(car)
    car_color = CarColor.to_dict(car_color)
    return car_content, car_color


def get_same_id_gallary_img(id, num):

    same_id_gallary = Ai_Result.query.filter(
        Ai_Result.car_id == id, Ai_Result.gallary_id != None
    )

    car_name = Car.query.filter(Car.id == int(id)).first().name

    gallary_contents = pagination(same_id_gallary, num)

    return {"car_name": car_name, "gallery_contents": gallary_contents}
