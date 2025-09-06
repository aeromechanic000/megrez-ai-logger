import inspect
import functools
import datetime
import json
import math
import random
import logging
import warnings
import requests
import os
import threading
import time
from pathlib import Path
from typing import Dict, List, Optional, Union, Any

# Import the BStyles class
from bstyles import BStyles

warnings.filterwarnings("ignore")

def get_datetime():
    return datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")

def get_datetime_stamp():
    return datetime.datetime.now().strftime("%Y%m%d_%H%M%S_%f")

class Logger:
    """
    Advanced Logger class with colorful console output, file logging, and Megrez AI Logger integration.
    
    Features:
    - Colorful console output with timestamps
    - File logging with rotation
    - Remote logging to Megrez AI Logger API
    - Log level filtering
    - Tag support
    - Thread-safe operations
    """
    
    # Log level constants
    LEVELS = {
        'DEBUG': 0,
        'INFO': 1,
        'WARN': 2,
        'SUCCESS': 3,
        'ERROR': 4,
    }
    
    # Color mapping for different log types
    COLORS = {
        'DEBUG': BStyles.GRAY,
        'INFO': BStyles.LIGHT_CYAN,
        'WARN': BStyles.YELLOW,
        'ERROR': BStyles.RED,
        'SUCCESS': BStyles.GREEN,
    }
    
    def __init__(self, config: Dict[str, Any]):
        """
        Initialize the Logger with configuration.
        
        Args:
            config (dict): Configuration dictionary with the following keys:
                - console_output (bool): Enable console output (default: True)
                - console_level (str): Minimum level for console output (default: 'INFO')
                - file_output (bool): Enable file output (default: False)
                - file_path (str): Path to log file (default: 'logs/app.log')
                - file_level (str): Minimum level for file output (default: 'DEBUG')
                - megrez_output (bool): Enable Megrez AI Logger output (default: False)
                - megrez_url (str): Megrez AI Logger URL (default: 'http://localhost:5055')
                - megrez_token (str): Access token for Megrez AI Logger
                - megrez_table (str): Table name for Megrez logs (default: 'python_app')
                - megrez_level (str): Minimum level for Megrez output (default: 'INFO')
                - sender_name (str): Name of the sender (default: 'PythonApp')
                - max_file_size (int): Max file size in MB before rotation (default: 10)
                - backup_count (int): Number of backup files to keep (default: 5)
        """
        self.config = self._merge_default_config(config)
        self._lock = threading.Lock()
        
        # Setup file logging if enabled
        if self.config['file_output']:
            self._setup_file_logging()
        
        # Test Megrez connection if enabled
        if self.config['megrez_output']:
            self._test_megrez_connection()
    
    def _merge_default_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Merge user config with default values."""
        default_config = {
            'console_output': True,
            'console_level': 'INFO',
            'file_output': False,
            'file_path': 'logs/app.log',
            'file_level': 'DEBUG',
            'megrez_output': False,
            'megrez_url': 'http://localhost:5055',
            'megrez_token': '',
            'megrez_table': 'python_app',
            'megrez_level': 'INFO',
            'sender_name': 'PythonApp',
            'max_file_size': 10,  # MB
            'backup_count': 5,
        }
        
        # Merge configs
        merged = default_config.copy()
        merged.update(config)
        
        return merged
    
    def _setup_file_logging(self):
        """Setup file logging with rotation."""
        try:
            # Create directory if it doesn't exist
            log_dir = Path(self.config['file_path']).parent
            log_dir.mkdir(parents=True, exist_ok=True)
            
            # Setup rotating file handler
            from logging.handlers import RotatingFileHandler
            
            max_bytes = self.config['max_file_size'] * 1024 * 1024  # Convert MB to bytes
            
            self.file_handler = RotatingFileHandler(
                self.config['file_path'],
                maxBytes=max_bytes,
                backupCount=self.config['backup_count']
            )
            
            # Setup formatter
            formatter = logging.Formatter(
                '%(asctime)s - %(levelname)s - %(message)s',
                datefmt='%Y/%m/%d %H:%M:%S'
            )
            self.file_handler.setFormatter(formatter)
            
            # Setup logger
            self.file_logger = logging.getLogger(f'megrez_logger_{id(self)}')
            self.file_logger.setLevel(logging.DEBUG)
            self.file_logger.addHandler(self.file_handler)
            
        except Exception as e:
            print(f"{BStyles.RED}[ERROR] Failed to setup file logging: {e}{BStyles.ENDC}")
            self.config['file_output'] = False
    
    def _test_megrez_connection(self):
        """Test connection to Megrez AI Logger."""
        try:
            # Test with a simple auth check
            headers = {}
            if self.config['megrez_token']:
                # For session-based auth, we might need to login first
                login_data = {'token': self.config['megrez_token']}
                response = requests.post(
                    f"{self.config['megrez_url']}/api/login",
                    json=login_data,
                    timeout=5
                )
                if response.status_code == 200:
                    print(f"{BStyles.GREEN}[SUCCESS] Connected to Megrez AI Logger{BStyles.ENDC}")
                else:
                    print(f"{BStyles.YELLOW}[WARN] Megrez AI Logger connection test failed. Logs will be sent anyway.{BStyles.ENDC}")
            else:
                print(f"{BStyles.YELLOW}[WARN] No Megrez token provided. Remote logging may fail.{BStyles.ENDC}")
                
        except Exception as e:
            print(f"{BStyles.YELLOW}[WARN] Cannot connect to Megrez AI Logger: {e}{BStyles.ENDC}")
    
    def _should_output(self, level: str, output_type: str) -> bool:
        """Check if log should be output based on level."""
        if output_type == 'console':
            min_level = self.config['console_level']
        elif output_type == 'file':
            min_level = self.config['file_level']
        elif output_type == 'megrez':
            min_level = self.config['megrez_level']
        else:
            return False
        
        # Convert custom levels to standard levels for comparison
        level_map = {
            'SUCCESS': 'INFO',
            'SYSTEM': 'INFO',
            'AGENT': 'INFO',
            'PLUGIN': 'INFO',
            'MEMORY': 'DEBUG',
            'ACTION': 'INFO',
            'CODING': 'DEBUG',
        }
        
        check_level = level_map.get(level, level)
        
        return self.LEVELS.get(check_level, 0) >= self.LEVELS.get(min_level, 0)
    
    def _format_console_message(self, title: str, content: str, level: str, tags: List[str]) -> str:
        """Format message for console output."""
        color = self.COLORS.get(level, BStyles.WHITE)
        timestamp = get_datetime()
        
        # Format tags
        tag_str = ""
        if tags:
            tag_str = f" [{', '.join(tags)}]"
        
        formatted_title = f"{color}[{timestamp}] [{level}]{BStyles.ENDC} {title}{tag_str}"
        
        if content and content.strip():
            return f"{formatted_title}\n{content}"
        else:
            return formatted_title
    
    def _write_to_file(self, title: str, content: str, level: str, tags: List[str]):
        """Write log to file."""
        if not self.config['file_output'] or not hasattr(self, 'file_logger'):
            return
        
        try:
            # Format message for file
            tag_str = f" [{', '.join(tags)}]" if tags else ""
            message = f"{title}{tag_str}"
            if content and content.strip():
                message += f" - {content}"
            
            # Map custom levels to logging levels
            level_map = {
                'DEBUG': logging.DEBUG,
                'INFO': logging.INFO,
                'SUCCESS': logging.INFO,
                'WARN': logging.WARNING,
                'ERROR': logging.ERROR,
            }
            
            log_level = level_map.get(level, logging.INFO)
            self.file_logger.log(log_level, message)
            
        except Exception as e:
            print(f"{BStyles.RED}[ERROR] Failed to write to file: {e}{BStyles.ENDC}")
    
    def _send_to_megrez(self, title: str, content: str, level: str, tags: List[str]):
        """Send log to Megrez AI Logger in a separate thread."""
        if not self.config['megrez_output']:
            return
        
        def send_log():
            try:
                # Prepare log data
                log_data = {
                    'table_name': self.config['megrez_table'],
                    'level': level,
                    'message': f"{title}: {content}" if content else title,
                    'tags': tags,
                    'sender': self.config['sender_name']
                }
                
                # Create session and login if token provided
                session = requests.Session()
                if self.config['megrez_token']:
                    login_response = session.post(
                        f"{self.config['megrez_url']}/api/login",
                        json={'token': self.config['megrez_token']},
                        timeout=10
                    )
                    if login_response.status_code != 200:
                        print(f"{BStyles.YELLOW}[WARN] Megrez login failed{BStyles.ENDC}")
                        return
                
                # Send log
                response = session.post(
                    f"{self.config['megrez_url']}/api/logs",
                    json=log_data,
                    timeout=10
                )
                
                if response.status_code != 200:
                    print(f"{BStyles.YELLOW}[WARN] Failed to send log to Megrez: HTTP {response.status_code}{BStyles.ENDC}")
                
            except Exception as e:
                print(f"{BStyles.YELLOW}[WARN] Megrez logging failed: {e}{BStyles.ENDC}")
        
        # Send in background thread to avoid blocking
        threading.Thread(target=send_log, daemon=True).start()
    
    def add_log(self, 
                title: str, 
                content: str = "", 
                level: str = "INFO", 
                tags: Optional[Union[str, List[str]]] = None,
                print_console: bool = True):
        """
        Add a log entry with multiple output options.
        
        Args:
            title (str): Log title/message
            content (str): Additional content/details
            level (str): Log level (DEBUG, INFO, WARN, SUCCESS, ERROR)
            tags (str or list): Tags for categorization
            print_console (bool): Override console output for this log
        """
        with self._lock:
            # Normalize level
            level = level.upper()
            
            # Process tags
            if tags is None:
                tags = []
            elif isinstance(tags, str):
                tags = [tag.strip() for tag in tags.split(',') if tag.strip()]
            elif isinstance(tags, list):
                tags = [str(tag).strip() for tag in tags if str(tag).strip()]
            
            # Console output
            if (self.config['console_output'] and 
                print_console and 
                self._should_output(level, 'console')):
                
                console_msg = self._format_console_message(title, content, level, tags)
                print(console_msg)
            
            # File output
            if (self.config['file_output'] and 
                self._should_output(level, 'file')):
                
                self._write_to_file(title, content, level, tags)
            
            # Megrez output
            if (self.config['megrez_output'] and 
                self._should_output(level, 'megrez')):
                
                self._send_to_megrez(title, content, level, tags)
    
    # Convenience methods for different log levels
    def debug(self, title: str, content: str = "", tags: Optional[Union[str, List[str]]] = None):
        """Log debug message."""
        self.add_log(title, content, "DEBUG", tags)
    
    def info(self, title: str, content: str = "", tags: Optional[Union[str, List[str]]] = None):
        """Log info message."""
        self.add_log(title, content, "INFO", tags)
    
    def warn(self, title: str, content: str = "", tags: Optional[Union[str, List[str]]] = None):
        """Log warning message."""
        self.add_log(title, content, "WARN", tags)
    
    def error(self, title: str, content: str = "", tags: Optional[Union[str, List[str]]] = None):
        """Log error message."""
        self.add_log(title, content, "ERROR", tags)
    
    def success(self, title: str, content: str = "", tags: Optional[Union[str, List[str]]] = None):
        """Log success message."""
        self.add_log(title, content, "SUCCESS", tags)
    
    def set_console_level(self, level: str):
        """Change console log level."""
        self.config['console_level'] = level.upper()
    
    def set_file_level(self, level: str):
        """Change file log level."""
        self.config['file_level'] = level.upper()
    
    def set_megrez_level(self, level: str):
        """Change Megrez log level."""
        self.config['megrez_level'] = level.upper()
    
    def close(self):
        """Close logger and cleanup resources."""
        if hasattr(self, 'file_handler'):
            self.file_handler.close()


# Example usage and testing
if __name__ == "__main__":
    # Example configuration
    config = {
        'console_output': True,
        'console_level': 'DEBUG',
        'file_output': True,
        'file_path': 'logs/test_app.log',
        'file_level': 'INFO',
        'megrez_output': True,
        'megrez_url': 'http://localhost:5055',
        'megrez_token': 'test456',
        'megrez_table': 'python_test',
        'sender_name': 'TestApp',
    }
    
    # Create logger
    logger = Logger(config)
    
    print(f"{BStyles.BOLD}{BStyles.BLUE}Starting Logger Test with Random Delays...{BStyles.ENDC}\n")
    
    # Test messages with descriptions for better demonstration
    test_logs = [
        ("DEBUG", "Debug message", "This is a debug message with detailed information", ["debug", "test"]),
        ("INFO", "Application started", "Starting main application loop with configuration loaded", ["startup", "system"]),
        ("SUCCESS", "Task completed successfully", "Data processing finished - processed 1000 records in 2.5 seconds", ["task", "success"]),
        ("WARN", "Low memory warning", "Memory usage is at 85% - consider freeing up resources", ["performance", "memory"]),
        ("ERROR", "Database connection failed", "Unable to connect to MySQL server at localhost:3306", ["database", "error"]),
    ]
    
    # Execute test logs with random delays
    for i, (log_type, title, content, tags) in enumerate(test_logs, 1):
        # Random delay between 0.5 to 3 seconds
        delay = random.uniform(0.5, 3.0)
        
        print(f"{BStyles.GRAY}[Test {i}/{len(test_logs)}] Waiting {delay:.1f}s before next log...{BStyles.ENDC}")
        time.sleep(delay)
        
        # Call the appropriate logging method
        if hasattr(logger, log_type):
            getattr(logger, log_type)(title, content, tags)
        else:
            logger.add_log(title, content, log_type.upper(), tags)
    
    # Test level filtering with additional delay
    print(f"\n{BStyles.BOLD}{'='*60}{BStyles.ENDC}")
    print(f"{BStyles.BOLD}{BStyles.YELLOW}Testing level filtering (setting console to ERROR level){BStyles.ENDC}")
    print(f"{BStyles.BOLD}{'='*60}{BStyles.ENDC}")
    
    time.sleep(2)  # Pause before level change demonstration
    
    logger.set_console_level('ERROR')
    
    # Test with different levels after filter change
    filter_test_logs = [
        ("INFO", "This should not appear in console", "But should go to file and Megrez if enabled"),
        ("WARN", "This warning won't show", "Warning level is below ERROR threshold"),
        ("SUCCESS", "Success message", "success will show"),
        ("ERROR", "This error will appear", "Error level meets the threshold"),
    ]
    
    for log_type, title, content in filter_test_logs:
        delay = random.uniform(1.0, 2.5)
        print(f"{BStyles.GRAY}Waiting {delay:.1f}s...{BStyles.ENDC}")
        time.sleep(delay)
        
        if hasattr(logger, log_type):
            getattr(logger, log_type)(title, content, ["filter-test"])
    
    # Final delay before cleanup
    time.sleep(1)
    
    print(f"\n{BStyles.BOLD}{BStyles.GREEN}Logger test completed!{BStyles.ENDC}")
    print(f"{BStyles.GRAY}Check your log file and Megrez AI Logger for recorded entries.{BStyles.ENDC}")
    
    # Cleanup
    logger.close()