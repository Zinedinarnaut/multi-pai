# [Multi Pai](https://multi-pai.vercel.app/)

<head>
  <link rel="stylesheet" href="./src/style.css">
</head>

<p>Welcome to Multi-Pai, Multi-Pai is a api that has 3 seperate projects into one </p>

<div class="alert alert-warning" style="padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: .25rem; color: #856404; background-color: #fff3cd;">
  Gogoanime has been removed due to bad mapping
</div>

<h1>Installation</h1>

To get started with local development, follow these steps:

1. Clone the repository:

```sh
$ git clone https://github.com/Zinedinarnaut/multi-pai.git
$ cd multi-pai
```
Install dependencies:
```sh
$ npm install # or yarn install
```
Start the server:
```sh
$ node index.js # or node .
```
Now you're ready to explore the Multi-Pai API and integrate it into your applications.


<h3>Hanime</h3>

Example Requests
Here are some example requests to give you an idea of how to interact with the API:

Get Trending:
```
GET https://multi-pai.vercel.app/hanime/trending/day/1
```
Get Browse Tags:
```
GET https://multi-pai.vercel.app/hanime/tags
```
Get Tags:
```
GET https://multi-pai.vercel.app/hanime/hentai-tags/har**/1
```
Get Video:
```
GET https://multi-pai.vercel.app/hanime/video/overflow
```

<h3>VidSrc</h3>

Example Requests
Here are some example requests to give you an idea of how to interact with the API:

- endpoint:
    - `/{db_id}`

- parameters:
    - `s` - season (series only)
    - `e` - episodes (series only)

### EXAMPLE MOVIE
```
https://multi-pai.vercel.app/vidplay/tmdb/198663
```

### EXAMPLE SHOW
```
https://multi-pai.vercel.app/vidplay/tmdb/1429?s=1&e=1
```

<div class="alert-info" style="padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: .25rem; color: #856404; background-color: #fff3cd;">
  Multi-Pai will receive daily updates and it is in early stages of development
</div>

Feel free to explore the API and customize it to fit your project's requirements. If you have any questions or need assistance, refer to the Issues section of the repository.
