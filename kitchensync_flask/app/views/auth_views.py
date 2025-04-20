
from flask import Blueprint, render_template, request, flash, redirect, url_for
from app.controllers.auth_controller import register_user, login_user

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        response = register_user()
        if response[1] == 201:
            flash('Registration successful! Please login.', 'success')
            return redirect(url_for('auth.login'))
        flash(response[0]['error'], 'error')
    return render_template('auth/register.html')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        response = login_user()
        if response[1] == 200:
            flash('Login successful!', 'success')
            return redirect(url_for('main.index'))
        flash(response[0]['error'], 'error')
    return render_template('auth/login.html')

@bp.route('/logout')
def logout():
    # Add logout logic here
    flash('You have been logged out.', 'info')
    return redirect(url_for('main.index'))
