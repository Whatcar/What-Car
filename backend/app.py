from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

import config
from controller.detailController import detail_bp
from controller.searchController import search_bp
from controller.uploadController import upload_bp
from db_connect import db
from models.car import *
from models.mbti_question import *
from models.mbti_result import *
from models.worldcup import *


def create_app():
    app = Flask(__name__)
    app.register_blueprint(detail_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(upload_bp)
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    CORS(app)

    app.config.from_object(config)

    db.init_app(app)
    Migrate().init_app(app, db)

    # from models import car, mbti_question, mbti_result, worldcup

    return app


if __name__ == "__main__":
    create_app().run("127.0.0.1", 5000, debug=True)
