from flask import jsonify, request
from models.package_detection import PackageDetection
from config import db

def get_package_detections():
    estado = request.args.get('estado')
    query = PackageDetection.query
    if estado:
        query = query.filter_by(Estado=estado)
    detections = query.all()
    return jsonify([detection.to_dict() for detection in detections]), 200

def get_package_detection_by_id(detection_id):
    detection = PackageDetection.query.get(detection_id)
    if detection:
        return jsonify(detection.to_dict()), 200
    else:
        return jsonify({"error": "Detección no encontrada"}), 404

def create_package_detection():
    data = request.get_json()
    new_detection = PackageDetection(Distancia=data['Distancia'], Estado=data['Estado'])
    db.session.add(new_detection)
    db.session.commit()
    return jsonify({"message": "Detección creada exitosamente"}), 201

def update_package_detection(detection_id):
    data = request.get_json()
    detection = PackageDetection.query.get(detection_id)
    if detection:
        detection.Distancia = data.get('Distancia', detection.Distancia)
        detection.Estado = data.get('Estado', detection.Estado)
        db.session.commit()
        return jsonify({"message": "Detección actualizada exitosamente"}), 200
    else:
        return jsonify({"error": "Detección no encontrada"}), 404

def delete_package_detection(detection_id):
    detection = PackageDetection.query.get(detection_id)
    if detection:
        db.session.delete(detection)
        db.session.commit()
        return jsonify({"message": "Detección eliminada exitosamente"}), 200
    else:
        return jsonify({"error": "Detección no encontrada"}), 404