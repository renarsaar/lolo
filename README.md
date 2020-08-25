# General Info:
Project is hosted on [Heroku](https://obscure-gorge-70971.herokuapp.com/).<br />
React.js side of the applicattion is in **client** folder.<br />
Express.js cors middleware with routes is in **server.js**.

## File Structure:
```
|-- server.js
|   |-- client
|       |-- scss
|           |-- _media.scss
|           |-- main.scss
|       |-- src
|           |-- Components
|               |-- App.js
|               |-- Article.js
|               |-- ArticleModal.js
|               |-- TimeSince.js
|               |-- useFetchClutterFreeData.js
|               |-- useFetchContent.js
|           |-- index.js
```

## Usage
Install dependencies
```
npm install
```
Install Client dependencies
```
npm run install-client
```
Build assets for server/production
```
npm run build
```
Start server - [http://localhost:5000](http://localhost:5000).
```
npm start
```