import { NotTested } from './status';
import { CASE_ROW } from './rowTypes';

export const getNewCaseRow = id => ({
  type: CASE_ROW,
  id,
  case: "",
  expectedResult: "",
  chromeV46Tested: false,
  iPhoneTested: false,
  zebraTested: false,
  iPadTested: false,
  desktopTested: false,
  status: NotTested,
  bugs: [],
  statusLastUpdatedOn: null,
});