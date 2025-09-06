# Megrezi AI Logger 

A lightweight and flexible logging toolkit for intelligent agents, designed to support both **local debugging** and **remote log monitoring via a web dashboard**. Logs can be colorfully printed to the console, saved to local files, or streamed to a web-based log viewer.

This system is ideal for managing asynchronous multi-agent environments such as LLM-powered agents, AI bots, or simulation experiments.

![megrez ai logger](https://s2.loli.net/2025/09/06/hgbPvlcLrqNaBCx.png)
---

## ✨ Features

* 🖥️ **Local Console Logs** with colored output and timestamped entries
* 📁 **Rotating File Logs** with optional size limit and backup
* 🌐 **Web Dashboard** powered by Flask for live viewing and management
* 🧩 **Custom Tags** and **Levels** (DEBUG, INFO, WARN, ERROR, SUCCESS)
* 🧵 Thread-safe and configurable behavior
* 🔐 Optional authentication via API token
* 🧪 Includes test sender for demo logs

---

## 📦 Quickstart

### 1. Install `uv` and initialize environment

```bash
pip install uv
uv init
```

### 2. Run the Web App

```bash
uv run app.py
```

The dashboard will be available at: [http://localhost:5055](http://localhost:5055)

### 3. Send a Test Log

```bash
uv run test.py
```

Or use your own script that imports `logger.py` (see usage below).

---

## 🔧 Configuration

You can initialize a logger using the `Logger` class:

```python
from logger import Logger

log_config = {
    'console_output': True,
    'file_output': True,
    'file_path': 'logs/agent.log',
    'megrez_output': True,
    'megrez_url': 'http://localhost:5055',
    'megrez_token': 'your-token',
    'megrez_table': 'agent_logs',
    'sender_name': 'Agent01'
}

logger = Logger(log_config)
```

The valid tokens are managed in the file `static/tokens.json`.

---

## 📝 Usage

```python
logger.info("Agent started", "Bootstrapping agent memory", tags=["boot"])
logger.warn("Low energy", "Battery level at 15%", tags="system, power")
logger.error("Plan failed", "Could not reach the target location", tags=["planner"])
```

In `demo.py`, there is an example to send more log records.

---

## 🌐 Web Dashboard (Flask + React)

* Real-time **log tracking** with polling updates
* Multi-table support for different agent sources
* Submit logs from UI (for testing or debugging)
* View logs with filters (by level, tags, time)
* Token-based access control
* SaaS-style UI with React frontend under `/static/` and `/templates/index.html`

---

## 📂 File Structure

```
.
├── app.py               # Flask backend for web interface
├── logger.py            # Logger class (console + file + web)
├── demo.py              # Example log sender
├── static/
│   ├── script.js        # React frontend logic
│   └── style.css        # Stylesheet
├── templates/
│   └── index.html       # Main web interface
```

---

## 🛡️ License

Apache 2.0 License.
