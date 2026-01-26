
import re

file_path = r'd:\shit experiments\More Projects Inside\Footprints website advance stage\FOOTPRINTS 2K26 MAIN\src\data\data.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Helper to adding/replacing values in the JS object string
def replace_in_line(line):
    # Only target lines that look like event definitions
    if "'id':" in line or "id:" in line:
        line = re.sub(r"title:\s*'.*?'", "title: 'TBA'", line)
        line = re.sub(r"venue:\s*'.*?'", "venue: 'TBA'", line)
        line = re.sub(r"time:\s*'.*?'", "time: 'TBA'", line)
    return line

# Split content into parts to isolate the events object
# We assume standard formatting as seen in view_file
start_marker = "export const events = {"
end_marker = "}"

# Find the block
start_idx = content.find(start_marker)
# Find the matching closing brace is tricky with simple find, but since it's at the end of the block...
# We know the block ends before `export const eventSlots`
end_block_marker = "export const eventSlots"
end_limit = content.find(end_block_marker)

if start_idx != -1 and end_limit != -1:
    # Process lines between start and end (searching for the closing brace of events specifically)
    # We'll just look for the last '}' before end_limit
    block_end_idx = content.rfind('}', start_idx, end_limit)
    
    events_block = content[start_idx:block_end_idx+1]
    
    # Process lines
    lines = events_block.split('\n')
    new_lines = []
    
    for line in lines:
        if "//" in line:
            new_lines.append(line)
        else:
            new_lines.append(replace_in_line(line))
            
    # Remove the last closing brace to append Day 3
    if new_lines[-1].strip() == '}':
        new_lines.pop()
        
    # Append Day 3 events
    day_3_events = [
        "",
        "  // --- Sports (Day 3) ---",
    ]
    for i in range(1, 6):
        day_3_events.append(f"  'tba_d3_{i}': {{ id: 'tba_d3_{i}', title: 'TBA', figureSrc: '', day: 3, time: 'TBA', venue: 'TBA', desc: 'TBA', type: 'Sport', highlight: false, isRegistrationOpen: true, gender: ['Male', 'Female'] }},")
    
    new_lines.extend(day_3_events)
    new_lines.append("}")
    
    new_events_block = '\n'.join(new_lines)
    
    # Reassemble file
    new_content = content[:start_idx] + new_events_block + content[block_end_idx+1:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Successfully updated events with TBA and added Day 3.")

else:
    print("Could not find events block.")
