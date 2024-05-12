import { scrapeSubCategoryPage } from '../../gogoanime/anime_parser.js';

export async function handleSubCategoryPage(req, res) {
    try {
        const page = req.query.page;
        const subCategory = req.query.subCategory;
        const data = await scrapeSubCategoryPage({ page: page, subCategory: subCategory });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
