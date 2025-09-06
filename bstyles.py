class BStyles:
    """
    Color and style constants for terminal output.
    Provides ANSI escape codes for colorful console output.
    """
    
    # Basic colors
    GREEN = '\033[92m'           
    BLUE = '\033[94m'           
    CYAN = '\033[96m'            
    ORANGE = '\033[38;5;208m'   
    RED = '\033[31m'            
    PINK = '\033[38;5;205m'     
    GRAY = '\033[90m'           
    PURPLE = '\033[35m'         
    YELLOW = '\033[93m'        
    WHITE = '\033[97m'        
    
    # Light colors
    LIGHT_GREEN = '\033[92;1m'  
    LIGHT_CYAN = '\033[96;1m'   
    LIGHT_RED = '\033[91m'      
    LIGHT_PURPLE = '\033[95m'   
    LIGHT_ORANGE = '\033[38;5;214m'
    
    # Dark colors
    DARK_BLUE = '\033[34m'      
    DARK_CYAN = '\033[36m'      
    DARK_YELLOW = '\033[33m'   
    DARK_ORANGE = '\033[38;5;166m' 
    
    # Special colors
    BROWN = '\033[38;5;130m'    
    GOLD = '\033[38;5;220m'     
    SILVER = '\033[38;5;246m'   
    LIME = '\033[38;5;118m'    
    MINT = '\033[38;5;159m'     
    LAVENDER = '\033[38;5;183m' 
    ROSE = '\033[38;5;213m'     
    
    # Background colors
    BG_BLACK = '\033[40m'       
    BG_RED = '\033[41m'         
    BG_GREEN = '\033[42m'       
    BG_YELLOW = '\033[43m'      
    BG_BLUE = '\033[44m'        
    BG_PURPLE = '\033[45m'      
    BG_CYAN = '\033[46m'        
    BG_WHITE = '\033[47m'       
    BG_GRAY = '\033[100m'       
    
    # Text styles
    ENDC = '\033[0m'            # End color
    BOLD = '\033[1m'            # Bold text
    FAINT = '\033[2m'           # Faint text
    ITALIC = '\033[3m'          # Italic text
    UNDERLINE = '\033[4m'       # Underlined text
    SLOW_BLINK = '\033[5m'      # Slow blinking
    RAPID_BLINK = '\033[6m'     # Rapid blinking
    INVERT = '\033[7m'          # Inverted colors
    HIDE = '\033[8m'            # Hidden text
    STRIKETHROUGH = '\033[9m'   # Strikethrough text
    DOUBLE_UNDERLINE = '\033[21m'  # Double underline
    OVERLINE = '\033[53m'       # Overlined text
    
    # Reset styles
    RESET_UNDERLINE = '\033[24m' 
    RESET_BOLD = '\033[22m'      
    RESET_INVERT = '\033[27m'    
    
    @classmethod
    def colorize(cls, text: str, color: str, end: bool = True) -> str:
        """
        Colorize text with the specified color.
        
        Args:
            text (str): Text to colorize
            color (str): Color code (e.g., BStyles.RED)
            end (bool): Whether to add end color code
            
        Returns:
            str: Colorized text
        """
        if end:
            return f"{color}{text}{cls.ENDC}"
        else:
            return f"{color}{text}"
    
    @classmethod
    def bold(cls, text: str) -> str:
        """Make text bold."""
        return f"{cls.BOLD}{text}{cls.ENDC}"
    
    @classmethod
    def italic(cls, text: str) -> str:
        """Make text italic."""
        return f"{cls.ITALIC}{text}{cls.ENDC}"
    
    @classmethod
    def underline(cls, text: str) -> str:
        """Make text underlined."""
        return f"{cls.UNDERLINE}{text}{cls.ENDC}"
    
    @classmethod
    def red(cls, text: str) -> str:
        """Make text red."""
        return cls.colorize(text, cls.RED)
    
    @classmethod
    def green(cls, text: str) -> str:
        """Make text green."""
        return cls.colorize(text, cls.GREEN)
    
    @classmethod
    def blue(cls, text: str) -> str:
        """Make text blue."""
        return cls.colorize(text, cls.BLUE)
    
    @classmethod
    def yellow(cls, text: str) -> str:
        """Make text yellow."""
        return cls.colorize(text, cls.YELLOW)
    
    @classmethod
    def purple(cls, text: str) -> str:
        """Make text purple."""
        return cls.colorize(text, cls.PURPLE)
    
    @classmethod
    def cyan(cls, text: str) -> str:
        """Make text cyan."""
        return cls.colorize(text, cls.CYAN)
    
    @classmethod
    def gray(cls, text: str) -> str:
        """Make text gray."""
        return cls.colorize(text, cls.GRAY)
    
    @classmethod
    def orange(cls, text: str) -> str:
        """Make text orange."""
        return cls.colorize(text, cls.ORANGE)