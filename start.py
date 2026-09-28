import subprocess
import sys
import time
import os

def main():
    print("=" * 60)
    print("  MediFlow AI - Intelligent Hospital Management Assistant")
    print("=" * 60)
    print("Starting FastAPI Backend (Port 8000) & Vite Frontend (Port 5173)...")

    backend_dir = os.path.join(os.path.dirname(__file__), "backend")
    frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")

    backend_cmd = [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"]
    frontend_cmd = ["npx.cmd" if os.name == 'nt' else "npx", "vite"]

    backend_proc = subprocess.Popen(backend_cmd, cwd=backend_dir)
    frontend_proc = subprocess.Popen(frontend_cmd, cwd=frontend_dir)

    print("\n[+] Backend running at: http://127.0.0.1:8000")
    print("[+] Frontend running at: http://localhost:5173")
    print("\nPress Ctrl+C to stop both servers.\n")

    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\nStopping MediFlow AI servers...")
        backend_proc.terminate()
        frontend_proc.terminate()

if __name__ == "__main__":
    main()
