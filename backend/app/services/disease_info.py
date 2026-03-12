"""
Disease Information Mapping for PlantVillage Dataset (38 classes).

Each entry maps a PlantVillage class label string to a dictionary containing:
  - plant: Human-readable plant name
  - disease: Human-readable disease name (or "Healthy")
  - is_healthy: Boolean indicating if the plant is healthy
  - treatment: Recommended treatment string

The class labels are sorted alphabetically to match the order used during
model training (tf.keras.utils.image_dataset_from_directory sorts by folder name).
"""

# fmt: off
DISEASE_INFO: dict[str, dict] = {
    "Apple___Apple_scab": {
        "plant": "Apple",
        "disease": "Apple Scab",
        "is_healthy": False,
        "treatment": (
            "Apply fungicides such as captan or myclobutanil during early spring. "
            "Remove and destroy fallen infected leaves in autumn to reduce overwintering spores. "
            "Prune trees to improve air circulation."
        ),
    },
    "Apple___Black_rot": {
        "plant": "Apple",
        "disease": "Black Rot",
        "is_healthy": False,
        "treatment": (
            "Prune out dead or diseased branches and mummified fruits. "
            "Apply captan or thiophanate-methyl fungicide during the growing season. "
            "Maintain good tree hygiene by removing cankers."
        ),
    },
    "Apple___Cedar_apple_rust": {
        "plant": "Apple",
        "disease": "Cedar Apple Rust",
        "is_healthy": False,
        "treatment": (
            "Apply fungicides like myclobutanil at the pink bud stage and repeat as directed. "
            "Remove nearby Eastern red cedar trees (alternate host) if possible. "
            "Choose rust-resistant apple varieties for new plantings."
        ),
    },
    "Apple___healthy": {
        "plant": "Apple",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Continue regular care including proper watering, "
            "balanced fertilization, and periodic pruning for optimal health."
        ),
    },
    "Blueberry___healthy": {
        "plant": "Blueberry",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Maintain acidic soil (pH 4.5–5.5), mulch with pine bark, "
            "and ensure consistent moisture for continued health."
        ),
    },
    "Cherry_(including_sour)___Powdery_mildew": {
        "plant": "Cherry",
        "disease": "Powdery Mildew",
        "is_healthy": False,
        "treatment": (
            "Apply sulfur-based or potassium bicarbonate fungicides at the first sign of infection. "
            "Improve air circulation by proper spacing and pruning. "
            "Avoid overhead irrigation to keep foliage dry."
        ),
    },
    "Cherry_(including_sour)___healthy": {
        "plant": "Cherry",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Continue regular pruning, watering, and monitoring "
            "for pests. Apply dormant oil spray in late winter as a preventive measure."
        ),
    },
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
        "plant": "Corn (Maize)",
        "disease": "Cercospora Leaf Spot / Gray Leaf Spot",
        "is_healthy": False,
        "treatment": (
            "Rotate crops with non-host species (e.g., soybeans). "
            "Apply foliar fungicides containing pyraclostrobin or azoxystrobin at VT/R1 stage. "
            "Use resistant hybrids and practice tillage to reduce residue."
        ),
    },
    "Corn_(maize)___Common_rust_": {
        "plant": "Corn (Maize)",
        "disease": "Common Rust",
        "is_healthy": False,
        "treatment": (
            "Plant rust-resistant hybrids. Apply fungicides such as azoxystrobin or "
            "propiconazole if infection occurs before tasseling and conditions favor spread. "
            "Scout fields early for pustule development."
        ),
    },
    "Corn_(maize)___Northern_Leaf_Blight": {
        "plant": "Corn (Maize)",
        "disease": "Northern Leaf Blight",
        "is_healthy": False,
        "treatment": (
            "Use resistant hybrids and rotate crops away from corn for at least one year. "
            "Apply foliar fungicides (propiconazole, azoxystrobin) at early tassel if disease "
            "pressure is high. Reduce surface residue through tillage."
        ),
    },
    "Corn_(maize)___healthy": {
        "plant": "Corn (Maize)",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Ensure adequate nitrogen fertilization, proper plant spacing, "
            "and consistent irrigation for optimal yield."
        ),
    },
    "Grape___Black_rot": {
        "plant": "Grape",
        "disease": "Black Rot",
        "is_healthy": False,
        "treatment": (
            "Apply fungicides (myclobutanil, mancozeb) from bud break through four weeks after bloom. "
            "Remove mummified berries and infected canes during dormant pruning. "
            "Ensure good canopy management for air circulation."
        ),
    },
    "Grape___Esca_(Black_Measles)": {
        "plant": "Grape",
        "disease": "Esca (Black Measles)",
        "is_healthy": False,
        "treatment": (
            "No proven chemical cure exists. Remove severely affected vines to prevent spread. "
            "Protect pruning wounds with wound sealant or biocontrol agents like Trichoderma. "
            "Avoid stress through balanced irrigation and nutrition."
        ),
    },
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
        "plant": "Grape",
        "disease": "Leaf Blight (Isariopsis Leaf Spot)",
        "is_healthy": False,
        "treatment": (
            "Apply fungicides such as mancozeb or copper-based products at early symptoms. "
            "Remove and destroy infected leaves. Maintain open canopy through proper trellising "
            "and pruning to reduce humidity around foliage."
        ),
    },
    "Grape___healthy": {
        "plant": "Grape",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Continue proper canopy management, balanced fertilization, "
            "and winter pruning. Monitor regularly for early signs of disease."
        ),
    },
    "Orange___Haunglongbing_(Citrus_greening)": {
        "plant": "Orange",
        "disease": "Huanglongbing (Citrus Greening)",
        "is_healthy": False,
        "treatment": (
            "There is no cure for HLB. Control the Asian citrus psyllid vector using systemic "
            "insecticides (imidacloprid). Remove and destroy confirmed infected trees. "
            "Use certified disease-free nursery stock for replanting."
        ),
    },
    "Peach___Bacterial_spot": {
        "plant": "Peach",
        "disease": "Bacterial Spot",
        "is_healthy": False,
        "treatment": (
            "Apply copper-based bactericides during dormancy and oxytetracycline during the growing season. "
            "Plant resistant cultivars. Avoid overhead irrigation and ensure proper tree spacing "
            "to improve air circulation."
        ),
    },
    "Peach___healthy": {
        "plant": "Peach",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Apply dormant spray in late winter, prune annually for an open center, "
            "and thin fruit for better size and quality."
        ),
    },
    "Pepper,_bell___Bacterial_spot": {
        "plant": "Bell Pepper",
        "disease": "Bacterial Spot",
        "is_healthy": False,
        "treatment": (
            "Use copper-based sprays combined with mancozeb for disease management. "
            "Plant certified disease-free seed and resistant varieties. "
            "Practice crop rotation (at least 2 years away from solanaceous crops) and avoid overhead watering."
        ),
    },
    "Pepper,_bell___healthy": {
        "plant": "Bell Pepper",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Provide consistent watering, balanced fertilizer, "
            "and stake plants for support. Monitor for common pests like aphids."
        ),
    },
    "Potato___Early_blight": {
        "plant": "Potato",
        "disease": "Early Blight",
        "is_healthy": False,
        "treatment": (
            "Apply chlorothalonil or mancozeb fungicide starting when plants are 6 inches tall. "
            "Practice crop rotation with non-solanaceous crops. Remove infected plant debris after harvest. "
            "Maintain adequate soil moisture and fertility to reduce plant stress."
        ),
    },
    "Potato___Late_blight": {
        "plant": "Potato",
        "disease": "Late Blight",
        "is_healthy": False,
        "treatment": (
            "Apply fungicides such as chlorothalonil, mancozeb, or metalaxyl/mefenoxam preventatively. "
            "Destroy infected plants immediately to prevent spread. Use certified disease-free seed potatoes. "
            "Avoid overhead irrigation and harvest in dry conditions."
        ),
    },
    "Potato___healthy": {
        "plant": "Potato",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Hill soil around plants as they grow, maintain consistent moisture, "
            "and rotate potato crops annually."
        ),
    },
    "Raspberry___healthy": {
        "plant": "Raspberry",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Prune spent canes after fruiting, mulch to retain moisture, "
            "and provide trellising for support."
        ),
    },
    "Soybean___healthy": {
        "plant": "Soybean",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Ensure proper inoculation with rhizobium bacteria, "
            "maintain weed control, and scout regularly for pests."
        ),
    },
    "Squash___Powdery_mildew": {
        "plant": "Squash",
        "disease": "Powdery Mildew",
        "is_healthy": False,
        "treatment": (
            "Apply potassium bicarbonate, neem oil, or sulfur-based fungicides at first sign of white patches. "
            "Increase plant spacing for better air flow. Water at the base; avoid wetting foliage. "
            "Remove severely infected leaves."
        ),
    },
    "Strawberry___Leaf_scorch": {
        "plant": "Strawberry",
        "disease": "Leaf Scorch",
        "is_healthy": False,
        "treatment": (
            "Remove and destroy infected leaves. Apply captan or copper fungicides as a preventive. "
            "Use drip irrigation instead of overhead watering to keep foliage dry. "
            "Plant resistant varieties and renovate beds after harvest."
        ),
    },
    "Strawberry___healthy": {
        "plant": "Strawberry",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Mulch with straw to suppress weeds and keep fruit clean, "
            "provide consistent watering, and remove runners as needed."
        ),
    },
    "Tomato___Bacterial_spot": {
        "plant": "Tomato",
        "disease": "Bacterial Spot",
        "is_healthy": False,
        "treatment": (
            "Apply copper-based bactericides early in the season. Use disease-free seed and transplants. "
            "Practice crop rotation (2–3 years). Avoid working with plants when foliage is wet."
        ),
    },
    "Tomato___Early_blight": {
        "plant": "Tomato",
        "disease": "Early Blight",
        "is_healthy": False,
        "treatment": (
            "Apply chlorothalonil or copper-based fungicide at first sign of symptoms. "
            "Mulch around plants to prevent soil splash. Remove lower infected leaves. "
            "Rotate tomatoes with non-solanaceous crops for at least 2 years."
        ),
    },
    "Tomato___Late_blight": {
        "plant": "Tomato",
        "disease": "Late Blight",
        "is_healthy": False,
        "treatment": (
            "Apply fungicides (chlorothalonil, mancozeb) preventatively in cool, wet weather. "
            "Remove and destroy infected plants immediately—do not compost. "
            "Use resistant varieties and ensure good air circulation."
        ),
    },
    "Tomato___Leaf_Mold": {
        "plant": "Tomato",
        "disease": "Leaf Mold",
        "is_healthy": False,
        "treatment": (
            "Improve greenhouse ventilation and reduce humidity below 85%. "
            "Apply chlorothalonil or mancozeb fungicide. Remove infected leaves. "
            "Use resistant varieties and avoid overcrowding plants."
        ),
    },
    "Tomato___Septoria_leaf_spot": {
        "plant": "Tomato",
        "disease": "Septoria Leaf Spot",
        "is_healthy": False,
        "treatment": (
            "Apply copper-based or chlorothalonil fungicide starting at first symptom. "
            "Remove and destroy lower infected leaves. Mulch to prevent soil-splash. "
            "Practice 2–3 year crop rotation and avoid overhead irrigation."
        ),
    },
    "Tomato___Spider_mites Two-spotted_spider_mite": {
        "plant": "Tomato",
        "disease": "Spider Mites (Two-Spotted Spider Mite)",
        "is_healthy": False,
        "treatment": (
            "Spray plants with a strong stream of water to dislodge mites. "
            "Apply insecticidal soap or neem oil, covering undersides of leaves. "
            "Introduce predatory mites (Phytoseiulus persimilis) for biological control. "
            "Avoid excessive nitrogen fertilization which encourages mite growth."
        ),
    },
    "Tomato___Target_Spot": {
        "plant": "Tomato",
        "disease": "Target Spot",
        "is_healthy": False,
        "treatment": (
            "Apply chlorothalonil or copper-based fungicide at first symptoms. "
            "Improve air circulation through pruning and proper plant spacing. "
            "Remove infected lower leaves and debris. Rotate with non-solanaceous crops."
        ),
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "plant": "Tomato",
        "disease": "Tomato Yellow Leaf Curl Virus",
        "is_healthy": False,
        "treatment": (
            "No chemical cure exists for viral infections. Control whitefly vectors using "
            "reflective mulches, yellow sticky traps, and insecticides (imidacloprid). "
            "Remove and destroy infected plants. Use TYLCV-resistant varieties."
        ),
    },
    "Tomato___Tomato_mosaic_virus": {
        "plant": "Tomato",
        "disease": "Tomato Mosaic Virus",
        "is_healthy": False,
        "treatment": (
            "No chemical treatment available. Remove and destroy infected plants immediately. "
            "Disinfect tools with 10% bleach solution between plants. "
            "Use virus-free certified seed and resistant varieties. Wash hands before handling plants."
        ),
    },
    "Tomato___healthy": {
        "plant": "Tomato",
        "disease": "Healthy",
        "is_healthy": True,
        "treatment": (
            "No treatment needed. Continue consistent watering at the base, stake or cage plants, "
            "and apply balanced fertilizer throughout the growing season."
        ),
    },
}
# fmt: on

# Ordered list of class names matching the alphabetical sort order used
# during training (tf.keras.utils.image_dataset_from_directory default).
CLASS_NAMES: list[str] = sorted(DISEASE_INFO.keys())


def get_disease_info(class_index: int) -> dict:
    """Return disease info dict for a given class index.

    Args:
        class_index: Integer index into the sorted class list.

    Returns:
        Dictionary with keys: predicted_class, plant, disease, is_healthy, treatment.
    """
    class_name = CLASS_NAMES[class_index]
    info = DISEASE_INFO[class_name]
    return {
        "predicted_class": class_name,
        "plant": info["plant"],
        "disease": info["disease"],
        "is_healthy": info["is_healthy"],
        "treatment": info["treatment"],
    }
