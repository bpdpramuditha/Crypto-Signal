import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib

rng = np.random.default_rng(42)
X = rng.normal(size=(5000, 4))  # ema50, ema200, rsi, volumeRatio
y = ((X[:,0] - X[:,1]) > 0).astype(int)

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X, y)

joblib.dump(model, "model.pkl")
print("Saved model.pkl")
