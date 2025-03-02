import {BookerDataSource} from "../../../global/database/dataSource.js";
import {BookEntity} from "../entity/bookEntity.js";

export const bookRepository = BookerDataSource.getRepository(BookEntity);