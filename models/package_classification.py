from config import db
from datetime import datetime

class PackageClassification(db.Model):
    __tablename__ = 'clasificacion_paquetes'
    ID_Clasificacion = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ID_Producto = db.Column(db.Integer, db.ForeignKey('productos.ID_Producto', ondelete='CASCADE'), nullable=False)
    Etiqueta_Color = db.Column(db.Enum('Rojo', 'Verde'), nullable=False)
    Accion = db.Column(db.Enum('Izquierda', 'Derecha'), nullable=False)
    Fecha_Hora = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, ID_Producto, Etiqueta_Color, Accion):
        self.ID_Producto = ID_Producto
        self.Etiqueta_Color = Etiqueta_Color
        self.Accion = Accion

    def to_dict(self):
        return {
            "ID_Clasificacion": self.ID_Clasificacion,
            "ID_Producto": self.ID_Producto,
            "Etiqueta_Color": self.Etiqueta_Color,
            "Accion": self.Accion,
            "Fecha_Hora": self.Fecha_Hora.isoformat() if self.Fecha_Hora else None
        }