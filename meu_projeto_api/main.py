from fastapi import FastAPI, UploadFile, HTTPException
import pandas as pd
import xml.etree.ElementTree as ET
import json
from datetime import datetime
from .database import engine
from sqlalchemy import insert
from .models import metadados

app = FastAPI()

@app.post("/upload/")
async def upload_file(file: UploadFile):
    try:
        file_format = file.filename.split('.')[-1].lower()
        contents = await file.read()
        df = None

        if file_format == 'csv':
            df = pd.read_csv(file.file)
        elif file_format == 'json':
            df = pd.read_json(file.file)
        elif file_format == 'xml':
            root = ET.fromstring(contents)
            data = [{elem.tag: elem.text for elem in child} for child in root]
            df = pd.DataFrame(data)
        elif file_format == 'txt':
            df = pd.read_csv(file.file, delimiter="\t")
        else:
            raise HTTPException(status_code=400, detail="Formato de arquivo não suportado.")

        json_data = df.to_json(orient='records')
        colunas = [{"nomeColuna": col, "tipoDado": str(df[col].dtype)} for col in df.columns]

        with engine.connect() as conn:
            stmt = insert(metadados).values(
                data=datetime.now(),
                nome_arquivo=file.filename,
                formato_arquivo=file_format,
                colunas=json.dumps(colunas)
            )
            conn.execute(stmt)

        return {
            "message": "Arquivo processado com sucesso",
            "json_data": json.loads(json_data),
            "metadados": colunas
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))