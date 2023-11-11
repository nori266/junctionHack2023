import subprocess

# Run the Streamlit app
if __name__ == "__main__":
    subprocess.run(["pip", "install", "fastapi"])
    subprocess.run(["pip", "install", "torch==2.1.0"])
    subprocess.run(["python", "-m", "app.main"])
