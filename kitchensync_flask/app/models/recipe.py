
from app import db
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import JSON

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    ingredients = db.Column(JSON)
    instructions = db.Column(JSON)
    prep_time = db.Column(db.Integer)
    cook_time = db.Column(db.Integer)
    image_url = db.Column(db.String(500))
    dietary_tags = db.Column(JSON)
    meal_type = db.Column(JSON)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="recipes")
