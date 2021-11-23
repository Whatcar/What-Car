from db_connect import db

# Mbti 질문 정보
class Mbti_question(db.Model):
    __tablename__ = "mbti_question"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    question = db.Column(db.String(255), nullable=False)
    weight = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {"question": self.question, "weight": self.weight}
