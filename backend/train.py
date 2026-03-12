"""
Training script for the PlantVillage leaf disease classifier.

Architecture: EfficientNetB3 (ImageNet pre-trained, frozen base) with a custom
Dense classification head for 38 PlantVillage classes.

Usage:
    python train.py /path/to/plantvillage/dataset

The dataset directory should have one sub-folder per class, e.g.:
    dataset/
    ├── Apple___Apple_scab/
    ├── Apple___Black_rot/
    └── ...

The trained model is saved to  backend/model/plant_disease_model.h5
"""

import argparse
import os
import sys

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
IMG_SIZE = 224            # Input image resolution (matches inference pipeline)
BATCH_SIZE = 32
EPOCHS = 10
LEARNING_RATE = 1e-3
VALIDATION_SPLIT = 0.2
SEED = 42

# Output path for the trained model
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_SAVE_PATH = os.path.join(SCRIPT_DIR, "model", "plant_disease_model.h5")


# ---------------------------------------------------------------------------
# Data augmentation layers applied during training only
# ---------------------------------------------------------------------------
data_augmentation = keras.Sequential(
    [
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        layers.RandomZoom(0.2),
    ],
    name="data_augmentation",
)


def build_model(num_classes: int) -> keras.Model:
    """Build an EfficientNetB3 transfer-learning model.

    The pretrained convolutional base is frozen; only the custom Dense head
    is trained. This dramatically reduces training time and works well when
    the target domain (plant leaves) is reasonably close to ImageNet.
    """
    # EfficientNetB3 expects input in [0, 255] when include_preprocessing=True
    # but our pipeline normalises to [0, 1], so we set include_preprocessing=False
    # and rescale ourselves (already done in the data pipeline below).
    base_model = keras.applications.EfficientNetB3(
        include_top=False,
        weights="imagenet",
        input_shape=(IMG_SIZE, IMG_SIZE, 3),
    )
    base_model.trainable = False  # Freeze the convolutional base

    inputs = keras.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    x = data_augmentation(inputs)          # Augment during training
    x = base_model(x, training=False)      # Forward through frozen base
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.3)(x)
    outputs = layers.Dense(num_classes, activation="softmax")(x)

    model = keras.Model(inputs, outputs)
    return model


def main():
    parser = argparse.ArgumentParser(
        description="Train an EfficientNetB3 classifier on the PlantVillage dataset."
    )
    parser.add_argument(
        "dataset_path",
        type=str,
        help="Path to the PlantVillage dataset directory (one sub-folder per class).",
    )
    parser.add_argument(
        "--epochs", type=int, default=EPOCHS, help=f"Number of training epochs (default: {EPOCHS})."
    )
    parser.add_argument(
        "--batch-size", type=int, default=BATCH_SIZE, help=f"Batch size (default: {BATCH_SIZE})."
    )
    args = parser.parse_args()

    if not os.path.isdir(args.dataset_path):
        print(f"ERROR: Dataset path does not exist or is not a directory: {args.dataset_path}")
        sys.exit(1)

    print(f"Loading dataset from: {args.dataset_path}")

    # ---- Load training set ----
    train_ds = keras.utils.image_dataset_from_directory(
        args.dataset_path,
        validation_split=VALIDATION_SPLIT,
        subset="training",
        seed=SEED,
        image_size=(IMG_SIZE, IMG_SIZE),
        batch_size=args.batch_size,
        label_mode="categorical",
    )

    # ---- Load validation set ----
    val_ds = keras.utils.image_dataset_from_directory(
        args.dataset_path,
        validation_split=VALIDATION_SPLIT,
        subset="validation",
        seed=SEED,
        image_size=(IMG_SIZE, IMG_SIZE),
        batch_size=args.batch_size,
        label_mode="categorical",
    )

    class_names = train_ds.class_names
    num_classes = len(class_names)
    print(f"Found {num_classes} classes: {class_names[:5]}... (showing first 5)")

    # Normalise pixel values from [0, 255] → [0, 1]
    normalization_layer = layers.Rescaling(1.0 / 255)
    train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
    val_ds = val_ds.map(lambda x, y: (normalization_layer(x), y))

    # Prefetch for performance
    train_ds = train_ds.prefetch(buffer_size=tf.data.AUTOTUNE)
    val_ds = val_ds.prefetch(buffer_size=tf.data.AUTOTUNE)

    # ---- Build & compile model ----
    model = build_model(num_classes)
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=LEARNING_RATE),
        loss="categorical_crossentropy",
        metrics=["accuracy"],
    )
    model.summary()

    # ---- Train ----
    print(f"\nTraining for {args.epochs} epochs...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=args.epochs,
    )

    # ---- Print final metrics ----
    final_train_acc = history.history["accuracy"][-1]
    final_val_acc = history.history["val_accuracy"][-1]
    print(f"\nFinal training accuracy:   {final_train_acc:.4f}")
    print(f"Final validation accuracy: {final_val_acc:.4f}")

    # ---- Save model ----
    os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
    model.save(MODEL_SAVE_PATH)
    print(f"Model saved to: {MODEL_SAVE_PATH}")


if __name__ == "__main__":
    main()
