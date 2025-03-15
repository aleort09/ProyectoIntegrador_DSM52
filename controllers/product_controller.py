from flask import jsonify, request
from models.product import Product
from config import db

def get_products():
    nombre = request.args.get('nombre')
    query = Product.query
    if nombre:
        query = query.filter(Product.Nombre.like(f'%{nombre}%'))
    products = query.all()
    return jsonify([product.to_dict() for product in products]), 200

def get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if product:
        return jsonify(product.to_dict()), 200
    else:
        return jsonify({"error": "Producto no encontrado"}), 404

def create_product():
    data = request.get_json()
    new_product = Product(Nombre=data['Nombre'], Stock=data.get('Stock', 0))
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Producto creado exitosamente"}), 201

def update_product(product_id):
    data = request.get_json()
    product = Product.query.get(product_id)
    if product:
        product.Nombre = data.get('Nombre', product.Nombre)
        product.Stock = data.get('Stock', product.Stock)
        db.session.commit()
        return jsonify({"message": "Producto actualizado exitosamente"}), 200
    else:
        return jsonify({"error": "Producto no encontrado"}), 404

def delete_product(product_id):
    product = Product.query.get(product_id)
    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Producto eliminado exitosamente"}), 200
    else:
        return jsonify({"error": "Producto no encontrado"}), 404