"""
LeafScan Backend — FastAPI Application Entry Point.

Creates the FastAPI app, configures CORS for the React frontend,
includes API routes, and attempts to load the ML model at startup.
"""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.predict import router as predict_router
from .services.model import load_model

# Configure logging so startup messages are visible
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler — runs on startup and shutdown."""
    # --- Startup ---
    logger.info("Starting LeafScan backend...")
    model_loaded = load_model()
    if model_loaded:
        logger.info("Model loaded — ready to serve predictions.")
    else:
        logger.warning("Model NOT loaded — /predict will return 503 until a model is provided.")
    yield
    # --- Shutdown ---
    logger.info("Shutting down LeafScan backend.")


app = FastAPI(
    title="LeafScan API",
    description="Plant disease detection from leaf images using deep learning.",
    version="1.0.0",
    lifespan=lifespan,
)

# Allow the React frontend (running on a different port) to call the API.
# In production, restrict origins to the actual frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(predict_router)
