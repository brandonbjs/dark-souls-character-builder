![Alt Text](https://github.com/brandonbjs/dark-souls-character-builder/blob/main/public/images/dark-souls-title.jpg)

# Dark Souls Character Builder

A full stack MERN web application that lets Dark Souls players theorycraft 
character builds — selecting classes, allocating stats, equipping weapons, 
armor, rings, and spells — all while watching their character's stats update 
in real time.

Try it out: https://brandonbjs.github.io/Dark-Souls-Character-Builder-gh-pages/

---

## Developer
Brandon James Shaffer | B.S. Computer Science, Northern Arizona University
- Email: bjs397@nau.edu
- GitHub: https://github.com/brandonbjs
- LinkedIn: https://www.linkedin.com/in/brandonbjs/

---

## Features
- Choose from all starting classes with accurate base stat initialization
- Dynamically allocate stat points and track soul level in real time
- Equip weapons (4 slots), armor (4 pieces), rings (2), spells, arrows, bolts, and items
- Real-time calculation of HP, Stamina, Poise, Equip Load, Encumbrance, 
  Item Discovery, and all Defense stats
- Soft cap logic accurately reflects diminishing returns after Soul Level 225
- Humanity system that dynamically boosts resistances
- Compare weapon stats independently across all four weapon slots
- Open a fresh build in a new tab without losing your current one

---

## Tech Stack
- **Frontend:** React.js, CSS — deployed on GitHub Pages
- **Backend:** Node.js, Express.js — deployed on Render
- **Database:** MongoDB Atlas (cloud-hosted, free tier)
- **ODM:** Mongoose

---

## API Endpoints
All endpoints are GET only — game data is read-only by design.

| Endpoint         | Description                        |
|------------------|------------------------------------|
| /api/helmets     | Fetch all helmet documents         |
| /api/chests      | Fetch all chest armor documents    |
| /api/hands       | Fetch all hand armor documents     |
| /api/legs        | Fetch all leg armor documents      |
| /api/weapons     | Fetch all weapon documents         |
| /api/rings       | Fetch all ring documents           |
| /api/spells      | Fetch all spell documents          |
| /api/items       | Fetch all item documents           |

---

## Future Ideas
- User login and registration
- Save and share builds via unique URLs
- Build comparison tool

---

## Data Attribution
- Weapon data: [BonsaiDen](https://gist.github.com/BonsaiDen/4096890)
- Armor data: [gorhill](https://github.com/gorhill) via raymondhill.net
