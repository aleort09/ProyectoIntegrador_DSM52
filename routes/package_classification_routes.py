from flask import Blueprint
from controllers.package_classification_controller import (
    get_package_classifications, get_package_classification_by_id,
    create_package_classification, update_package_classification, delete_package_classification
)

package_classification_bp = Blueprint('package_classification_bp', __name__)

@package_classification_bp.route('/clasificacion_paquetes', methods=['GET'])
def get_package_classifications_route():
    return get_package_classifications()

@package_classification_bp.route('/clasificacion_paquetes/<int:classification_id>', methods=['GET'])
def get_package_classification_route(classification_id):
    return get_package_classification_by_id(classification_id)

@package_classification_bp.route('/clasificacion_paquetes/create', methods=['POST'])
def create_package_classification_route():
    return create_package_classification()

@package_classification_bp.route('/clasificacion_paquetes/edit/<int:classification_id>', methods=['PUT'])
def update_package_classification_route(classification_id):
    return update_package_classification(classification_id)

@package_classification_bp.route('/clasificacion_paquetes/delete/<int:classification_id>', methods=['DELETE'])
def delete_package_classification_route(classification_id):
    return delete_package_classification(classification_id)