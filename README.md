![not a js dev](https://user-images.githubusercontent.com/80411896/147735041-7d64e030-b28f-4d9e-bec9-e362e67d301b.png)
## What you need:
- Basic discord.js knowledge
- Know how simple write/read works in mongoose
## Packages:
```
npm install discord.js@dev
npm install mongoose
```
## How it works?
### userRecord.js
Simply record join/leave event & add/remove users from database
### levelHandler.js
Most important file for level handling, adds exp to users and check for levelups
### level-system.js
2 commands for manual add/remove user form databse
## How to edit it?
### Exp to next level
In levelHandler.js u can change this to preferred value
```
const nextLevelXp = userLevel.level * 10;
```
Number 10 means that for level 2 you need 20exp aka 20 messages written,
exp resets once user reach new level so be carefull with that
### New level message channel
Just change channel id in this line:
```
const levelsChannel = message.guild.channels.cache.get('925762713689399306');
```
### How to make it multi-guild
You need to add **guildId** in levelModel.js
```
module.exports = mongoose.model('levelModel', new mongoose.Schema({
    guildId: String,
    userId: String,
    level: Number,
    exp: Number,
}));
```
Next add this parameter to database entry search:
```
const userLevel = await levelSystem.findOne({ userId, guildId });
```
Make sure you add variable for guild id in code and create command 
for New Level Message channel

Thanks for reading it, i know... my english suck but its not my native language
