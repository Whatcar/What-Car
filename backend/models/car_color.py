from db_connect import db
from flask_restx import fields


# 차량 색상 정보
class CarColor(db.Model):
    __tablename__ = "car_color"
    car_id = db.Column(
        db.Integer,
        db.ForeignKey("car.id", ondelete="CASCADE", onupdate="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    color_name = db.Column(db.Text, nullable=True)
    color_url = db.Column(db.Text, nullable=True)

    def to_dict(self):
        color_name = self.color_name.replace("'", "").replace("[", "").replace("]", "")
        color_name = color_name.split(", ")

        color_url = self.color_url.replace("'", "").replace("[", "").replace("]", "")
        color_url = color_url.split(", ")

        return {"color_name": color_name, "color_url": color_url}

    response_model = {
        "color_name": fields.String(
            required=True,
            description="색상 이름 리스트",
            example="['우유니 화이트', '세빌 실버', '마칼루 그레이', '비크 블랙', '레피스 블루', '태즈먼 블루', '블레이징 레드', '베르비에 화이트', '마칼루 그레이']",
        ),
        "color_url": fields.String(
            required=True,
            description="색상 url 리스트",
            example="['https://imgauto-phinf.pstatic.net/20210621_280/auto_1624258007061Rg3Pz_PNG/20210621154532_NLehrXkL.png', 'https://imgauto-phinf.pstatic.net/20210621_19/auto_1624258007300o5O1F_PNG/20210621154544_MVxmuHyH.png', 'https://imgauto-phinf.pstatic.net/20210621_212/auto_1624258007483KQWo0_PNG/20210621154554_6tb9V45M.png', 'https://imgauto-phinf.pstatic.net/20210621_213/auto_1624258007708aDUHv_PNG/20210621154601_82UuaHzH.png', 'https://imgauto-phinf.pstatic.net/20210621_4/auto_1624258007903yqqdJ_PNG/20210621154610_wfanFeXW.png', 'https://imgauto-phinf.pstatic.net/20210621_38/auto_1624258008034a6Yyi_PNG/20210621154617_5JsUfEKD.png', 'https://imgauto-phinf.pstatic.net/20210621_29/auto_1624258008382mHiH7_PNG/20210621154624_tPSsKWnd.png', 'https://imgauto-phinf.pstatic.net/20210621_140/auto_1624258008600kkvnT_PNG/20210621154632_a3QeCeBe.png', 'https://imgauto-phinf.pstatic.net/20210621_138/auto_1624258008790SAmEd_PNG/20210621154640_6U7x7Rf8.png']",
        ),
    }
