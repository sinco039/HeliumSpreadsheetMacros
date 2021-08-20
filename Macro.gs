//READ THE COMMENTS
/*
  EVERYONE! Make sure to add AT LEAST ONE Miner (Name & Miner Address, other info is optional)
  to the Miner Info sheet BEFORE running macros or making the triggers!
*/


/*
  ApiRefresh updates a cell with the current time that gets appended to the GET URL request.
  This is important because it allows the data to refresh with the most current rewards
  NOTE: CREATE a TRIGGER that runs this ONCE A DAY 
*/
function ApiRefresh() {
    var spreadsheet = SpreadsheetApp.getActive();
    spreadsheet.getRange('B6').activate();
    spreadsheet.setActiveSheet(spreadsheet.getSheetByName('DataMagic(DoNotEdit)'), true);
    var dt= new Date();
    var time_stamp= dt.toLocaleTimeString();
    SpreadsheetApp.getActiveSheet().getRange('B6').setValue(time_stamp);
  };


/*
  DailyRewardCopy grabs the data from MinerData(DoNotEdit)
  and posts it to the sheet MinerRewardLog
  NOTE: CREATE a TRIGGER that runs this ONCE A DAY
  NOTE: Make sure the TRIGGER runs AFTER the ApiRefresh TRIGGER
*/
function DailyRewardCopy() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('Q2').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('MinerRewardLog'), true);
  spreadsheet.getRange('2:2').activate();
  spreadsheet.getActiveSheet().insertRowsBefore(spreadsheet.getActiveRange().getRow(), 1);
  spreadsheet.getActiveRange().offset(0, 0, 1, spreadsheet.getActiveRange().getNumColumns()).activate();
  spreadsheet.getRange('A2').activate();
  spreadsheet.getRange('\'MinerData(DoNotEdit)\'!Q2').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('MinerData(DoNotEdit)'), true);
  spreadsheet.getRange('R2:R82').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('MinerRewardLog'), true);
  spreadsheet.getRange('B2').activate();
  spreadsheet.getRange('\'MinerData(DoNotEdit)\'!R2:R82').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, true);
  Format(); //this calls the format function below
};


/*
  Format adjusts the data DailyRewardCopy pasted into MinerRewardLog so other formulas
  will work as expected. You do NOT need to make a daily trigger for this because it will
  automatically run when DailyRewardCopy does.
*/
function Format() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B2:CD2').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('0.00000000');
  spreadsheet.getRange('A2').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('M/d/yyyy');
};
