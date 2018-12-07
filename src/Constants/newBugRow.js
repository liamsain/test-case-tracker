import { BUG_ROW } from './rowTypes';
import { NotTested } from './status';

export const getNewBugRow = (id, caseId) => ({
  caseId,
  id,
  type: BUG_ROW,
  description: "",
  fixed: false,
  status: NotTested, 
  vstsId: "",
  isBlocker: false,
  lastTested: null
});