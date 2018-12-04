import {NotTested} from './status';

export const getNewCaseRow = id => ({
  id,
  case: "",
  expectedResult: "",
  actualResult: "",
  iPhoneTested: false,
  zebraTested: false,
  iPadTested: false,
  desktopTested: false,
  status: NotTested
});