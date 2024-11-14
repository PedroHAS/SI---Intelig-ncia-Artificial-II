from sqlalchemy import create_engine, MetaData

DATABASE_URL = "mysql+mysqlconnector://username:password@localhost/meu_projeto" 
engine = create_engine(DATABASE_URL)
metadata = MetaData()