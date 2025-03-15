from config import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'productos'
    ID_Producto = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(100), nullable=False)
    Stock = db.Column(db.Integer, nullable=False, default=0)
    Fecha_Registro = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, Nombre, Stock=0):
        self.Nombre = Nombre
        self.Stock = Stock

    def to_dict(self):
        return {
            "ID_Producto": self.ID_Producto,
            "Nombre": self.Nombre,
            "Stock": self.Stock,
            "Fecha_Registro": self.Fecha_Registro.isoformat() if self.Fecha_Registro else None
        }