import { BUG_ROW } from './rowTypes';

export const getNewBugRow = (id, caseId) => ({
  caseId,
  id,
  type: BUG_ROW,
  description: "",
  fixed: false
});