from flask import Blueprint
from controllers.user_controller import (
    get_all_users, get_user_by_id, create_user, update_user, delete_user
)

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/usuarios', methods=['GET'])
def get_all_users_route():
    return get_all_users()

@user_bp.route('/usuarios/<int:user_id>', methods=['GET'])
def get_user_by_id_route(user_id):
    return get_user_by_id(user_id)

@user_bp.route('/usuarios/create', methods=['POST'])
def create_user_route():
    return create_user()

@user_bp.route('/usuarios/edit/<int:user_id>', methods=['PUT'])
def update_user_route(user_id):
    return update_user(user_id)

@user_bp.route('/usuarios/delete/<int:user_id>', methods=['DELETE'])
def delete_user_route(user_id):
    return delete_user(user_id)