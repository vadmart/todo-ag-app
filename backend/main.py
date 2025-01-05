from flask import Flask, Response, jsonify, request, make_response
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column

app = Flask(__name__)
app.config['SECRET_KEY'] = 'HDd5slzAtpZFCQ9S1oEB'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
CORS(app)

db = SQLAlchemy(app)
jwt = JWTManager(app)


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    deadline = db.Column(db.DateTime)
    user_id = mapped_column(ForeignKey("user.id"), nullable=False)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    tasks = db.relationship('Task', backref='user')


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({'message': 'User already exists'}), 401
    else:
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created'}), 201


if __name__ == "__main__":
    with app.app_context():
        app.run(debug=True)
