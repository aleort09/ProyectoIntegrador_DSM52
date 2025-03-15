from flask import jsonify, request
from models.package_classification import PackageClassification
from config import db

def get_package_classifications():
    etiqueta_color = request.args.get('etiqueta_color')
    accion = request.args.get('accion')
    query = PackageClassification.query
    if etiqueta_color:
        query = query.filter_by(Etiqueta_Color=etiqueta_color)
    if accion:
        query = query.filter_by(Accion=accion)
    classifications = query.all()
    return jsonify([classification.to_dict() for classification in classifications]), 200

def get_package_classification_by_id(classification_id):
    classification = PackageClassification.query.get(classification_id)
    if classification:
        return jsonify(classification.to_dict()), 200
    else:
        return jsonify({"error": "Clasificación no encontrada"}), 404

def create_package_classification():
    data = request.get_json()
    new_classification = PackageClassification(
        ID_Producto=data['ID_Producto'],
        Etiqueta_Color=data['Etiqueta_Color'],
        Accion=data['Accion']
    )
    db.session.add(new_classification)
    db.session.commit()
    return jsonify({"message": "Clasificación creada exitosamente"}), 201

def update_package_classification(classification_id):
    data = request.get_json()
    classification = PackageClassification.query.get(classification_id)
    if classification:
        classification.ID_Producto = data.get('ID_Producto', classification.ID_Producto)
        classification.Etiqueta_Color = data.get('Etiqueta_Color', classification.Etiqueta_Color)
        classification.Accion = data.get('Accion', classification.Accion)
        db.session.commit()
        return jsonify({"message": "Clasificación actualizada exitosamente"}), 200
    else:
        return jsonify({"error": "Clasificación no encontrada"}), 404

def delete_package_classification(classification_id):
    classification = PackageClassification.query.get(classification_id)
    if classification:
        db.session.delete(classification)
        db.session.commit()
        return jsonify({"message": "Clasificación eliminada exitosamente"}), 200
    else:
        return jsonify({"error": "Clasificación no encontrada"}), 404