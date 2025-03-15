from flask import Blueprint
from controllers.product_controller import (
    get_products, get_product_by_id, create_product, update_product, delete_product
)

product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/productos', methods=['GET'])
def get_products_route():
    return get_products()

@product_bp.route('/productos/<int:product_id>', methods=['GET'])
def get_product_route(product_id):
    return get_product_by_id(product_id)

@product_bp.route('/productos/create', methods=['POST'])
def create_product_route():
    return create_product()

@product_bp.route('/productos/edit/<int:product_id>', methods=['PUT'])
def update_product_route(product_id):
    return update_product(product_id)

@product_bp.route('/productos/delete/<int:product_id>', methods=['DELETE'])
def delete_product_route(product_id):
    return delete_product(product_id)