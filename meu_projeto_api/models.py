from sqlalchemy import Table, Column, Integer, String, DateTime
from .database import engine, metadata

metadados = Table(
    'metadados',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('data', DataTime),
    Column('nome_arquivo', String(255)),
    Column('formato_arquivo', String(50)),
    Column('colunas', String(255))
)

metadata.create_all(engine)