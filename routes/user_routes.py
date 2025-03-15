from flask import Blueprint
from controllers.user_controller import (
    get_all_users, get_user_by_id, create_user, update_user, delete_user, check_email_exists, get_user_by_id, register_user, change_password, login_user
)

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/', methods=['GET'])
def get_all_users_route():
    return get_all_users()

@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user_by_id_route(user_id):
    return get_user_by_id(user_id)

@user_bp.route('/create', methods=['POST'])
def create_user_route():
    return create_user()

@user_bp.route('/edit/<int:user_id>', methods=['PUT'])
def update_user_route(user_id):
    return update_user(user_id)

@user_bp.route('/delete/<int:user_id>', methods=['DELETE'])
def delete_user_route(user_id):
    return delete_user(user_id)

@user_bp.route('/existe/<string:correo>', methods=['GET'])
def check_email_route(correo):
    return check_email_exists(correo)

@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user_route(user_id):
    return get_user_by_id(user_id)

@user_bp.route('/registro', methods=['POST'])
def register_user_route():
    return register_user()

@user_bp.route('/cambiar_password', methods=['POST'])
def change_password_route():
    return change_password()

@user_bp.route('/login', methods=['POST'])
def login_route():
    return login_user()