from flask_sqlalchemy import Model, SQLAlchemy
from flask import Flask
from datetime import datetime

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


def serialize(object):
    print(object.__dict__)
    dict_obj = object.__dict__.copy()
    dict_obj.pop("_sa_instance_state", None)
    return dict_obj


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)


class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    created_by = db.Column(
        db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False
    )


class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    habit = db.Column(
        db.Integer, db.ForeignKey("habit.id", ondelete="CASCADE"), nullable=False
    )
    user = db.Column(
        db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False
    )
    timestamp = db.Column(db.DateTime, nullable=False, unique=True)
    is_checked = db.Column(db.Boolean, default=False)


with app.app_context():
    db.create_all()
    # user = User(username="abc", email="abc@eg.com", password="passpass", id=1)
    # habit = Habit(name="example", created_by=1, id=1)
    # db.session.add(user)
    # db.session.add(habit)
    # db.session.commit()
