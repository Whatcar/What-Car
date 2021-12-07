from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restx import Api

import config
from bcrypt_generator import bcrypt
from controller import detail, gallary, mbti, search, upload, worldcup
from db_connect import db


def create_app():
    app = Flask(__name__)
    api = Api(app, title="Whatcar's API Server", description="왓카 API 문서")
    api.add_namespace(detail)
    api.add_namespace(search)
    api.add_namespace(upload)
    api.add_namespace(mbti)
    api.add_namespace(worldcup)
    api.add_namespace(gallary)
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    CORS(app)

    app.config.from_object(config)

    db.init_app(app)
    Migrate().init_app(app, db)

    bcrypt.init_app(app)
    # AI model
    # from ai import detection, model

    return app


if __name__ == "__main__":
    create_app().run("127.0.0.1", 5000, debug=True)
