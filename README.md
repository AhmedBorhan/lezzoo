# Lezzoo Test Project

This project is powered by NodeJs + Express for the Backend, 
React + Reducer for the Frontend

## Used packages
- Sequelize ORM for database transaction
- Passport & JWT for Authontications and securing the APIs
- bcrypt for hashing
- multer for uploading images
- material ui for UI
- react-infinite-scroll-component for infinite scrolling
- axios for requests

## Installation

Before installation, you have to setup the database 
you can find the dump file wiht the name "lezzoo_db.sql" which is a database self containing file 
it contains both structure and data, by importing it you will have the complete database.

Then you will have to create ".env" file, all the default values are available at ".env.example"

Installing the dependencies

```sh
npm i
cd client
npm i
npm build
```
Running in development
```sh
npm run server
```

Running in production...
```sh
npm run server
cd client
npm run start
```

## Credentials

admin name: lezzoo
admin password: lezzoo

## Important Notes
Looks like when I generated the item datas for the database I did something wrong that I did not realize till now 
most of the items do note have correct set of Store & Category IDs, so most of them will not show any item 
but the first 2 or 3 stores should be fine

This project is actually hold a lot more to it than I did, because of my limited time I could not add 
all that I want into it, There are alot of thing that could be added to improve both tha quality of the code and the 
overall performance of the project

- adding more comments  
- server-side caching for better perfomance  
- using image compressor for resizing, something like Sharpjs
- using more reusable components 
- better UI/UX