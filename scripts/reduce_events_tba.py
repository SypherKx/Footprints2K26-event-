
import re

file_path = r'd:\shit experiments\More Projects Inside\Footprints website advance stage\FOOTPRINTS 2K26 MAIN\src\data\data.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Generate the new events block with single TBA event per day (0-3)
new_events_block = """export const events = {
  // --- Sports (Round 1 - Day 0) ---
  'day0_tba': { id: 'day0_tba', title: 'TBA', figureSrc: '', day: 0, time: 'TBA', venue: 'TBA', desc: 'Schedule to be announced', type: 'Sport', highlight: false, isRegistrationOpen: true, gender: [] },

  // --- Sports (Round 2 - Day 1) ---
  'day1_tba': { id: 'day1_tba', title: 'TBA', figureSrc: '', day: 1, time: 'TBA', venue: 'TBA', desc: 'Schedule to be announced', type: 'Sport', highlight: false, isRegistrationOpen: true, gender: [] },

  // --- Sports (Round 3 - Day 2) ---
  'day2_tba': { id: 'day2_tba', title: 'TBA', figureSrc: '', day: 2, time: 'TBA', venue: 'TBA', desc: 'Schedule to be announced', type: 'Sport', highlight: false, isRegistrationOpen: true, gender: [] },

  // --- Sports (Day 3) ---
  'day3_tba': { id: 'day3_tba', title: 'TBA', figureSrc: '', day: 3, time: 'TBA', venue: 'TBA', desc: 'Schedule to be announced', type: 'Sport', highlight: false, isRegistrationOpen: true, gender: [] },
}"""

# Find the start and end of the existing events object
start_marker = "export const events = {"
end_marker = "export const eventSlots"

start_idx = content.find(start_marker)
end_limit = content.find(end_marker)

if start_idx != -1 and end_limit != -1:
    block_end_idx = content.rfind('}', start_idx, end_limit)
    # Replace the block
    new_content = content[:start_idx] + new_events_block + content[block_end_idx+1:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced events with single TBA items.")
else:
    print("Could not find events block.")
