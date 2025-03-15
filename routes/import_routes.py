from flask import Blueprint
from controllers.import_controller import (
    import_users, import_products, import_package_detections,
    import_package_classifications, import_remote_data
)

import_bp = Blueprint('import_bp', __name__)

@import_bp.route('/usuarios', methods=['POST'])
def import_users_route():
    return import_users()

@import_bp.route('/productos', methods=['POST'])
def import_products_route():
    return import_products()

@import_bp.route('/deteccion_paquetes', methods=['POST'])
def import_package_detections_route():
    return import_package_detections()

@import_bp.route('/clasificacion_paquetes', methods=['POST'])
def import_package_classifications_route():
    return import_package_classifications()

@import_bp.route('/datos_remotos', methods=['POST'])
def import_remote_data_route():
    return import_remote_data()