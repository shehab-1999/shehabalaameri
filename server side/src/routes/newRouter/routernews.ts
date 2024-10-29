import { Router } from "express";
import { addNews, deleteAllnews, deletNewsById, getallnews, getNewsById, updatenews } from "../../controllers/newsController/newsController";
import upload from "../../middleware/multermiddleware";
import { errorHandler } from "../../error-handler";
const routernews:Router=Router();

routernews.post('/add_news',upload.single('img'),errorHandler(addNews));
routernews.get("/get_news",getallnews)
routernews.get("/get_news_byId/:id",getNewsById);

routernews.put("/update_news/:id",upload.single('img'),updatenews);
routernews.delete("/deletenews_id/:id",deletNewsById)
routernews.delete("/delete_news",deleteAllnews)
export default routernews