from flask import Blueprint
from controllers.remote_data_controller import (
    get_remote_data, get_remote_data_by_id, create_remote_data,
    update_remote_data, delete_remote_data
)

remote_data_bp = Blueprint('remote_data_bp', __name__)

@remote_data_bp.route('/', methods=['GET'])
def get_remote_data_route():
    return get_remote_data()

@remote_data_bp.route('/<int:data_id>', methods=['GET'])
def get_remote_data_by_id_route(data_id):
    return get_remote_data_by_id(data_id)

@remote_data_bp.route('/create', methods=['POST'])
def create_remote_data_route():
    return create_remote_data()

@remote_data_bp.route('/edit/<int:data_id>', methods=['PUT'])
def update_remote_data_route(data_id):
    return update_remote_data(data_id)

@remote_data_bp.route('/delete/<int:data_id>', methods=['DELETE'])
def delete_remote_data_route(data_id):
    return delete_remote_data(data_id)