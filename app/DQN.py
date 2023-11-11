import torch
import torch.nn as nn 
import torch.optim as optim

# Define the DQN architecture
class DQN(nn.Module):
    def __init__(self, state_size, action_size):
        super(DQN, self).__init__()
        self.fc1 = nn.Linear(state_size, 16)  # First fully connected layer
        self.relu = nn.ReLU()                 # ReLU activation
        self.fc2 = nn.Linear(16, 16)          # Second fully connected layer
        self.fc3 = nn.Linear(16, action_size) # Output layer

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        x = self.relu(x)
        x = self.fc3(x)
        return x