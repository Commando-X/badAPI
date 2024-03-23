const express = require('express');
const router = express.Router();

// Array to store information of people who got the secure code correctly
let hallOfFameList = [];

// Winners Name
const playerData = [
  { name: "Olajeedae Jr", score: 4, twitterHandle: "@r007User" },
  { name: "The Hacker Guy!", score: 4, twitterHandle: "@IAmKingVeli" },
  { name: "Ahmed Khan", score: 4, twitterHandle: "@Ahmed___khaan" },
  { name: "Odogwu Howard", score: 4, twitterHandle: "@engr_howardemma" },
];

// Add player data to the Hall of Fame list
playerData.forEach(data => {
  hallOfFameList.push(data);
});

// Endpoint for retrieving the Hall of Fame list
router.get('/', (req, res) => {
  return res.json({ hallOfFame: hallOfFameList });
});

module.exports = router;
