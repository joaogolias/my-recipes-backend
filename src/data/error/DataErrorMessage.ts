export enum DataErrorMessage {
  MISSING_QUERY = "You didn't specified the database query. Remember calling the query before the execute function",
  DUPLICATE_ENTITY = "There already is an entity with these values",
  SYNTAX = "Query syntax is wrong",
  TABLE_DOES_NOT_EXIST = "Table of this query does not exist",
}
