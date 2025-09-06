# app.py
import json, os, uuid, requests, threading
from datetime import datetime, timedelta, timezone
from collections import defaultdict
from flask import Flask, render_template, request, jsonify, session

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# In-memory storage for logs (ephemeral mode)
logs_storage = defaultdict(list)
settings = {
    'persistent_mode': False,
    'retention_hours': 24
}

chat_memory_storage = {}

def load_tokens():
    """Load access tokens from static/tokens.json"""
    try:
        with open('static/tokens.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        # Create default tokens file
        default_tokens = {
            "demo123": "demo_user",
            "test456": "test_user"
        }
        os.makedirs('static', exist_ok=True)
        with open('static/tokens.json', 'w') as f:
            json.dump(default_tokens, f, indent=2)
        return default_tokens

def get_table_stats():
    """Get statistics for all log tables"""
    stats = {}
    for table_name, logs in logs_storage.items():
        stats[table_name] = {
            'count': len(logs),
            'error_count': len([log for log in logs if log.get('level') == 'ERROR']),
            'latest': logs[-1]['timestamp'] if logs else None
        }
    return stats

def generate_log_summary():
    """Generate a summary of recent logs for AI analysis"""
    all_logs = []
    for table_name, logs in logs_storage.items():
        all_logs.extend(logs[-5:])  # Last 5 logs per table
    
    all_logs.sort(key=lambda x: x['timestamp'], reverse=True)
    recent_logs = all_logs[:20]  # Last 20 logs overall
    
    summary = {
        'total_logs': len(all_logs),
        'error_count': len([log for log in recent_logs if log['level'] == 'ERROR']),
        'warning_count': len([log for log in recent_logs if log['level'] == 'WARN']),
        'recent_errors': [log['message'] for log in recent_logs if log['level'] == 'ERROR'][:3],
        'active_tables': list(logs_storage.keys())
    }
    return summary

def format_logs_for_ai(log_context):
    """Format log records for AI consumption"""
    if not log_context:
        return "No recent logs available."
    
    formatted_logs = []
    for log in log_context:
        tags_str = f" [Tags: {', '.join(log.get('tags', []))}]" if log.get('tags') else ""
        formatted_logs.append(
            f"[{log['timestamp']}] {log['level']} - {log['table_name']} - {log['sender']}: {log['message']}{tags_str}"
        )
    
    return "\n".join(formatted_logs)

def format_chat_history_for_ai(chat_history):
    """Format chat history for AI consumption"""
    if not chat_history:
        return []
    
    formatted_history = []
    for msg in chat_history:
        formatted_history.append({
            'role': msg['role'],
            'content': msg['content']
        })
    
    return formatted_history

def update_chat_memory_async(username, chat_history, current_message, ai_response):
    """Update the chat memory summary for a user asynchronously"""
    def _update_memory():
        try:
            # Get existing memory or create new one
            existing_memory = chat_memory_storage.get(username, {})
            existing_summary = existing_memory.get('summary', '')
            
            # Prepare conversation context for summarization
            recent_conversation = []
            if chat_history:
                # Get last 3-4 exchanges to maintain context
                recent_history = chat_history[-6:] if len(chat_history) > 6 else chat_history
                for msg in recent_history:
                    recent_conversation.append(f"{msg['role']}: {msg['content']}")
            
            # Add current exchange
            recent_conversation.append(f"user: {current_message}")
            recent_conversation.append(f"assistant: {ai_response}")
            
            conversation_text = "\n".join(recent_conversation)
            
            # Create summary prompt
            summary_prompt = f"""Update this chat memory summary by incorporating the new conversation. Keep it under 200 words and focus on:
1. Key topics discussed
2. User's main concerns/questions about the log monitoring system
3. Important insights or recommendations provided
4. Any ongoing issues or patterns identified

EXISTING SUMMARY:
{existing_summary if existing_summary else "No previous conversation history."}

NEW CONVERSATION:
{conversation_text}

Provide an updated summary that captures the essential information from both the existing summary and new conversation:"""

            # Call AI to update summary
            response = requests.post(
                'https://text.pollinations.ai/',
                json={
                    'messages': [
                        {'role': 'system', 'content': 'You are a helpful assistant that creates concise conversation summaries for log monitoring sessions. Keep summaries under 200 words and focus on technical insights and user concerns.'},
                        {'role': 'user', 'content': summary_prompt}
                    ],
                    'model': 'openai'
                },
                timeout=15
            )
            
            if response.status_code == 200:
                new_summary = response.text.strip()
                
                # Store updated memory
                chat_memory_storage[username] = {
                    'summary': new_summary,
                    'last_updated': datetime.now(timezone.utc).isoformat(),
                    'conversation_count': existing_memory.get('conversation_count', 0) + 1
                }
                
                print(f"✓ Updated chat memory for {username}: {len(new_summary)} characters")
            else:
                print(f"✗ Failed to update chat memory for {username}: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"✗ Error updating chat memory for {username}: {e}")
    
    # Start the memory update in a separate thread
    memory_thread = threading.Thread(target=_update_memory, daemon=True)
    memory_thread.start()
    print(f"→ Started background memory update for {username}")

def get_chat_memory(username):
    """Get the chat memory summary for a user"""
    memory = chat_memory_storage.get(username, {})
    return memory.get('summary', '')

def has_recent_memory_update(username, minutes=5):
    """Check if memory was updated recently to avoid redundant updates"""
    memory = chat_memory_storage.get(username, {})
    if not memory.get('last_updated'):
        return False
    
    try:
        last_updated = datetime.fromisoformat(memory['last_updated'].replace('Z', '+00:00'))
        now = datetime.now(timezone.utc)
        return (now - last_updated).total_seconds() < (minutes * 60)
    except:
        return False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    token = data.get('token')
    
    tokens = load_tokens()
    if token in tokens:
        session['username'] = tokens[token]
        session['authenticated'] = True
        return jsonify({'success': True, 'username': tokens[token]})
    
    return jsonify({'success': False, 'error': 'Invalid token'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True})

@app.route('/api/check-auth')
def check_auth():
    if session.get('authenticated'):
        return jsonify({'authenticated': True, 'username': session.get('username')})
    return jsonify({'authenticated': False})

@app.route('/api/logs', methods=['POST'])
def submit_log():
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    data = request.get_json()
    
    # Create timestamp with timezone info (UTC)
    now = datetime.now(timezone.utc)
    timestamp = now.isoformat()
    
    log_entry = {
        'id': str(uuid.uuid4()),
        'timestamp': timestamp,  # Now includes timezone info
        'table_name': data.get('table_name', 'default'),
        'level': data.get('level', 'INFO'),
        'message': data.get('message', ''),
        'tags': data.get('tags', []),
        'sender': session.get('username')
    }
    
    table_name = log_entry['table_name']
    logs_storage[table_name].append(log_entry)
    
    print(f"Created log with timestamp: {timestamp}")
    
    return jsonify({'success': True, 'log': log_entry})

@app.route('/api/logs/<table_name>')
def get_logs(table_name):
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    logs = logs_storage.get(table_name, [])
    
    # Apply filters
    level_filter = request.args.get('level')
    sender_filter = request.args.get('sender')
    search_query = request.args.get('search', '').lower()
    
    filtered_logs = logs
    if level_filter:
        filtered_logs = [log for log in filtered_logs if log['level'] == level_filter]
    if sender_filter:
        filtered_logs = [log for log in filtered_logs if log['sender'] == sender_filter]
    if search_query:
        filtered_logs = [log for log in filtered_logs if search_query in log['message'].lower()]
    
    # Pagination
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 50))
    start = (page - 1) * per_page
    end = start + per_page
    
    return jsonify({
        'logs': filtered_logs[start:end],
        'total': len(filtered_logs),
        'page': page,
        'per_page': per_page
    })

@app.route('/api/tables')
def get_tables():
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    return jsonify({
        'tables': list(logs_storage.keys()),
        'stats': get_table_stats()
    })

@app.route('/api/dashboard')
def get_dashboard():
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    total_logs = sum(len(logs) for logs in logs_storage.values())
    table_stats = get_table_stats()
    
    return jsonify({
        'total_logs': total_logs,
        'total_tables': len(logs_storage),
        'table_stats': table_stats
    })

@app.route('/api/logs/realtime')
def get_realtime_logs():
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    # Check if 'since' parameter is provided for incremental updates
    since_param = request.args.get('since')
    since_time = None
    
    if since_param:
        try:
            # Parse the since parameter and handle timezone awareness
            if since_param.endswith('Z'):
                # ISO format with Z (UTC)
                since_time = datetime.fromisoformat(since_param.replace('Z', '+00:00'))
            elif '+' in since_param or since_param.count('-') > 2:
                # ISO format with timezone offset
                since_time = datetime.fromisoformat(since_param)
            else:
                # ISO format without timezone - assume UTC
                since_time = datetime.fromisoformat(since_param).replace(tzinfo=timezone.utc)
                
            print(f"Parsed since_time: {since_time}")
            
        except ValueError as e:
            print(f"Error parsing since parameter '{since_param}': {e}")
            since_time = None
    
    # Get logs from all tables
    all_logs = []
    for table_name, logs in logs_storage.items():
        for log in logs:
            if since_time:
                try:
                    # Parse log timestamp and make it timezone-aware if needed
                    log_timestamp = log['timestamp']
                    if log_timestamp.endswith('Z'):
                        log_time = datetime.fromisoformat(log_timestamp.replace('Z', '+00:00'))
                    elif '+' in log_timestamp or log_timestamp.count('-') > 2:
                        log_time = datetime.fromisoformat(log_timestamp)
                    else:
                        # If no timezone info, assume UTC
                        log_time = datetime.fromisoformat(log_timestamp).replace(tzinfo=timezone.utc)
                    
                    # Now both datetimes are timezone-aware, safe to compare
                    if log_time <= since_time:
                        continue
                        
                except ValueError as e:
                    print(f"Error parsing log timestamp '{log['timestamp']}': {e}")
                    # If we can't parse the timestamp, include the log to be safe
                    continue
                    
            all_logs.append(log)
    
    # Sort by timestamp (newest first for real-time display)
    all_logs.sort(key=lambda x: x['timestamp'], reverse=True)
    
    print(f"Returning {len(all_logs)} logs (since: {since_param})")
    
    # Return latest logs (limit to 100 for performance)
    return jsonify({'logs': all_logs[:100]})

@app.route('/api/chat', methods=['POST'])
def chat_with_ai():
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    data = request.get_json()
    user_message = data.get('message', '')
    chat_history = data.get('chatHistory', [])
    log_context = data.get('logContext', '')
    user_settings = data.get('settings', {})
    username = session.get('username')
    
    # Generate system context from logs
    log_summary = generate_log_summary()
    
    # Get chat memory summary (this is fast - just reading from memory)
    memory_summary = get_chat_memory(username)
    
    # Format chat history (limit to recent messages since we have memory)
    formatted_history = format_chat_history_for_ai(chat_history[-4:])  # Only last 2 exchanges
    
    # Get word limits from settings
    chat_word_limit = user_settings.get('chatWordLimit', 400)
    log_word_limit = user_settings.get('logWordLimit', 800)
    
    # Create enhanced system prompt with log context and memory
    system_prompt = f"""You are Megrez AI, an intelligent log monitoring assistant with access to real-time system data.

CURRENT SYSTEM STATUS:
- Total logs in system: {log_summary['total_logs']}
- Recent errors: {log_summary['error_count']}
- Recent warnings: {log_summary['warning_count']}
- Active tables: {', '.join(log_summary['active_tables'])}
- Recent error messages: {', '.join(log_summary['recent_errors'])}

CONVERSATION MEMORY SUMMARY:
{memory_summary if memory_summary else "This is the start of a new conversation."}

FILTERED LOG RECORDS (last {user_settings.get('maxContextLogs', 50)} records, ~{log_word_limit} words):
{log_context}

CHAT CONTEXT:
- Max memory messages: {user_settings.get('maxMemoryMsgs', 10)}
- Max context logs: {user_settings.get('maxContextLogs', 50)}
- Chat history word limit: {chat_word_limit} words
- Log context word limit: {log_word_limit} words
- Recent conversation history: {len(formatted_history)} messages

INSTRUCTIONS:
1. Use the CONVERSATION MEMORY SUMMARY to understand the broader context of your ongoing conversation with this user
2. Analyze the provided FILTERED log data to understand current system state
3. Reference specific log entries when relevant to the user's question
4. Provide actionable insights and recommendations based on the filtered data
5. If asked about trends, look for patterns in the filtered log data
6. Keep responses CONCISE but informative (aim for 2-3 sentences for simple questions)
7. Use both the memory summary and recent chat history to maintain conversation context
8. Highlight any critical issues (errors, warnings) that need attention
9. IMPORTANT: Keep your responses brief and focused - users prefer concise, actionable answers
10. The log data you see is already filtered by the user's current view/filters

Respond as a helpful AI assistant that analyzes the filtered logs and provides concise, actionable insights."""

    try:
        # Prepare messages for AI API
        messages = [{'role': 'system', 'content': system_prompt}]
        
        # Add recent chat history (limited since we have memory summary)
        messages.extend(formatted_history)
        
        # Add current user message
        messages.append({'role': 'user', 'content': user_message})
        
        # Call Pollinations AI API (this is the main request)
        response = requests.post(
            'https://text.pollinations.ai/',
            json={
                'messages': messages,
                'model': 'openai'
            },
            timeout=30
        )
        
        if response.status_code == 200:
            ai_response = response.text
            
            # IMMEDIATELY return response to frontend - don't wait for memory update
            enhanced_context = {
                **log_summary,
                'filtered_logs_count': len(log_context.split('\n')) if log_context else 0,
                'chat_history_length': len(chat_history),
                'memory_summary_length': len(memory_summary) if memory_summary else 0,
                'user_settings': user_settings,
                'word_limits': {
                    'chat_history': chat_word_limit,
                    'log_context': log_word_limit
                }
            }
            
            # Start async memory update AFTER we've prepared the response
            # Only update if we haven't updated recently (avoid spam)
            if not has_recent_memory_update(username, minutes=2):
                update_chat_memory_async(username, chat_history, user_message, ai_response)
            else:
                print(f"→ Skipping memory update for {username} (too recent)")
            
            return jsonify({
                'success': True,
                'response': ai_response,
                'context': enhanced_context
            })
        else:
            return jsonify({
                'success': False,
                'error': 'AI service unavailable'
            }), 500
            
    except requests.exceptions.RequestException as e:
        print(f"AI API Error: {e}")
        return jsonify({
            'success': False,
            'error': 'Failed to connect to AI service'
        }), 500

@app.route('/api/chat/memory')
def get_chat_memory_info():
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    username = session.get('username')
    memory = chat_memory_storage.get(username, {})
    
    # Count active threads (for debugging)
    active_threads = threading.active_count()
    
    return jsonify({
        'has_memory': bool(memory),
        'summary_length': len(memory.get('summary', '')),
        'last_updated': memory.get('last_updated'),
        'conversation_count': memory.get('conversation_count', 0),
        'summary': memory.get('summary', '') if memory else None,
        'active_background_threads': active_threads,
        'has_recent_update': has_recent_memory_update(username, minutes=5)
    })

@app.route('/api/chat/memory', methods=['DELETE'])
def clear_chat_memory():
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    username = session.get('username')
    if username in chat_memory_storage:
        del chat_memory_storage[username]
        print(f"✓ Cleared chat memory for {username}")
    
    return jsonify({'success': True})

@app.route('/api/settings', methods=['GET', 'POST'])
def handle_settings():
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    global settings
    
    if request.method == 'POST':
        data = request.get_json()
        settings.update(data)
        return jsonify({'success': True, 'settings': settings})
    
    return jsonify({'settings': settings})

@app.route('/api/tables/<table_name>', methods=['DELETE'])
def delete_table(table_name):
    if not session.get('authenticated'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    if table_name in logs_storage:
        del logs_storage[table_name]
        return jsonify({'success': True})
    
    return jsonify({'error': 'Table not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5055)