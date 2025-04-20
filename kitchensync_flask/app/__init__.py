
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from config import Config

db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)

    # Register blueprints
    from .views import auth_views, pantry_views, recipe_views
    app.register_blueprint(auth_views.bp)
    app.register_blueprint(pantry_views.bp)
    app.register_blueprint(recipe_views.bp)

    return app
