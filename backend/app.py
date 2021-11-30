from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

import config
from controller.detail_controller import detail_bp
from controller.mbti_controller import mbti_bp
from controller.search_controller import search_bp
from controller.upload_controller import upload_bp
from controller.worldcup_controller import worldcup_bp
from db_connect import db
from models.car import *
from models.mbti_result import *
from models.worldcup import *


def create_app():
    app = Flask(__name__)
    app.register_blueprint(detail_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(upload_bp)
    app.register_blueprint(mbti_bp)
    app.register_blueprint(worldcup_bp)
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    CORS(app)

    app.config.from_object(config)

    db.init_app(app)
    Migrate().init_app(app, db)

    # from models import car, mbti_question, mbti_result, worldcup

    return app


if __name__ == "__main__":
    create_app().run("127.0.0.1", 5000, debug=True)
