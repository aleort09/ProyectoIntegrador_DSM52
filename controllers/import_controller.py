from flask import jsonify, request
from models.user import User
from models.product import Product
from models.package_detection import PackageDetection
from models.package_classification import PackageClassification
from models.remote_data import RemoteData
from config import db
from werkzeug.security import generate_password_hash
import pandas as pd

def import_users():
    try:
        data = request.get_json()
        if not isinstance(data, list) or len(data) == 0:
            return jsonify({"error": "No hay datos para importar"}), 400

        for user_data in data:
            new_user = User(
                Nombre=user_data.get('Nombre', ''),
                Apellido=user_data.get('Apellido', ''),
                Correo=user_data.get('Correo', ''),
                Contraseña=generate_password_hash(user_data.get('Contraseña', '12345')),  # Hash de la contraseña
                Telefono=user_data.get('Telefono', ''),
                Direccion=user_data.get('Direccion', ''),
                Rol=user_data.get('Rol', 'Cliente')
            )
            db.session.add(new_user)

        db.session.commit()
        return jsonify({"message": "Usuarios importados exitosamente", "inserted": len(data)}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al importar usuarios", "details": str(e)}), 500

def import_products():
    try:
        data = request.get_json()
        if not isinstance(data, list) or len(data) == 0:
            return jsonify({"error": "No hay datos para importar"}), 400

        for product_data in data:
            new_product = Product(
                Nombre=product_data.get('Nombre', ''),
                Stock=product_data.get('Stock', 0)
            )
            db.session.add(new_product)

        db.session.commit()
        return jsonify({"message": "Productos importados exitosamente", "inserted": len(data)}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al importar productos", "details": str(e)}), 500

def import_package_detections():
    try:
        data = request.get_json()
        if not isinstance(data, list) or len(data) == 0:
            return jsonify({"error": "No hay datos para importar"}), 400

        for detection_data in data:
            new_detection = PackageDetection(
                Distancia=detection_data.get('Distancia', 0.00),
                Estado=detection_data.get('Estado', 'No detectado')
            )
            db.session.add(new_detection)

        db.session.commit()
        return jsonify({"message": "Detecciones de paquetes importadas exitosamente", "inserted": len(data)}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al importar detecciones de paquetes", "details": str(e)}), 500

def import_package_classifications():
    try:
        data = request.get_json()
        if not isinstance(data, list) or len(data) == 0:
            return jsonify({"error": "No hay datos para importar"}), 400

        for classification_data in data:
            new_classification = PackageClassification(
                ID_Producto=classification_data.get('ID_Producto'),
                Etiqueta_Color=classification_data.get('Etiqueta_Color', 'Rojo'),
                Accion=classification_data.get('Accion', 'Izquierda')
            )
            db.session.add(new_classification)

        db.session.commit()
        return jsonify({"message": "Clasificaciones de paquetes importadas exitosamente", "inserted": len(data)}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al importar clasificaciones de paquetes", "details": str(e)}), 500

def import_remote_data():
    try:
        data = request.get_json()
        if not isinstance(data, list) or len(data) == 0:
            return jsonify({"error": "No hay datos para importar"}), 400

        for remote_data in data:
            new_remote_data = RemoteData(
                ID_Deteccion=remote_data.get('ID_Deteccion'),
                ID_Clasificacion=remote_data.get('ID_Clasificacion'),
                Estado_Conexion=remote_data.get('Estado_Conexion', 'Exitoso')
            )
            db.session.add(new_remote_data)

        db.session.commit()
        return jsonify({"message": "Datos remotos importados exitosamente", "inserted": len(data)}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al importar datos remotos", "details": str(e)}), 500