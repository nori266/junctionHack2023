import subprocess

# Run the Streamlit app
if __name__ == "__main__":
    subprocess.run(["pip", "install", "fastapi"])
    subprocess.run(["pip", "install", "torch==2.1.0"])
    subprocess.run(["pip", "install", "numpy==1.26.1"])
    subprocess.run(["python", "-m", "app.main"])
