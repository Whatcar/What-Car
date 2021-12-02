import config
from flask import Flask
from flask_caching import Cache
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restx import Api, Resource

from controller.detail_controller import detail
from controller.mbti_controller import mbti
from controller.search_controller import search
from controller.upload_controller import upload
from controller.worldcup_controller import worldcup
from db_connect import db
from models.car import *
from models.mbti_result import *
from models.worldcup import *


def create_app():
    app = Flask(__name__)
    api = Api(app, title="Whatcar's API Server", description="왓카 API 문서")
    api.add_namespace(detail)
    api.add_namespace(search)
    api.add_namespace(upload)
    api.add_namespace(mbti)
    api.add_namespace(worldcup)
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    CORS(app)

    app.config.from_object(config)
    cache = Cache(config={"CACHE_TYPE": "simple"})
    cache.init_app(app)
    db.init_app(app)
    Migrate().init_app(app, db)

    return app


if __name__ == "__main__":
    create_app().run("127.0.0.1", 5000, debug=True)
