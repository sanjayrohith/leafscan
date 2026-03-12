"""
Prediction and health-check API routes.

POST /predict  — Accept a leaf image file and return disease prediction.
GET  /health   — Simple health-check endpoint.
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from ..services.model import predict, is_model_loaded
from ..services.disease_info import get_disease_info
from ..utils.image_utils import preprocess_image

router = APIRouter()


@router.get("/health")
async def health_check():
    """Return server health status. Always returns 200 even if model is not loaded,
    so container orchestrators can tell the server process is alive."""
    return {"status": "ok"}


@router.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    """Accept a leaf image and return the predicted disease with treatment info.

    Request:
        multipart/form-data with a single image field named 'file'.

    Response (200):
        {
            "predicted_class": "Tomato___Early_blight",
            "confidence": 0.97,
            "plant": "Tomato",
            "disease": "Early Blight",
            "is_healthy": false,
            "treatment": "Apply copper-based fungicide. Remove affected leaves."
        }

    Errors:
        400 — Invalid file type (not an image)
        503 — Model not loaded
        500 — Unexpected prediction error
    """
    # Ensure the model is loaded before processing
    if not is_model_loaded():
        raise HTTPException(
            status_code=503,
            detail="Model is not loaded. Please ensure the model file is present and restart the server.",
        )

    # Validate that the uploaded file is an image
    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{file.content_type}'. Please upload an image file (JPEG, PNG, etc.).",
        )

    try:
        # Read the raw bytes from the uploaded file
        image_bytes = await file.read()

        # Preprocess: resize, normalize, batch
        image_array = preprocess_image(image_bytes)

        # Run model inference
        class_index, confidence = predict(image_array)

        # Look up the human-readable disease information
        result = get_disease_info(class_index)
        result["confidence"] = round(confidence, 4)

        return result

    except RuntimeError as e:
        # Model-related runtime errors (should not happen if is_model_loaded check passed)
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
