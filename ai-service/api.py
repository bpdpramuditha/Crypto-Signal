from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()
model = joblib.load("model.pkl")

@app.post("/predict")
def predict(features: dict):
    ema50 = float(features.get("ema50", 0))
    ema200 = float(features.get("ema200", 0))
    rsi = float(features.get("rsi", 50))
    volume_ratio = float(features.get("volumeRatio", 1))

    X = np.array([[ema50, ema200, rsi, volume_ratio]])
    prob = float(model.predict_proba(X)[0][1])
    return {"up_probability": prob}
