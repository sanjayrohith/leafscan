"""
Image preprocessing utilities for the plant disease prediction pipeline.

This module handles:
  1. Reading raw image bytes into a PIL Image
  2. Resizing to the target input dimensions (224×224)
  3. Normalizing pixel values to [0, 1]
  4. Expanding the array to a batch dimension for model inference
"""

import numpy as np
from PIL import Image
import io

# Model input dimensions (EfficientNetB3 fine-tuned at this resolution)
TARGET_SIZE = (224, 224)


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """Convert raw image bytes into a model-ready numpy array.

    Args:
        image_bytes: Raw bytes of the uploaded image file.

    Returns:
        numpy array of shape (1, 224, 224, 3) with float32 values in [0, 1].
    """
    # Open the image and convert to RGB (handles PNG with alpha, grayscale, etc.)
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Resize to the expected input dimensions using high-quality Lanczos filter
    image = image.resize(TARGET_SIZE, Image.LANCZOS)

    # Convert to numpy float32 array and normalize pixel values from [0, 255] to [0, 1]
    image_array = np.array(image, dtype=np.float32) / 255.0

    # Add batch dimension: (224, 224, 3) → (1, 224, 224, 3)
    image_array = np.expand_dims(image_array, axis=0)

    return image_array
