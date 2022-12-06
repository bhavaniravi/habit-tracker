from flask import Flask, render_template, Blueprint, request
from models import *
from sqlalchemy import extract

habit = Blueprint("habit", __name__, url_prefix="/habit")
log = Blueprint("log", __name__, url_prefix="/log")


@app.route("/")
def index():
    return render_template("index.html")


@habit.route("/", methods=["GET"])
def list_habit():
    habits = db.session.execute(db.select(Habit)).scalars()
    response = [serialize(habit) for habit in habits]
    return {"data": response, "status": "success"}


@habit.route("/<id>", methods=["GET"])
def get_habit(id):
    habit = db.get_or_404(Habit, id)
    return {"data": serialize(habit), "status": "success"}


@habit.route("/", methods=["POST"])
def create_habit():
    data = request.get_json()
    habit = Habit(**data)
    db.session.add(habit)
    db.session.commit()
    response = serialize(habit)
    return {"data": response, "status": "success"}


@log.route("/", methods=["POST"])
def create_log():
    data = request.get_json()
    log = Log(
        is_checked=True,
        timestamp=datetime.strptime(data.get("timestamp"), "%Y-%m-%d").date(),
        user=data.get("created_by"),
        habit=data.get("habit"),
    )
    db.session.add(log)
    db.session.commit()
    response = serialize(log)
    return {"data": response, "status": "success"}


@log.route("/list", methods=["POST", "GET"])
def list_logs():
    data = request.get_json()
    filters = data.get("filters", {})
    try:
        logs = db.session.execute(
            db.select(Log).filter(
                extract("month", Log.timestamp) == filters["month"],
                extract("year", Log.timestamp) == filters["year"],
                Log.is_checked == True,
                Log.habit == filters["habit"],
            )
        ).scalars()
    except KeyError:
        return {
            "status": "error",
            "message": "Need month and year filters to extract log",
        }
    response = [serialize(log) for log in logs]
    return {"data": response, "status": "success"}


app.register_blueprint(habit)
app.register_blueprint(log)

if __name__ == "__main__":
    app.run(debug=True, port=8888)
