from config import db
from datetime import datetime

class PackageDetection(db.Model):
    __tablename__ = 'deteccion_paquetes'
    ID_Deteccion = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Distancia = db.Column(db.Numeric(10, 2), nullable=False)
    Estado = db.Column(db.Enum('Detectado', 'No detectado'), nullable=False)
    Fecha_Hora = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, Distancia, Estado):
        self.Distancia = Distancia
        self.Estado = Estado

    def to_dict(self):
        return {
            "ID_Deteccion": self.ID_Deteccion,
            "Distancia": float(self.Distancia),
            "Estado": self.Estado,
            "Fecha_Hora": self.Fecha_Hora.isoformat() if self.Fecha_Hora else None
        }