#!/usr/bin/env python3
"""
Simple stock market AI agent log simulation with delays.
"""

from logger import Logger
from bstyles import BStyles
import time
import random

def main():
    """Generate stock market AI agent logs with random delays."""
    
    # Configure logger
    config = {
        'console_output': True,
        'console_level': 'DEBUG',
        'file_output': True,
        'file_path': 'logs/stock_market_agent.log',
        'file_level': 'INFO',
        'megrez_output': True,
        'megrez_url': 'http://localhost:5555',
        'megrez_token': 'test456',
        'megrez_table': 'stock_market_ai',
        'sender_name': 'StockMarketAI',
    }
    
    logger = Logger(config)
    
    print(BStyles.bold(BStyles.blue("🤖 Stock Market AI Agent - Log Simulation")))
    print(BStyles.gray("Generating realistic trading logs with delays...\n"))
    
    # Stock market AI agent logs
    logs = [
        # ("INFO", "Market session initialized", "NYSE and NASDAQ connections established successfully", ["market", "startup"]),
        # ("INFO", "Pre-market analysis started", "Scanning overnight news and earnings reports", ["analysis", "pre-market"]),
        # ("INFO", "AAPL price update", "$175.50 (+1.2%) Volume: 2.3M RSI: 65.2", ["price", "aapl", "monitoring"]),
        # ("SUCCESS", "News sentiment analysis", "AAPL earnings beat expectations - Positive sentiment detected", ["news", "sentiment", "aapl"]),
        # ("INFO", "Technical analysis complete", "Support level identified at $174.00 for AAPL", ["technical", "analysis", "aapl"]),
        # ("WARN", "High volatility detected", "TSLA showing 15min volatility spike - increased monitoring", ["volatility", "tsla", "alert"]),
        # ("ACTION", "Buy signal generated", "MSFT oversold condition with bullish divergence", ["signal", "buy", "msft"]),
        # ("SUCCESS", "Trade executed", "Bought 100 shares MSFT at $418.25 - Order filled", ["execution", "buy", "msft"]),
        # ("INFO", "Portfolio update", "Current value: $1,247,832 (+2.4% today)", ["portfolio", "performance"]),
        # ("INFO", "Risk assessment", "Tech sector exposure: 68% - within acceptable limits", ["risk", "exposure", "tech"]),
        # ("INFO", "Pattern recognition", "Head and shoulders pattern forming on GOOGL 4H chart", ["pattern", "technical", "googl"]),
        # ("WARN", "Market volatility spike", "VIX jumped to 28.5 - increasing position sizes cautiously", ["vix", "volatility", "market"]),
        # ("ERROR", "Data feed interruption", "NYSE data feed timeout - switching to backup source", ["data", "connection", "error"]),
        # ("SUCCESS", "Connection restored", "Primary data feed reconnected - latency: 12ms", ["data", "connection", "recovery"]),
        # ("INFO", "Stop loss triggered", "TSLA position closed at $245.80 - 3.2% loss", ["stop-loss", "tsla", "risk"]),
        # ("INFO", "Sentiment shift detected", "Social media sentiment for tech stocks turning negative", ["sentiment", "social", "tech"]),
        # ("WARN", "API rate limit", "Approaching 80% of hourly API limit - throttling requests", ["api", "limits", "throttling"]),
        # ("INFO", "Earnings calendar", "NVDA earnings after market close - monitoring for volatility", ["earnings", "nvda", "calendar"]),
        # ("SUCCESS", "Arbitrage opportunity", "Price discrepancy detected: AMZN options vs underlying", ["arbitrage", "amzn", "opportunity"]),
        # ("INFO", "Position adjustment", "Reduced AAPL position by 25% - taking profits", ["position", "aapl", "profit"]),
        # ("INFO", "Algorithm performance", "Win rate: 67.3% | Sharpe ratio: 1.85 | Max drawdown: 4.2%", ["performance", "metrics", "algorithm"]),
        # ("INFO", "Market correlation analysis", "High correlation detected between tech and crypto movements", ["correlation", "tech", "crypto"]),
        # ("WARN", "Unusual options activity", "TSLA put volume 300% above average - bearish signal", ["options", "tsla", "unusual"]),
        # ("INFO", "Economic indicator", "GDP growth revised up to 2.4% - positive for equities", ["economic", "gdp", "macro"]),
        # ("SUCCESS", "ML model update", "Trading model retrained with 30-day data - accuracy improved 3.2%", ["ml", "model", "training"]),
        # ("INFO", "Sector rotation detected", "Money flowing from growth to value stocks", ["sector", "rotation", "flow"]),
        # ("ERROR", "Order rejection", "GOOGL buy order rejected - insufficient buying power", ["order", "rejection", "googl"]),
        # ("INFO", "Hedge position opened", "Bought SPY puts as portfolio hedge - 2% allocation", ["hedge", "spy", "protection"]),
        ("WARN", "Margin call risk", "Account approaching margin requirements - 78% utilized", ["margin", "risk", "account"]),
        # ("SUCCESS", "Day trading profit", "Scalped NVDA for $2,150 profit in 15 minutes", ["scalping", "nvda", "profit"]),
        # ("INFO", "Market close sequence", "Preparing end-of-day position summary and risk report", ["market", "close", "summary"]),
        # ("INFO", "Daily P&L summary", "Total profit: $18,450 (+1.84%) | Trades: 23 | Win rate: 69.6%", ["pnl", "daily", "summary"]),
        # ("INFO", "After-hours monitoring", "Switching to overnight mode - monitoring news and futures", ["after-hours", "monitoring", "overnight"])
    ]
    
    # Generate logs with random delays
    for i, (level, title, content, tags) in enumerate(logs, 1):
        # Random delay between 0.8 to 4.0 seconds
        delay = random.uniform(0.8, 4.0)
        
        print(BStyles.gray(f"[{i}/{len(logs)}] Next log in {delay:.1f}s..."))
        time.sleep(delay)
        
        # Log the message
        logger.add_log(title, content, level, tags)
    
    print(f"\n{BStyles.bold(BStyles.green('✅ Stock Market AI simulation completed!'))}")
    print(BStyles.gray("Generated 33 realistic trading session logs."))
    
    logger.close()

if __name__ == "__main__":
    main()