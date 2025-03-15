from flask import jsonify, request
from models.remote_data import RemoteData
from config import db

def get_remote_data():
    estado_conexion = request.args.get('estado_conexion')
    query = RemoteData.query
    if estado_conexion:
        query = query.filter_by(Estado_Conexion=estado_conexion)
    remote_data = query.all()
    return jsonify([data.to_dict() for data in remote_data]), 200

def get_remote_data_by_id(data_id):
    remote_data = RemoteData.query.get(data_id)
    if remote_data:
        return jsonify(remote_data.to_dict()), 200
    else:
        return jsonify({"error": "Dato remoto no encontrado"}), 404

def create_remote_data():
    data = request.get_json()
    new_remote_data = RemoteData(
        ID_Deteccion=data.get('ID_Deteccion'),
        ID_Clasificacion=data.get('ID_Clasificacion'),
        Estado_Conexion=data.get('Estado_Conexion', 'Exitoso')
    )
    db.session.add(new_remote_data)
    db.session.commit()
    return jsonify({"message": "Dato remoto creado exitosamente"}), 201

def update_remote_data(data_id):
    data = request.get_json()
    remote_data = RemoteData.query.get(data_id)
    if remote_data:
        remote_data.ID_Deteccion = data.get('ID_Deteccion', remote_data.ID_Deteccion)
        remote_data.ID_Clasificacion = data.get('ID_Clasificacion', remote_data.ID_Clasificacion)
        remote_data.Estado_Conexion = data.get('Estado_Conexion', remote_data.Estado_Conexion)
        db.session.commit()
        return jsonify({"message": "Dato remoto actualizado exitosamente"}), 200
    else:
        return jsonify({"error": "Dato remoto no encontrado"}), 404

def delete_remote_data(data_id):
    remote_data = RemoteData.query.get(data_id)
    if remote_data:
        db.session.delete(remote_data)
        db.session.commit()
        return jsonify({"message": "Dato remoto eliminado exitosamente"}), 200
    else:
        return jsonify({"error": "Dato remoto no encontrado"}), 404