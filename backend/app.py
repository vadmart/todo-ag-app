from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, DeclarativeBase
from flask_bcrypt import Bcrypt
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'HDd5slzAtpZFCQ9S1oEB'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
CORS(app)


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(app, model_class=Base)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


class ModelToDictMixin(db.Model):
    __abstract__ = True

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Task(ModelToDictMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    deadline = db.Column(db.DateTime, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)


class User(ModelToDictMixin):
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
        return jsonify({'message': 'Користувач вже існує'}), 401
    else:
        user = User(username=username, password=bcrypt.generate_password_hash(password).decode('utf-8'))
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'Користувача створено'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({'access': access_token, 'username': user.username})
    else:
        return jsonify({'message': 'Помилка під час входу'}), 401


@app.route('/planned-tasks', methods=['GET'])
@jwt_required()
def planned_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id, completed=False).all()
    return jsonify([task.to_dict() for task in tasks])


@app.route('/completed-tasks', methods=['GET'])
@jwt_required()
def completed_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id, completed=True).all()
    return jsonify([task.to_dict() for task in tasks])


@app.route('/add-task', methods=['POST'])
@jwt_required()
def add_task():
    user_id = get_jwt_identity()
    data = request.get_json()
    name = data['name']
    deadline = datetime.strptime(data['deadline'], "%Y-%m-%dT%H:%M:%S.%fZ")
    task = Task(name=name, completed=False, deadline=deadline, user_id=int(user_id))
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict())


@app.route('/delete-planned-task', methods=['DELETE'])
@jwt_required()
def delete_planned_task():
    task_id = request.json['id']
    task = Task.query.filter_by(id=task_id).first()
    db.session.delete(task)
    db.session.commit()
    return jsonify(task.to_dict())


@app.route('/mark-task-as-completed', methods=['POST'])
@jwt_required()
def mark_task_as_completed():
    task_id = request.json['id']
    task = Task.query.filter_by(id=task_id).first()
    task.completed = True
    db.session.commit()
    return jsonify(task.to_dict())


@app.route('/delete-completed-tasks', methods=['DELETE'])
@jwt_required()
def delete_completed_tasks():
    user_id = get_jwt_identity()
    ids = request.json.get('ids')
    tasks_for_deletion = []
    if not ids:
        tasks = Task.query.filter_by(user_id=user_id)
        for task in tasks:
            tasks_for_deletion.append(task.to_dict())
            db.session.delete(task)
    else:
        for id_ in ids:
            task = Task.query.filter_by(id=id_).first()
            tasks_for_deletion.append(task.to_dict())
            db.session.delete(task)
    db.session.commit()
    return jsonify(tasks_for_deletion)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        app.run(debug=True, port=8000)
