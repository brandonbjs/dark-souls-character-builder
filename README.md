![Alt Text](https://github.com/brandonbjs/dark-souls-character-builder/blob/main/public/images/dark-souls-title.jpg)
# Dark Souls Character Builder
Welcome to my MERN stack Dark Souls Character Builder web application! **PLEASE NOTE: This is an ongoing project and is constantly changing at the moment.**

Try the most recent build of this web application here: https://brandonbjs.github.io/Dark-Souls-Character-Builder-gh-pages/

## Developer Information:
* Brandon James Shaffer | B.S. in Computer Science from Northern Arizona University
  * Email: bjs397@nau.edu
  * GitHub: https://github.com/brandonbjs
  * LinkedIn: https://www.linkedin.com/in/brandonbjs/

## Summary of Project

### Project Idea:
The objective of this project is to create an interactive character builder for the popular FromSoftware videogame title, Dark Souls. The user will be able to theorycraft different character builds by placing stat allocations, selecting weapons, selecting armor, selecting spells and, ultimately, view how their builds affect their character's stats at any particular soul level.

### Purpose:
The purpose of this project is to practice, improve, and showcase my MERN stack development capabilities. The purpose of this web application is to provide players with a way to theorycraft their different character builds without having to invest a significant amount of time in game. Before the player gets invested in a character or build, they can use this application to compare weapons, compare stat allocations, and come up with the best possible build for their needs and playstyle. Then they can go in game and spend time accrueing the right items and souls to reach their desired build.

### Planning: 
* **Front-End Development:** The front-end user interface will be designed using React and styled using CSS. I will uphold ES6 best practices to provide the user with an intuitive and enjoyable character building experience.
*  **Back-End Development:** The back-end will consist of a MongoDB that will be integrated using Node.js and Express.js. I will be creating a custom Node.js API, fit with suitable endpoints that will make GET, POST, PUT, and DELETE requests to and from my MongoDB.

### Functionality
The character builder will enable Dark Souls players to theorycraft any build they can imagine. The user will be able to: 
* Choose a starting class
* Determine an adequate soul level
* Allocate appropriate number of stat points based on soul level
* Choose 4 weapons (left hand/right hand, 2 sets)
* Choose 4 armor pieces (head, chest, hands, legs)
* Choose 2 rings
* Choose spells (number varies based on Attunement stat)
* Choose arrow/bolt type
* Choose 5 held items
* View stat changes as they mix and match weapons and armors at varying upgrade levels

#### React Components
* App.js
* CharacterBuilder.js

#### Database Collections and Models
* users: 
* weapons:
* armor:
* characterBuilds:

Weapon JSON dataset acquired from: https://gist.github.com/BonsaiDen/4096890

Armor dataset acquired from: http://www.raymondhill.net/darksouls/darksouls-armor-calc.php

Many thanks to BonsaiDen (https://gist.github.com/BonsaiDen) and gorhill (https://github.com/gorhill) for creating and making these data sets public!

#### Functions to be Used
Project in early stages of development! Will update this section once the project is further along.

#### Endpoints to be Used
Project in early stages of development! Will update this section once the project is further along.

#### API Request-Response Formats
Project in early stages of development! Will update this section once the project is further along.

#### Design Ideas
* Login/registration to allow the saving and sharing of builds (with custom URL for each build?)
* Character Builder window with typical Dark Souls theme
