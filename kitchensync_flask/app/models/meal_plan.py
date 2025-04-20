
from app import db
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import JSON

class MealPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    meals = db.Column(JSON)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="meal_plans")
