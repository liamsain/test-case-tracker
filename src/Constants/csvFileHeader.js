export const csvFileHeader = 'id,Case,Expected result,Actual result,iPhone passed,Zebra passed,iPad passed,desktop passed,Status\r\n';
export const csvContentHeaderIsCorrect = content =>{
  var lines = content.split("\n");
  return csvFileHeader.trim().toLowerCase() === lines[0].trim().toLowerCase();
}