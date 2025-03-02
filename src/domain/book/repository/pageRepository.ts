import {BookerDataSource} from "../../../global/database/dataSource.js";
import {PageEntity} from "../entity/pageEntity.js";

export const pageRepository = BookerDataSource.getRepository(PageEntity);