from flask import Flask
from config import db, migrate
from dotenv import load_dotenv
from models import user, product, package_detection, package_classification, remote_data
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

# Debug: Print the DATABASE_URL
print("DATABASE_URL:", app.config['SQLALCHEMY_DATABASE_URI'])

# Inicializar extensiones
db.init_app(app)
migrate.init_app(app, db)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/test_db')
def test_db():
    try:
        db.engine.connect()
        return "Database connection successful!"
    except Exception as e:
        return f"Database connection failed: {str(e)}"