# Scoober game

![scoober](public/img/scoober.gif)

## Description

When a player starts, it incepts a random (whole) number and sends it to the second player as an approach of starting the game. The receiving player can now always choose between adding one of {-1,0,1} to get to a number that is divisible by 3. Divide it by three. The resulting whole number is then sent back to the original sender. 
The same rules are applied until one player reaches the number 1.

## Setup

### Node

`npm ci` (install client dependencies)

`npm run build` (build client)

`cd src/server`

`npm ci` (install server dependencies)

`npm run dev` (start server in dev mode)

Open http://localhost:8080 in browser.

### Docker

`docker build -t any_image_name .`

`docker run -p any_port:8080 any_image_name`

Open http://localhost:any_port in browser.
