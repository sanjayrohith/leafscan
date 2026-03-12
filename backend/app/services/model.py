"""
Model loading and inference service.

Handles loading the trained EfficientNetB3 Keras model from disk and
exposing a prediction function that takes preprocessed image arrays.
"""

import os
import numpy as np
import logging

logger = logging.getLogger(__name__)

# Path to the trained model file, relative to the backend root directory
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "model", "plant_disease_model.h5")

# Module-level reference to the loaded model (lazy-loaded on first use)
_model = None
_model_load_attempted = False


def load_model() -> bool:
    """Attempt to load the Keras model from disk.

    This is called at application startup. If the model file is missing,
    a clear error is printed but the application does NOT crash — the
    /predict endpoint will return a 503 error instead.

    Returns:
        True if the model was loaded successfully, False otherwise.
    """
    global _model, _model_load_attempted
    _model_load_attempted = True

    resolved_path = os.path.abspath(MODEL_PATH)

    if not os.path.exists(resolved_path):
        logger.error(
            "=" * 60 + "\n"
            "  MODEL FILE NOT FOUND\n"
            f"  Expected at: {resolved_path}\n"
            "  The /predict endpoint will return HTTP 503 until a model is provided.\n"
            "  To train a model, run:\n"
            "    python train.py /path/to/plantvillage/dataset\n"
            "=" * 60
        )
        return False

    try:
        # Import TensorFlow lazily so the app can start even if TF is missing
        # (useful for frontend-only development)
        import tensorflow as tf
        _model = tf.keras.models.load_model(resolved_path)
        logger.info(f"Model loaded successfully from {resolved_path}")
        return True
    except Exception as e:
        logger.error(f"Failed to load model from {resolved_path}: {e}")
        return False


def predict(image_array: np.ndarray) -> tuple[int, float]:
    """Run inference on a preprocessed image array.

    Args:
        image_array: numpy array of shape (1, 224, 224, 3), float32, values in [0, 1].

    Returns:
        Tuple of (predicted_class_index, confidence_score).

    Raises:
        RuntimeError: If the model has not been loaded.
    """
    if _model is None:
        raise RuntimeError(
            "Model is not loaded. Please ensure the model file exists at "
            f"{os.path.abspath(MODEL_PATH)} and restart the server."
        )

    # Run the prediction — output shape is (1, 38)
    predictions = _model.predict(image_array, verbose=0)

    # Get the class with the highest probability
    class_index = int(np.argmax(predictions[0]))
    confidence = float(predictions[0][class_index])

    return class_index, confidence


def is_model_loaded() -> bool:
    """Check whether the model is currently loaded and ready for inference."""
    return _model is not None
