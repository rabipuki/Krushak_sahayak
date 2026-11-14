"""
Python FastAPI AI Microservice for Smart Agriculture
Provides REST endpoints for Plant Disease Detection & Soil Analysis.
"""

from typing import Optional
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from plant_disease_model import analyze_plant_disease
from soil_analysis_model import analyze_visual_soil, evaluate_soil_test_report

app = FastAPI(
    title="Krushak Sahayak AI Microservice",
    description="Botanical Disease Diagnostics & Soil Health Engine",
    version="1.0.0"
)

# Enable CORS for frontend and Spring Boot backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp", "bmp"}
MAX_FILE_SIZE = 15 * 1024 * 1024  # 15 MB


def validate_image_file(file: UploadFile):
    """Validates file presence, extension, and content type."""
    if not file:
        raise HTTPException(status_code=400, detail="No image file provided.")

    filename = file.filename or ""
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Allowed image formats: JPG, JPEG, PNG, WEBP, BMP."
        )


@app.get("/api/ai/health")
def health_check():
    return {
        "status": "UP",
        "service": "Krushak Sahayak AI Microservice",
        "version": "1.0.0",
        "features": ["plant_disease_detection", "visual_soil_analysis", "soil_test_report_evaluation"],
        "demonstration_mode": True
    }


@app.post("/api/ai/plant/analyze")
async def analyze_plant(
    image: UploadFile = File(...),
    crop_hint: Optional[str] = Form(None)
):
    """
    Analyzes an uploaded leaf photograph for botanical disease diagnostics.
    """
    validate_image_file(image)

    try:
        image_bytes = await image.read()
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded image file is empty.")
        if len(image_bytes) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="Image file exceeds maximum allowable size of 15MB.")

        result = analyze_plant_disease(image_bytes, crop_hint)
        return JSONResponse(status_code=200, content=result)
    except ValueError as ve:
        raise HTTPException(status_code=422, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Diagnostic error: {str(e)}")


@app.post("/api/ai/soil/analyze")
async def analyze_soil(
    image: UploadFile = File(...),
    crop_name: Optional[str] = Form("Paddy / Rice"),
    ph: Optional[float] = Form(None),
    nitrogen: Optional[float] = Form(None),
    phosphorus: Optional[float] = Form(None),
    potassium: Optional[float] = Form(None),
    organic_carbon: Optional[float] = Form(None),
    electrical_conductivity: Optional[float] = Form(None)
):
    """
    Analyzes visual soil characteristics and correlates with lab test parameters if provided.
    """
    validate_image_file(image)

    try:
        image_bytes = await image.read()
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded soil image is empty.")
        if len(image_bytes) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="Soil image exceeds maximum size of 15MB.")

        # 1. Run visual soil analysis
        visual_result = analyze_visual_soil(image_bytes)

        # 2. If soil test parameters are provided, evaluate them
        lab_report_evaluation = None
        if ph is not None:
            lab_report_evaluation = evaluate_soil_test_report(
                ph=ph,
                nitrogen=nitrogen,
                phosphorus=phosphorus,
                potassium=potassium,
                organic_carbon=organic_carbon,
                electrical_conductivity=electrical_conductivity,
                crop_name=crop_name
            )

        return JSONResponse(status_code=200, content={
            "visual_analysis": visual_result,
            "lab_test_evaluation": lab_report_evaluation,
            "has_lab_report": lab_report_evaluation is not None
        })
    except ValueError as ve:
        raise HTTPException(status_code=422, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Soil analysis error: {str(e)}")


@app.post("/api/ai/soil/test-report")
async def evaluate_lab_report(
    ph: float = Form(...),
    nitrogen: Optional[float] = Form(None),
    phosphorus: Optional[float] = Form(None),
    potassium: Optional[float] = Form(None),
    organic_carbon: Optional[float] = Form(None),
    electrical_conductivity: Optional[float] = Form(None),
    crop_name: Optional[str] = Form("Paddy / Rice")
):
    """
    Dedicated endpoint to evaluate lab soil test values directly without an image.
    """
    try:
        result = evaluate_soil_test_report(
            ph=ph,
            nitrogen=nitrogen,
            phosphorus=phosphorus,
            potassium=potassium,
            organic_carbon=organic_carbon,
            electrical_conductivity=electrical_conductivity,
            crop_name=crop_name
        )
        return JSONResponse(status_code=200, content=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lab evaluation error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Krushak Sahayak AI Microservice on http://127.0.0.1:8000...")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
