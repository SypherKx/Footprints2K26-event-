export const eventStartDate = 'Feb 16, 2026 10:00:00';

export const coordinators = [
  { name: 'Suryansh Shukla', roll: '', phone: '', email: '' },
  { name: 'Divyansh Verma', roll: '', phone: '', email: '' },
  { name: 'Neelanshu Mishra', roll: '', phone: '', email: '' },
  { name: 'Apoorva Pandey', roll: '', phone: '', email: '' },
  { name: 'Karan Pratap Singh', roll: '', phone: '', email: '' },
  { name: 'Akhil Kumar Singh', roll: '', phone: '', email: '' },
  { name: 'Kautilya Shukla', roll: '', phone: '', email: '' },
  { name: 'Aryan Singh', roll: '', phone: '', email: '' },
  { name: 'Jahnavi Priya', roll: '', phone: '', email: '' },
  { name: 'Twinkle Pal', roll: '', phone: '', email: '' },
  { name: 'Arpit Bajpai', roll: '', phone: '', email: '' },
  { name: 'Arushi Singh', roll: '', phone: '', email: '' },
  { name: 'Harshit Arora', roll: '', phone: '', email: '' },
  { name: 'Yash Yadav', roll: '', phone: '', email: '' },
  { name: 'Kavya Kesarwani', roll: '', phone: '', email: '' },
  { name: 'Rashi Arora', roll: '', phone: '', email: '' },
  { name: 'Anshika Raikwar', roll: '', phone: '', email: '' },
  { name: 'Kanishka Mishra', roll: '', phone: '', email: '' },
  { name: 'Sanskriti Gupta', roll: '', phone: '', email: '' },
  { name: 'Rishveen Kaur', roll: '', phone: '', email: '' },
  { name: 'Manas Mishra', roll: '', phone: '', email: '' },
  { name: 'Anubhav Pathak', roll: '', phone: '', email: '' },
  { name: 'Vaishnavi Sharma', roll: '', phone: '', email: '' },
  { name: 'Swarnima Patel', roll: '', phone: '', email: '' },
  { name: 'Aryaveer Vikram Singh', roll: '', phone: '', email: '' },
  { name: 'Mujahidul Islam', roll: '', phone: '', email: '' },
  { name: 'Aryan Pratap Singh', roll: '', phone: '', email: '' },
  { name: 'Ashutosh Trivedi', roll: '', phone: '', email: '' },
  { name: 'Aman Pratap Singh', roll: '', phone: '', email: '' },
  { name: 'Arghadeep Rathore', roll: '', phone: '', email: '' },
  { name: 'Pragya Singh', roll: '', phone: '', email: '' },
]

export const mainCoordinators = [
  {
    name: 'Samarth Bhatt',
    imgSrc: '/media/coordinators/samarth_bhatt.png',
    roles: ['Website Head']
  },
  {
    name: 'Karan Pratap Singh',
    imgSrc: '/media/coordinators/karan_pratap_singh.png',
    roles: ['Website Co Head']
  },
  {
    name: 'Divyansh Vijay',
    imgSrc: '/media/coordinators/divyansh_vijay.png',
    roles: ['Website Co Head']
  },
  {
    name: 'Suryansh Sharan',
    imgSrc: '/media/coordinators/suryansh_sharan.png',
    roles: ['Website Co Head']
  },
  {
    name: 'Arpit Bajpai',
    imgSrc: '/media/coordinators/arpit_bajpai.png',
    roles: ['Joint Website Head']
  }
]

export const highlights = ['football_r3', 'basketball_r3', 'sprints_r3', 'khokho_r3', 'badminton_r3', 'volleyball_r3'];

export const events = {
  // --- Sports (Round 1 - Day 0) ---
  'day0_tba': { id: 'day0_tba', title: 'To Be Announced', figureSrc: '', day: 0, time: 'To Be Announced', venue: 'To Be Announced', desc: 'Schedule to be announced', type: 'Sport', highlight: false, isRegistrationOpen: true, gender: [], category: 'Open' },

  // --- Sports (Round 2 - Day 1) ---
  'day1_tba': { id: 'day1_tba', title: 'To Be Announced', figureSrc: '', day: 1, time: 'To Be Announced', venue: 'To Be Announced', desc: 'Schedule to be announced', type: 'Sport', highlight: false, isRegistrationOpen: true, gender: [], category: 'Open' },

  // --- Sports (Round 3 - Day 2) ---
  'day2_tba': { id: 'day2_tba', title: 'To Be Announced', figureSrc: '', day: 2, time: 'To Be Announced', venue: 'To Be Announced', desc: 'Schedule to be announced', type: 'Sport', highlight: false, isRegistrationOpen: true, gender: [], category: 'Open' },

  // --- Sports (Day 3) ---
  'day3_tba': { id: 'day3_tba', title: 'To Be Announced', figureSrc: '', day: 3, time: 'To Be Announced', venue: 'To Be Announced', desc: 'Schedule to be announced', type: 'Sport', highlight: false, isRegistrationOpen: true, gender: [], category: 'Open' },

  // --- Highlights ---
  'football_r3': { id: 'football_r3', price: 'TBA', title: 'Football', figureSrc: '/media/events/football-highlight-new.jpg', desc: 'The beautiful game', type: 'Sport', highlight: true, isRegistrationOpen: true, gender: ['M', 'F'], category: 'Male / Female', maleLink: '/register?event=football_r3&gender=M', femaleLink: '/register?event=football_r3&gender=F' },
  'kabaddi': { id: 'kabaddi', price: 'TBA', title: 'Kabaddi', figureSrc: '/media/events/kabaddi_new.jpg', desc: 'Strength and strategy', type: 'Sport', highlight: true, isRegistrationOpen: true, gender: ['M', 'F'], category: 'Male / Female', maleLink: '/register?event=kabaddi&gender=M', femaleLink: '/register?event=kabaddi&gender=F' },
  'slow_cycle': { id: 'slow_cycle', price: 'TBA', title: 'Slow Cycle', figureSrc: '/media/events/slow-cycle_new.jpg', desc: 'Balance and patience', type: 'Sport', highlight: true, isRegistrationOpen: true, gender: ['M', 'F'], category: 'Male / Female', maleLink: '/register?event=slow_cycle&gender=M', femaleLink: '/register?event=slow_cycle&gender=F' },

  'basketball_r3': { id: 'basketball_r3', price: 'TBA', title: 'Basketball', figureSrc: '/media/events/basketball-highlight-new.jpg', desc: 'Dribble, shoot, score', type: 'Sport', highlight: true, isRegistrationOpen: true, gender: ['M', 'F'], category: 'Male / Female', maleLink: '/register?event=basketball_r3&gender=M', femaleLink: '/register?event=basketball_r3&gender=F' },
  'sprints_r3': { id: 'sprints_r3', price: 'TBA', title: 'Sprints', figureSrc: '/media/events/sprint.jpg', desc: 'Speed and endurance', type: 'Sport', highlight: true, isRegistrationOpen: true, gender: ['M', 'F'], category: 'Male / Female', maleLink: '/register?event=sprints_r3&gender=M', femaleLink: '/register?event=sprints_r3&gender=F' },
  'khokho_r3': { id: 'khokho_r3', price: 'TBA', title: 'Kho-Kho', figureSrc: '/media/events/khokho-highlight.jpg', desc: 'Traditional tag game', type: 'Sport', highlight: true, isRegistrationOpen: true, gender: ['M', 'F'], category: 'Male / Female', maleLink: '/register?event=khokho_r3&gender=M', femaleLink: '/register?event=khokho_r3&gender=F' },
  'badminton_r3': { id: 'badminton_r3', price: 'TBA', title: 'Badminton', figureSrc: '/media/events/badminton.jpg', desc: 'Smash it!', type: 'Sport', highlight: true, isRegistrationOpen: true, gender: ['M', 'F'], category: 'Male / Female', maleLink: '/register?event=badminton_r3&gender=M', femaleLink: '/register?event=badminton_r3&gender=F' },
  'volleyball_r3': { id: 'volleyball_r3', price: 'TBA', title: 'Volleyball', figureSrc: '/media/events/volleyball-highlight-new.jpg', desc: 'Spike your way to victory', type: 'Sport', highlight: true, isRegistrationOpen: true, gender: ['M', 'F'], category: 'Male / Female', maleLink: '/register?event=volleyball_r3&gender=M', femaleLink: '/register?event=volleyball_r3&gender=F' },
}

export const eventSlots = {
  '0': ['2', '17', 'sport1', 'sport2'],
  '1': ['3', '4', 'sport3'],
  '2': ['7', '1'],
  '3': ['9'],
  '4': ['10', '11'],
  '5': ['14'],
  '6': ['8'],
}
