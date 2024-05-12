import express from 'express';
import cors from 'cors';

const corsOptions = {
    origin: '*',
    credentails: true,
    optionSuccessStatus: 200,
    port: "3005",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());


// Hanime Routes
import watchRoute from './src/routes/hanime/watchRoute.js';
import trendingRoute from './src/routes/hanime/trendingRoute.js';
import browseRoute from './src/routes/hanime/browseRoute.js';
import tagsRoute from './src/routes/hanime/tagsRoute.js';
import browseVideosRoute from './src/routes/hanime/browseVideosRoute.js';

// Gogoanime Routes
import { handleSearch } from './src/routes/gogoanime/searchRoute.js';
import { handleRecentlyAdded } from './src/routes/gogoanime/getRecentlyAdded.js';
import { handleOngoingSeries } from './src/routes/gogoanime/getOngoingSeries.js';
import { handleGenrePage } from './src/routes/gogoanime/genrePage.js';
import { handleAnimeAZPage } from './src/routes/gogoanime/animeAZPage.js';
import { handleAnimeListPage } from './src/routes/gogoanime/animeListPage.js';
import { handleAnimeList } from './src/routes/gogoanime/animeList.js';
import { handleAnimeListAZ } from './src/routes/gogoanime/animeListAZ.js';
import { handlePopularPage } from './src/routes/gogoanime/popularPage.js';
import { handleNewSeasonPage } from './src/routes/gogoanime/newSeasonPage.js';
import { handleCompletedPage } from './src/routes/gogoanime/completedPage.js';
import { handleOngoingPage } from './src/routes/gogoanime/ongoingPage.js';
import { handleMoviePage } from './src/routes/gogoanime/moviePage.js';
import { handleSubCategoryPage } from './src/routes/gogoanime/subCategoryPage.js';
import { handleRecentReleasePage } from './src/routes/gogoanime/recentReleasePage.js';
import { handleRecentRelease } from './src/routes/gogoanime/recentRelease.js';
import { handleNewSeason } from './src/routes/gogoanime/newSeason.js';
import { handleOngoingAnime } from './src/routes/gogoanime/ongoingAnime.js';
import { handleCompletedAnime } from './src/routes/gogoanime/completedAnime.js';
import { handlePopularAnime } from './src/routes/gogoanime/popularAnime.js';
import { handleAnimeMovies } from './src/routes/gogoanime/animeMovies.js';
import { handleTopAiringAnime } from './src/routes/gogoanime/topAiringAnime.js';
import { handleSeason } from './src/routes/gogoanime/season.js';
import { handleGenre } from './src/routes/gogoanime/genre.js';
import { handleGetAnime } from './src/routes/gogoanime/getAnime.js';
import { handleFembed } from './src/routes/gogoanime/fembed.js';
import { handleGetEpisode } from './src/routes/gogoanime/getEpisode.js';
import { handleThread } from './src/routes/gogoanime/thread.js';
import { handleDownloadLinks } from './src/routes/gogoanime/downloadLinks.js';
import { handleDownload } from './src/routes/gogoanime/download.js';

// Vidsrc Routes
import tmdbRoutes from "./src/routes/vidsrc/tmdbRoute.js";

// HiAnime Routes

import animeInfoRoute from './src/routes/hianime/animeInfo.js';
import animeServersRoute from './src/routes/hianime/animeServers.js';
import animeSourcesRoute from './src/routes/hianime/animeSources.js';

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// HiAnime Routes
app.use('/hianime/info', animeInfoRoute);
app.use('/hianime/servers', animeServersRoute);
app.use('/hianime/sources', animeSourcesRoute);

// Hanime Routes
app.use('/hanime/video', watchRoute);
app.use('/hanime/trending', trendingRoute);
app.use('/hanime/browse', browseRoute);
app.use('/hanime/tags', tagsRoute);
app.use('/hanime/browse', browseVideosRoute);

// Vidsrc Routes
app.use('/vidplay/tmdb', tmdbRoutes);

// Gogoanime Routes
app.get('/gogoanime/search', handleSearch);
app.get('/gogoanime/getRecentlyAdded', handleRecentlyAdded);
app.get('/gogoanime/getOngoingSeries', handleOngoingSeries);
app.get('/gogoanime/genrePage', handleGenrePage);
app.get('/gogoanime/anime-AZ-page', handleAnimeAZPage);
app.get('/gogoanime/anime-list-page', handleAnimeListPage);
app.get('/gogoanime/animeList', handleAnimeList);
app.get('/gogoanime/animeListAZ', handleAnimeListAZ);
app.get('/gogoanime/popularPage', handlePopularPage);
app.get('/gogoanime/newSeasonPage', handleNewSeasonPage);
app.get('/gogoanime/completedPage', handleCompletedPage);
app.get('/gogoanime/ongoingPage', handleOngoingPage);
app.get('/gogoanime/moviePage', handleMoviePage);
app.get('/gogoanime/subCategoryPage', handleSubCategoryPage);
app.get('/gogoanime/recent-release-page', handleRecentReleasePage);
app.get('/gogoanime/recent-release', handleRecentRelease);
app.get('/gogoanime/new-season', handleNewSeason);
app.get('/gogoanime/ongoing-anime', handleOngoingAnime);
app.get('/gogoanime/completed-anime', handleCompletedAnime);
app.get('/gogoanime/popular', handlePopularAnime);
app.get('/gogoanime/anime-movies', handleAnimeMovies);
app.get('/gogoanime/top-airing', handleTopAiringAnime);
app.get('/gogoanime/season/:season', handleSeason);
app.get('/gogoanime/genre/:genre', handleGenre);
app.get('/gogoanime/get-anime/:id', handleGetAnime);
app.get('/gogoanime/fembed', handleFembed);
app.get('/gogoanime/get-episode/:id', handleGetEpisode);
app.get('/gogoanime/thread/:episodeId', handleThread);
app.get('/gogoanime/download-links', handleDownloadLinks);
app.get('/gogoanime/download', handleDownload);

app.use('/', (req, res) => {
    res.send('Welcome to Multi-Pai');
});

app.use((req, res) => {
    res.status(404).json({
        status: 404,
        error: 'Not Found',
    });
});

const server = app.listen(process.env.PORT || 3005, () => {
    const port = server.address().port;
    console.log(`Server is running on port ${port}`);
});
