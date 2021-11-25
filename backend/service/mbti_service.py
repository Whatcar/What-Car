from models.mbti_result import *
from werkzeug.exceptions import abort


def mbti_result(mbti):
    mbti_count = Mbti_result.query.filter_by(type=mbti).first()
    Mbti_result.query.filter_by(type=mbti).update({"count": mbti_count.count + 1})
    db.session.commit()

    total = Mbti_result.query.order_by(Mbti_result.count.desc())
    total_count = [t.count for t in total]
    total_count_sum = sum(total_count)
    count_type = list(set(total_count))
    count_type.reverse()

    mbti_result = []
    num = 1
    count = count_type[0]

    for t in total:
        if count == t.count:
            if t.type == mbti:
                mbti_result.append(
                    {
                        "type": t.type,
                        "count": t.count,
                        "rate": round((t.count / total_count_sum) * 100, 2),
                        "rank": num,
                        "is_result": True,
                    }
                )
            else:
                mbti_result.append(
                    {
                        "type": t.type,
                        "count": t.count,
                        "rate": round((t.count / total_count_sum) * 100, 2),
                        "rank": num,
                        "is_result": False,
                    }
                )
            continue
        else:
            num += 1
            count = t.count
            if t.type == mbti:
                mbti_result.append(
                    {
                        "type": t.type,
                        "count": t.count,
                        "rate": round((t.count / total_count_sum) * 100, 2),
                        "rank": num,
                        "is_result": True,
                    }
                )
            else:
                mbti_result.append(
                    {
                        "type": t.type,
                        "count": t.count,
                        "rate": round((t.count / total_count_sum) * 100, 2),
                        "rank": num,
                        "is_result": False,
                    }
                )

    return mbti_result
