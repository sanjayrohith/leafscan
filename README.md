# 🌿 LeafScan — Plant Disease Detection

AI-powered plant disease detection from leaf images. Upload a photo and get instant diagnosis with treatment recommendations.

![LeafScan](https://img.shields.io/badge/AI-Plant%20Disease%20Detection-green?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.18-orange?style=flat-square)

---

## Features

- 🖼️ **Drag-and-drop** image upload with instant preview
- 🔬 **38 disease classes** across 14 crop species (PlantVillage dataset)
- 🧠 **EfficientNetB3** deep learning model with transfer learning
- 💊 **Treatment recommendations** for every detected disease
- 📊 **Confidence scores** with animated progress bars
- 📱 **Responsive** design — works on desktop and mobile
- 🐳 **Docker** support for one-command deployment

---

## Quick Start (Development)

### Prerequisites

- **Python 3.11+** and **pip**
- **Node.js 20+** and **npm**

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

> ⚠️ The backend will print a warning if no trained model is found at `backend/model/plant_disease_model.h5`. The `/predict` endpoint returns HTTP 503 until a model is provided.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Training the Model

```bash
cd backend
python train.py /path/to/plantvillage/dataset --epochs 10
```

The dataset directory should have one sub-folder per class:

```
dataset/
├── Apple___Apple_scab/
├── Apple___Black_rot/
├── ...
└── Tomato___healthy/
```

The trained model is saved to `backend/model/plant_disease_model.h5`.

---

## Docker Deployment

```bash
docker-compose up --build
```

| Service   | URL                          |
| --------- | ---------------------------- |
| Frontend  | http://localhost:3000         |
| Backend   | http://localhost:8000         |
| Health    | http://localhost:8000/health  |

---

## Project Structure

```
leafscan/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI entry point
│   │   ├── routes/predict.py     # /predict and /health endpoints
│   │   ├── services/model.py     # Model loading & inference
│   │   ├── services/disease_info.py  # 38-class disease mapping
│   │   └── utils/image_utils.py  # Image preprocessing
│   ├── model/                    # Trained model (gitignored)
│   ├── train.py                  # Model training script
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, ImageUploader, ResultCard
│   │   ├── pages/                # Home, About
│   │   ├── api/predict.js        # Axios API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Tech Stack

| Layer    | Technology                         |
| -------- | ---------------------------------- |
| Frontend | React 18, Vite, Tailwind CSS       |
| Backend  | Python 3.11, FastAPI, Uvicorn      |
| ML Model | TensorFlow / Keras, EfficientNetB3 |
| Deploy   | Docker, Docker Compose, Nginx      |

---

## API Reference

### `GET /health`

Returns `{"status": "ok"}`.

### `POST /predict`

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| `file`    | File   | Leaf image (JPEG/PNG)  |

**Response:**

```json
{
  "predicted_class": "Tomato___Early_blight",
  "confidence": 0.97,
  "plant": "Tomato",
  "disease": "Early Blight",
  "is_healthy": false,
  "treatment": "Apply copper-based fungicide. Remove affected leaves."
}
```

---

## License

MIT
