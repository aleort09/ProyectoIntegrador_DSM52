from flask import jsonify, request
from models.user import User
from config import db
from utils.auth import check_failed_attempts, increment_failed_attempts
from datetime import datetime, timedelta

def get_all_users():
    try:
        nombre = request.args.get('nombre')
        apellido = request.args.get('apellido')

        query = User.query

        if nombre:
            query = query.filter(User.Nombre.like(f'%{nombre}%'))
        if apellido:
            query = query.filter(User.Apellido.like(f'%{apellido}%'))

        users = query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        return jsonify({"error": "Error al obtener registros", "details": str(e)}), 500

def get_user_by_id(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            return jsonify(user.to_dict()), 200
        else:
            return jsonify({"error": "Registro no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": "Error al obtener el registro", "details": str(e)}), 500

def create_user():
    try:
        data = request.get_json()
        new_user = User(
            Nombre=data['Nombre'],
            Apellido=data['Apellido'],
            Correo=data['Correo'],
            Telefono=data.get('Telefono'),
            Direccion=data.get('Direccion'),
            Contraseña=data['Contraseña'],
            Rol=data.get('Rol', 'Cliente')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Registro creado exitosamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al crear un nuevo registro", "details": str(e)}), 500

def update_user(user_id):
    try:
        data = request.get_json()
        user = User.query.get(user_id)
        if user:
            user.Nombre = data.get('Nombre', user.Nombre)
            user.Apellido = data.get('Apellido', user.Apellido)
            user.Correo = data.get('Correo', user.Correo)
            user.Telefono = data.get('Telefono', user.Telefono)
            user.Direccion = data.get('Direccion', user.Direccion)
            user.Contraseña = data.get('Contraseña', user.Contraseña)
            user.Rol = data.get('Rol', user.Rol)
            db.session.commit()
            return jsonify({"message": "Registro actualizado exitosamente"}), 200
        else:
            return jsonify({"error": "Registro no encontrado"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar el registro", "details": str(e)}), 500

def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "Registro eliminado exitosamente"}), 200
        else:
            return jsonify({"error": "Registro no encontrado"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al eliminar el registro", "details": str(e)}), 500

def check_email_exists(correo):
    bloqueo = check_failed_attempts(correo)
    if bloqueo["blocked"]:
        return jsonify({"status": "blocked", "message": f"Cuenta bloqueada. Intenta en {bloqueo['tiempo_restante']} minutos."}), 403

    user = User.query.filter_by(Correo=correo).first()
    if user:
        failed_attempts.pop(correo, None)
        return jsonify({"status": "success", "message": "Usuario encontrado."}), 200
    else:
        increment_failed_attempts(correo)
        return jsonify({"status": "not_found", "message": "Correo no válido.", "intentos": failed_attempts[correo]["count"]}), 404

def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404

def register_user():
    data = request.get_json()
    new_user = User(
        Nombre=data['Nombre'],
        Apellido=data['Apellido'],
        Correo=data['Correo'],
        Contraseña=data['Contraseña'],
        Telefono=data.get('Telefono'),
        Direccion=data.get('Direccion'),
        Rol=data.get('Rol', 'Cliente')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado exitosamente", "userId": new_user.ID_Usuario}), 201

def change_password():
    data = request.get_json()
    correo = data['Correo']
    password = data['Contraseña']

    bloqueo = check_failed_attempts(correo)
    if bloqueo["blocked"]:
        return jsonify({"error": f"Demasiados intentos fallidos. Intenta nuevamente en {bloqueo['tiempo_restante']} minutos."}), 403

    user = User.query.filter_by(Correo=correo).first()
    if user:
        user.Contraseña = generate_password_hash(password)
        db.session.commit()
        failed_attempts.pop(correo, None)
        return jsonify({"message": "Contraseña actualizada correctamente"}), 200
    else:
        return jsonify({"error": "Correo no encontrado"}), 404

def login_user():
    data = request.get_json()
    correo = data['Correo']
    contraseña = data['Contraseña']

    bloqueo = check_failed_attempts(correo)
    if bloqueo["blocked"]:
        return jsonify({"error": f"Demasiados intentos fallidos. Intenta nuevamente en {bloqueo['tiempo_restante']} minutos."}), 403

    user = User.query.filter_by(Correo=correo).first()
    if user and user.check_password(contraseña):
        failed_attempts.pop(correo, None)
        return jsonify({
            "message": "Login exitoso",
            "userId": user.ID_Usuario,
            "rol": user.Rol
        }), 200
    else:
        increment_failed_attempts(correo)
        return jsonify({
            "error": "Credenciales incorrectas",
            "intentos": failed_attempts[correo]["count"],
            "bloqueado": failed_attempts[correo]["locked"]
        }), 401