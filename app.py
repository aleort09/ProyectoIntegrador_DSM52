from flask import Flask
from config import db, migrate
from dotenv import load_dotenv
from routes.product_routes import product_bp
from routes.package_detection_routes import package_detection_bp
from routes.package_classification_routes import package_classification_bp
from routes.remote_data_routes import remote_data_bp
import os
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'wyhgewty3g278te62fec32uhes'
jwt = JWTManager(app)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar extensiones
db.init_app(app)
migrate.init_app(app, db)


app.register_blueprint(product_bp, url_prefix='/productos')
app.register_blueprint(package_detection_bp, url_prefix='/detecciones')
app.register_blueprint(package_classification_bp, url_prefix='/clasificaciones')
app.register_blueprint(remote_data_bp, url_prefix='/remotos')

if __name__ == '__main__':
    app.run(debug=True)