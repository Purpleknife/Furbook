# Furbook

Social Media app for pets where they can make friends, share posts or find true love.

This is a collaborative project for Lighthouse Labs's Finals between:
- [Hind Nayhi](https://github.com/Purpleknife)
- [Sylvie Lacoque](https://github.com/sylvielcq)
- [Colton Bitz](https://github.com/Coltonb-boop)


## Features
- A user (pet) can log in or register to access all features.
- A user can create posts (with captions or/and pictures), edit or delete them.
- A user can add or delete a comment.
- A user can edit their own profile.
- A user can find/ add new friends through the search bar.
- A user can message a friend.
- A user can remove a friend.


## Setup

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the `.env` file with your correct local information (username, password, database), plus your secret keys from Cloudinary API.
3. Install dependencies: `npm i` in both `front-end` and `back-end` folders.
4. Reset database: `npm run db:reset`
5. `cd back-end` then `npm start` to run the Server in port 8080, and `cd front-end` to run the App in port 3000.


## Dependencies
- Back-end:
  - Node
  - Express
  - body parser
  - cookie-session
  - dotenv
  - method-override
  - morgan
  - pg

- Front-end:
  - React
  - axios
  - Bootstrap
  - classnames
  - SASS
  - CSS
  - React Router
  - Cloudinary API
  - Chat Engine API


## Final Product
<div align="center">

![furbook-homepage-and-general-feed](https://user-images.githubusercontent.com/107894342/195663616-5e2e9a56-236c-4247-a2e2-b5db983fea68.gif)
![furbook-create-post](https://user-images.githubusercontent.com/107894342/195663757-f91d2057-ec93-41c8-9bd2-08cb6cf7e5b9.gif)
![furbook-search-bar](https://user-images.githubusercontent.com/107894342/195663790-d6cc207c-083a-4267-a76f-cefb55d265bb.gif)
![furbook-my-friends](https://user-images.githubusercontent.com/107894342/195663841-5a3e3d00-e34a-4bfb-9b53-620b35ddb71c.gif)
![furbook-my-profile](https://user-images.githubusercontent.com/107894342/195663853-2597ff4b-4b3f-4c13-9617-6d49e39cd77c.gif)

</div>
