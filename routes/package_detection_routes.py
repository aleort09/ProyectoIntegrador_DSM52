from flask import Blueprint
from controllers.package_detection_controller import (
    get_package_detections, get_package_detection_by_id, create_package_detection,
    update_package_detection, delete_package_detection
)

package_detection_bp = Blueprint('package_detection_bp', __name__)

@package_detection_bp.route('/deteccion_paquetes', methods=['GET'])
def get_package_detections_route():
    return get_package_detections()

@package_detection_bp.route('/deteccion_paquetes/<int:detection_id>', methods=['GET'])
def get_package_detection_route(detection_id):
    return get_package_detection_by_id(detection_id)

@package_detection_bp.route('/deteccion_paquetes/create', methods=['POST'])
def create_package_detection_route():
    return create_package_detection()

@package_detection_bp.route('/deteccion_paquetes/edit/<int:detection_id>', methods=['PUT'])
def update_package_detection_route(detection_id):
    return update_package_detection(detection_id)

@package_detection_bp.route('/deteccion_paquetes/delete/<int:detection_id>', methods=['DELETE'])
def delete_package_detection_route(detection_id):
    return delete_package_detection(detection_id)