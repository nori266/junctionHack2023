from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define the Pydantic model for input data
class State(BaseModel):
    heart_rate: float
    resting_heart_rate: float
    oxygen_saturation: float
    temperature: float
    sleep: float
    mood: float

# Load the pre-trained DQN model
# Update the path to your model file
model_path = 'biohacker.pt'
model = torch.load(model_path)
model.eval()  # Set the model to evaluation mode

@app.get("/")
def hello():
    return {"message":"Hello TutLinks.com"}


@app.post("/prevent")
async def prevent(state: State):
    try:
        # Convert state to PyTorch tensor
        state_tensor = torch.tensor([[state.heart_rate, state.resting_heart_rate, state.oxygen_saturation, state.temperature, state.sleep, state.mood]], dtype=torch.float32)

        # Get the action from the model
        with torch.no_grad():
            action = model(state_tensor).argmax().item()

        # Return the action
        return {"action": action}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    class dotdict(dict):
        """dot.notation access to dictionary attributes"""
        __getattr__ = dict.get
        __setattr__ = dict.__setitem__
        __delattr__ = dict.__delitem__    

    state = dict(heart_rate = 0.1, resting_heart_rate = 0.9, oxygen_saturation = 0.2,temperature = 0.6, sleep = 0.5, mood = 0.1)

    state = dotdict(state)    

    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

