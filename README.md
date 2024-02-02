![Alt Text](https://github.com/brandonbjs/dark-souls-character-builder/blob/main/public/images/dark-souls-title.jpg)
# Dark Souls Character Builder
Welcome to my MERN stack Dark Souls Character Builder! **PLEASE NOTE: This project is now a Minimum Viable Product.**

Try it out! Build your own Dark Souls character here: https://brandonbjs.github.io/Dark-Souls-Character-Builder-gh-pages/

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
* Dynamically allocate appropriate number of stat points based on soul level
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
* NavigationBar.js (work in progress, not being used in MVP)

Weapon JSON dataset acquired from: https://gist.github.com/BonsaiDen/4096890

Armor dataset acquired from: http://www.raymondhill.net/darksouls/darksouls-armor-calc.php

Many thanks to BonsaiDen (https://gist.github.com/BonsaiDen) and gorhill (https://github.com/gorhill) for creating and making these data sets public!

#### Functions to be Used
* componentDidMount() - This lifecycle method is being used to initially fetch and obtain all the relevant information I need from my MongoDB database. It is the only place I make any fetch calls to my database in the entire project. It also calculates the default spell slots, HP, stamina, current equipload, total equipload, and encumbrance.
* compoentDidUpdate() - This lifecycle method is being used when state is being altered. It is somewhat lengthy because it has to check for when an attribute is incremented AND decremented. Different methods will be called accordingly. It also calls methods each time any of the armor, weapons, items, or spells change.
* calculateSpellSlots() - Calculate the build's total spell slots based on the current Attunement attribute and any special rings that might affect this.
* calculateHP() - Calculate the build's total HP value, based on the current Vitality attribute and any special rings or armor that might affect this.
* calculateStamina() - Calculate the build's total Stamina value, based on the current Endurance attribute and any special rings or masks that might affect this.
* calculateEquipLoad() - Calculate the equip load of the build from the weight of items. All Armor and Weapons have a weight stats.
* calculateEncumbrance() - Calculate the encumbrance experienced by the player. The user is considered "fast rolling" when the encumbrance percent of their equipLoad/totalEquipLoad is less than 25%. From 25-50% the user is "medium rolling". From 50%+ the user is "fat rolling".
* calculateStaminaRecovery() - Calculate the stamina recovery of the build based on their current encumbrance percent and any relevant gear that might affect this.
* calculatePoise() - Calculate the poise for the build based on the total of all the armor poise stats and any rings that might affect this.
* calculateItemDiscovery() - Calculate the total item discovery based on humanity and a special ring or helmet.
* calculateDefenseStats() - Calculate the defense stats from any armor being worn and any rings that might boost a particular defense stat.
* levelUpDef() - Method is used to handle specific defense stat INCREASES based on the attribute passed. Endurance affects bleed, Resistance affects all the defense stats much more than if you were just to put a point in Vitality so these need special algorithms.
* levelDownDef() - Method is used to handle specific defense stat DECREASES based on the attribute passed. Endurance affects bleed, Resistance affects all the defense stats much more than if you were just to put a point in Vitality so these need special algorithms.
* handlePreSoftCapIncrease() - Called by levelUpDef(). This method is used to INCREMENT pre soft cap defense stats. Before the soft cap, the user gets more defensive stats from leveling their attributes. After the Soul Level 225 soft cap, there are diminishing returns.
* handlePreSoftCapDecrease() - Called by levelDownDef(). This method is used to DECREMENT pre soft cap defense stats. Before the soft cap, the user gets more defensive stats from leveling their attributes. After the Soul Level 225 soft cap, there are diminishing returns.
* handlePostSoftCapIncrease() - Called by levelUpDef(). This method is used to INCREMENT post soft cap defense stats. After the Soul Level 225 soft cap, there are diminishing returns.
* handlePostSoftCapDecrease() - Called by levelDownDef(). This method is used to DECREMENT post soft cap defense stats. After the Soul Level 225 soft cap, there are diminishing returns.
* increaseBleedStat() - Called by levelUpDef(). This method is used to INCREASE the bleed defensive stat based on the build's endurance.
* decreaseBleedStat() - Called by levelDownDef(). This method is used to DECREASE the bleed defensive stat based on the build's endurance.
* increaseResistanceStats() - Called by levelUpDef(). This method is used to INCREASE all the defensive stats accordingly when the Resistance attribute is increased. Resistance increases these defensive stats much more quickly than if you were to just put a point in Vitality or Strength. AFter level 50 you get diminishing returns.
* decreaseResistanceStats() - Called by levelDownDef(). This method is used to DECREASE all the defensive stats accordingly when the Resistance attribute is decreased.
* humanityUp() - This method is used to INCREASE physical, magic, fire, lightning, and curse defensive stats. In Dark Souls, holding humanity boosts resistances. You get more resistances at lower levels. At humanity level 30 you no longer receive curse increases.
* humanityDown() - This method is used to DECREASE physical, magic, fire, lightning, and curse defensive stats.
* handleClassChange() - This is the handler method for when the user interacts with the class dropdown menu.
* handleCovenantChange() - This is the handler method for when the user interacts with the covenant dropdown menu.
* handleSpellChange() - This is the handler method for when the user interacts with the spells dropdown menu.
* handleAttributeDiv1Click(), handleAttributeDiv2Click(), handleAttributeDiv3Click(), handleAttributeDiv4Click() - These are the handler methods for when the user clicks the Stats div under each equipped weapon. I made it so that each weapon's stat window is independent of one another and allows the user to compare different weapon stats to one another.
* renderAttributes() - This is the method that renders each weapons stats in the divs specificed above.
* handleHeadChange() - Handler method for when the user changes their selected helmet in the select dropdown menu (populated by one of the five MongoDB collections).
* getHelmetByName() - Getter method to grab the name of the helmet.
* handleHelmetSelection() - Change the buildHead state which is the entire helmet object that was chosen by the user (not just the name).
* handleChestChange() - Handler method for when the user changes their selected chest in the select dropdown menu (populated by one of the five MongoDB collections).
* getChestByName() - Getter method to grab the name of the chest.
* handleChestSelection() - Change the buildChest state which is the entire chest object that was chosen by the user (not just the name).
* handleHandsChange() - Handler method for when the user changes their selected hands in the select dropdown menu (populated by one of the five MongoDB collections).
* getHandsByName() - Getter method to grab the name of the hands.
* handleHandSelection() - Change the buildHands state which is the entire hands object that was chosen by the user (not just the name).
* handleLegsChange() - Handler method for when the user changes their selected legs in the select dropdown menu (populated by one of the five MongoDB collections).
* getLegsByName() - Getter method to grab the name of the legs.
* handleLegsSelection() - Change the buildLegs state which is the entire legs object that was chosen by the user (not just the name).
* handleRing1Change(), handleRing2Change() - Handler methods for when the user changes their selected Rings in the select dropdown menu (populated by one of the five MongoDB collections).
* getRingByName() - Getter method to grab the name of a ring.
* handleRingSelection1(), handleRingSelection2() - Change the buildRing1 or buildRing2 state which is the entire ring object that was chosen by the user (not just the name).
* handleLeftHandOneChange(), handleLeftHandTwoChange(), handleRightHandOneChange(), handleRightHandTwoChange() - Handler methods for when the user changes their selected Weapons in the select dropdown menu (populated by one of the five MongoDB collections).
* handleWeaponSelection1(), handleWeaponSelection2(), handleWeaponSelection3(), handleWeaponSelection4() - Change the buildLeftHand1, buildLeftHand2, buildRightHand1, buildRightHand2 states which are the entire weapon objects that were chosen by the user (not just the name).
* handleItemChange1(), handleItemChange2(), handleItemChange3(), handleItemChange4(), handleItemChange5() - Handler methods for when the user changes their selected items in the select dropdown menu.
* handleArrowChange1(), handleArrowChange2() - Handler methods for when the user changes their selected arrows in the select dropdown menu.
* handleBoltChange1(), handleBoltChange2() - Handler methods for when the user changes their selected bolts in the select dropdown menu.
* handleNewBuildClick() - Handler method that opens a new webpage for the user so they can create a fresh build without refreshing the current one they are working on.
* handleResetClick() - Handler method that resets the entire Character Builder for the user.
* handleIncrement() - Generic method to increment an attribute to a MAX of 99.
* handleDecrement() - Generic method to decrement an attribute to a MIN of 0.
* setLowerSoulsLevel() - This sets how many souls are needed to reach the next level (from levels 1-12, the algorithm is not accurate below level 12).
* calculateSoulsToNextLevel() - This calculates how many souls are needed to reach the next level based off an algorithm utilized by the game.
* calculateTotalSouls() - This calculates how many TOTAL souls are needed to reach the current soul level, from the initial soul level that is set when the user choses a class.
* getSoulsForLevel() - This calculates how many souls are needed for THE CURRENT LEVEL, not the next one.

#### Endpoints to be Used
* fetchChestsEndpoint() - Used to fetch all chests from the armor collection in my MongoDB database.
* fetchHelmetsEndpoint() - Used to fetch all helmets from the armor collection in my MongoDB database.
* fetchHandsEndpoint() - Used to fetch all hands from the armor collection in my MongoDB database.
* fetchLegsEndpoint() - Used to fetch all legs from the armor collection in my MongoDB database.
* fetchWeaponsEndpoint() - Used to fetch all weapons from the weapons collection in my MongoDB database.
* fetchRingsEndpoint() - Used to fetch all rings from the rings collection in my MongoDB database.
* fetchSpellsEndpoint() - Used to fetch all spells from the spells collection in my MongoDB database.
* fetchItemsEndpoint() - Used to fetch all items from the items collection in my MongoDB database.

#### Models Used
* ArmorModel.js - The model that outlines what attributes each Armor document has within the armor collection.
* ItemModel.js - The model that outlines what attributes each Item document has within the items collection.
* RingModel.js - The model that outlines what attributes each Ring document has within the rings collection.
* SpellModel.js - The model that outlines what attributes each Spell document has within the spells collection.
* WeaponModel.js - The model that outlines what attributes each Weapon document has within the weapons collection.
* CharacterBuildModel.js - Although I have yet to implement login and build sharing capabilites, I have preemptively created the CharacterBuildModel that outlines what a saved character build document would contain.
* UserModel.js - Although I have yet to implement login and build sharing capabilites, I have preemptively created the UserModel that outlines what a saved user document would contain.

#### API Request-Response Formats
* None of the Armor, Rings, Spells, or Weapons can be altered by the user right now so we are only making GET requests.
* In the future, if I chose to add login/build-sharing capabilities, then I will need to allow POST, PUT, and DELETE requests and create their respective endpoints.

#### FUTURE Design Ideas
* Login/registration to allow the saving and sharing of builds (with custom URL for each build?)
