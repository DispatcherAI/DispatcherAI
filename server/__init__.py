from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .retell.server import router as retell_router
# Comment out the next line
# from .hume.agent import router as hume_router
from .socket_manager import initialize_manager

app = FastAPI()

# CORS configuration
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(retell_router)

@app.on_event("startup")
async def startup_event():
    await initialize_manager()

@app.get("/")
def read_root():
    return {"Hello": "World"}
