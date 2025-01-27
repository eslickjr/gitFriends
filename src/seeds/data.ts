const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];

const thoughts = [
    'I am a busy bee',
    'The rain feels nice',
    'Christmas is coming',
    'Just got a new job',
    'New car who dis',
    'Presenting at a conference',
];

const reactions = [
    'Like',
    'Love',
    'Haha',
    'Wow',
    'Sad',
    'Angry',
];

// Get a random item given an array
export const getRandomArrItem = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
export const getRandomName =() =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts that we can add to thought object.
export const getRandomThoughts = (int: number) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push(
      getRandomArrItem(thoughts),
    );
  }
  return results;
};

// Function to generate random reactions that we can add to reaction object.
export const getRandomReactions = (int: number) => {
  const results: { reaction: string }[] = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reaction: getRandomArrItem(reactions),
    });
  }
  return results;
};