import {BookerDataSource} from "../../../global/database/dataSource.js";
import {LibraryEntity} from "../entity/libraryEntity.js";

export const libraryRepository = BookerDataSource.getRepository(LibraryEntity);