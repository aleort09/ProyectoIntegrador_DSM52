from config import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model):
    __tablename__ = 'usuarios'
    ID_Usuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(100), nullable=False)
    Apellido = db.Column(db.String(100), nullable=False)
    Correo = db.Column(db.String(100), nullable=False, unique=True)
    Telefono = db.Column(db.String(15))
    Direccion = db.Column(db.String(255))
    Contraseña = db.Column(db.LargeBinary, nullable=False)
    Rol = db.Column(db.Enum('Cliente', 'Empleado', 'Administrador'), nullable=False, default='Cliente')
    Fecha_Registro = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, Nombre, Apellido, Correo, Contraseña, Telefono=None, Direccion=None, Rol='Cliente'):
        self.Nombre = Nombre
        self.Apellido = Apellido
        self.Correo = Correo
        self.Contraseña = generate_password_hash(Contraseña)
        self.Telefono = Telefono
        self.Direccion = Direccion
        self.Rol = Rol

    def check_password(self, password):
        return check_password_hash(self.Contraseña, password)

    def to_dict(self):
        return {
            "ID_Usuario": self.ID_Usuario,
            "Nombre": self.Nombre,
            "Apellido": self.Apellido,
            "Correo": self.Correo,
            "Telefono": self.Telefono,
            "Direccion": self.Direccion,
            "Rol": self.Rol,
            "Fecha_Registro": self.Fecha_Registro.isoformat() if self.Fecha_Registro else None
        }