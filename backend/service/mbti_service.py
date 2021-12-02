from models.mbti_result import *
from werkzeug.exceptions import abort


def mbti_result(mbti):

    total = MbtiResult.query.order_by(MbtiResult.count.desc())
    mbti_id_list = [mbti.type for mbti in total]
    if not mbti in mbti_id_list:
        abort(404, "MBTI 타입 중에 해당하는 타입이 없습니다.")

    mbti_count = MbtiResult.query.filter_by(type=mbti).first()
    MbtiResult.query.filter_by(type=mbti).update({"count": mbti_count.count + 1})
    db.session.commit()

    total_count = [t.count for t in total]
    total_count_sum = sum(total_count)
    count_type = list(set(total_count))
    count_type.reverse()

    mbti_result = []
    num = 1
    count = count_type[0]

    for t in total:
        result = {
            "type": t.type,
            "count": t.count,
            "rate": round((t.count / total_count_sum) * 100, 2),
            "rank": num,
            "is_result": True,
        }

        if count == t.count:
            if not t.type == mbti:
                result["is_result"] = False

            mbti_result.append(result)
            continue

        num += 1
        count = t.count
        result["rank"] = num
        if not t.type == mbti:
            result["is_result"] = False

        mbti_result.append(result)

    return mbti_result
