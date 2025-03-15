from config import db
from datetime import datetime

class RemoteData(db.Model):
    __tablename__ = 'datos_remotos'
    ID_Dato = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ID_Deteccion = db.Column(db.Integer, db.ForeignKey('deteccion_paquetes.ID_Deteccion'))
    ID_Clasificacion = db.Column(db.Integer, db.ForeignKey('clasificacion_paquetes.ID_Clasificacion'))
    Estado_Conexion = db.Column(db.Enum('Exitoso', 'Fallido'), default='Exitoso')
    Fecha_Hora = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, ID_Deteccion=None, ID_Clasificacion=None, Estado_Conexion='Exitoso'):
        self.ID_Deteccion = ID_Deteccion
        self.ID_Clasificacion = ID_Clasificacion
        self.Estado_Conexion = Estado_Conexion

    def to_dict(self):
        return {
            "ID_Dato": self.ID_Dato,
            "ID_Deteccion": self.ID_Deteccion,
            "ID_Clasificacion": self.ID_Clasificacion,
            "Estado_Conexion": self.Estado_Conexion,
            "Fecha_Hora": self.Fecha_Hora.isoformat() if self.Fecha_Hora else None
        }