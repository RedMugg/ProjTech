# PhotoMatch
Do you have an event planned and would you like to have a photographer to make some beautiful pictures?
Then I have the perfect app for you. With PhotoMatch you get to like randomly selected pictures of photographers wich then give you the details of a photographer that has the same vibes as the liked photo's.


## My feature
I only had the oppurtunity to make one specific feature in this app. the feature I chose was liking the photo's.
I implemented the Instagram Basic Display API to get photo's from an instagram account and put on the site for the user to "like", wich then was updated to the connected database.


## How to install

### Serverside
1. Copy the clone repository link
```
https://github.com/RedMugg/ProjTech.git
```
2. In your desired directory, type this:
```console
git clone https://github.com/RedMugg/ProjTech.git
```
3. Install packages
```console
npm install
```
4. Run server
```console
nodemon index.js
```
### Database side
For the database you only need to create a database named 'Profile' and within that database a collection 'users'.
The only thing you need to do is then change the 'DbUsername' and 'DbPassword' into the right credentials to connect to your database.
