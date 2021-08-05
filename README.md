# What is acceptable
![](https://github.com/itsikshteinberger/What-is-acceptable/blob/master/Media/Drawing-6.sketchpad.png)
<br/>
<br/>
Is it acceptable to bring the dog to work? And what about going to the movies alone?
<br/>
Share your dilemmas about public norms and find out if they are indeed acceptable or not.

[User manual](https://github.com/itsikshteinberger/What-is-acceptable/blob/master/README.md "User manual")
## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")

## User manual
Using the site is very simple, once you register (or log in) you can add a dilemma and watch and rate the dilemmas of others (a user who does not register will only be able to passively watch).
<br/>
You can also search for specific dilemmas or specific users.
<br/>

![](https://github.com/itsikshteinberger/What-is-acceptable/blob/master/Media/screenshot.png)
>Screenshot from the home page.

## Prerequisites:
- Some functional IDE for development in js.
- Npm.
- Node.js.
- Sql server (And the management studio in addition).

## Installation
For downloading the code:
```sh
git clone https://github.com/itsikshteinberger/What-is-acceptable
```
### DataBase
Open the sql server management studio and write:
```sql
CREATE DATABASE Acceptable;
```
Now, in the database you created, write:
```sql
CREATE TABLE users (
  Users nvarchar(255) not null,
	Password nvarchar(255) not null,
	PRIMARY KEY (Users)
)

CREATE TABLE scales(
 Id int not null,
 username nvarchar(255) not null,
 question nvarchar(255) not null
)

CREATE TABLE votes(
 [like] nvarchar(50)not null,
 username nvarchar(255) not null,
 scaleId int not null
)

```
<br/>
<img src="https://github.com/itsikshteinberger/What-is-acceptable/blob/master/Media/DB.png" width="500" height="350" />

> Database diagram

### Server side

First of all, do not forget to enter the password in [server.js](https://github.com/itsikshteinberger/What-is-acceptable/blob/master/Server/server.js) of your sql server user:

```js
var config = {
  user: 'sa',
  password: 'You should enter your password here', 
  server: 'localhost', 
  database: 'Acceptable',
  trustServerCertificate: true
};
```
We will now proceed with command
```sh
cd Server
npm install express nodemon cors body-parser mssql --save
nodemon server.js
```
Bellisimo! We now have a server.
### Client side
Open another command window in the What-is-acceptable folder and write the following commands:
```sh
cd what-is-acceptable
npm install react-scripts
npm start
```
After the last command the site will open in the browser.

## Example: Website usage video 
<img src="https://github.com/itsikshteinberger/What-is-acceptable/blob/master/Media/github.gif" alt="🤯">
