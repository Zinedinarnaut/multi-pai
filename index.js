import express from 'express';
import cors from 'cors';

// Hanime Routes
import watchRoute from './src/routes/hanime/watchRoute.js';
import trendingRoute from './src/routes/hanime/trendingRoute.js';
import browseRoute from './src/routes/hanime/browseRoute.js';
import tagsRoute from './src/routes/hanime/tagsRoute.js';
import browseVideosRoute from './src/routes/hanime/browseVideosRoute.js';

// Vidsrc Routes
import tmdbRoutes from "./src/routes/vidsrc/tmdbRoute.js";

// HiAnime Routes
import animeInfoRoute from './src/routes/hianime/animeInfoRoute.js';
import animeServersRoute from './src/routes/hianime/animeServersRoute.js';
import animeSourcesRoute from './src/routes/hianime/animeSourcesRoute.js';

const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200,
    port: "3005",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

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

app.get('/', (req, res) => {
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
    console.log(`Listening on port ${port}`);
    console.log(`Server is running on port http://localhost:${port}`);
});
