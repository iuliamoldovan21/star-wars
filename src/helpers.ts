import { FIRST_CHARACTER_CURSOR, LAST_CHARACTER_CURSOR } from "./constants";

//hasPreviousPage and hasNextPage fields from api don't behave properly
//the helpers below are replacement for the pageInfo fields
export const hasPreviousPage = (startCursor: string | undefined) => {
  if (!startCursor) return false;
  return startCursor !== FIRST_CHARACTER_CURSOR;
};

export const hasNextPage = (endCursor: string | undefined) => {
  if (!endCursor) return false;
  return endCursor !== LAST_CHARACTER_CURSOR;
};
