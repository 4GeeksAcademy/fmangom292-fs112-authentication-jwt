"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS

from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# JWT configuration
app.config["JWT_SECRET_KEY"] = "super-secreto-apoteosico"  # Change this!
jwt = JWTManager(app)

# CORS configuration
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/signup', methods=['POST'])
def handle_signup():

    body = request.get_json()

    if not body or 'email' not in body or 'password' not in body:
        raise APIException('Email and password are required', status_code=400)

    new_user = User(
        email=body.get("email"),
        password=body.get("password"),
        surname=body.get("surname"),
        name=body.get("name"),
        address=body.get("address"),
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "User created successfully",
        "ok": True,
    }

    return jsonify(response_body), 201


@app.route('/login', methods=['POST'])
def handle_login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    query_user = db.session.execute(select(User).where(
        User.email == email)).scalar_one_or_none()

    print("query_user", query_user)

    if query_user is None:
        return jsonify({"msg": "email does not exist"}), 404

    if email != query_user.email or password != query_user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"user_id": query_user.id, "user_logged": query_user.email, "access_token": access_token}, 201)


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
