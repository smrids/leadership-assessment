/**
 * GDPLI Leadership Self-Assessments — Google Sheets logger
 * -------------------------------------------------------------------
 * One doPost handles all four new assessments. Each assessment writes to
 * its own tab (created automatically with headers on first submission).
 *
 * SETUP
 * 1. Open the Google Sheet you want responses saved to (the same one your
 *    existing Leadership Style assessment uses is fine).
 * 2. Extensions ▸ Apps Script.
 * 3. Add a NEW script file, paste all of this in, and Save.
 *    (Keep your existing Leadership Style code as-is in its own file.)
 * 4. Deploy ▸ New deployment ▸ type "Web app".
 *       Execute as:  Me
 *       Who has access:  Anyone
 *    Click Deploy, authorise, and copy the "/exec" Web app URL.
 * 5. Paste that URL into the ENDPOINT constant at the top of each of the
 *    four HTML pages (leadership-animal.html, tki.html,
 *    emotional-intelligence.html, power-profile.html).
 *
 * Re-deploy (Deploy ▸ Manage deployments ▸ edit ▸ new version) whenever
 * you change this script.
 */

function doPost(e) {
  try {
    var params = (e && e.parameter) ? e.parameter : {};
    var assessment = params.assessment || 'Unknown Assessment';

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(assessment);

    // Fixed leading columns, then every other field as its own column.
    var leading = ['timestamp', 'name', 'email'];
    var skip = { assessment: true, timestamp: true, name: true, email: true };
    var extraKeys = Object.keys(params).filter(function (k) { return !skip[k]; });

    if (!sheet) {
      sheet = ss.insertSheet(assessment);
      sheet.appendRow(['Timestamp', 'Name', 'Email'].concat(extraKeys));
      sheet.getRange(1, 1, 1, 3 + extraKeys.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Align to the header row so columns stay consistent across versions.
    var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = header.map(function (h) {
      var key = String(h).toLowerCase();
      if (key === 'timestamp') return params.timestamp || new Date().toISOString();
      if (key === 'name') return params.name || '';
      if (key === 'email') return params.email || '';
      // match header text to a param key (case-insensitive)
      var match = Object.keys(params).filter(function (p) { return p.toLowerCase() === key; })[0];
      return match ? params[match] : '';
    });

    // Add any brand-new fields as extra columns at the end.
    extraKeys.forEach(function (k) {
      var exists = header.some(function (h) { return String(h).toLowerCase() === k.toLowerCase(); });
      if (!exists) {
        sheet.getRange(1, sheet.getLastColumn() + 1).setValue(k).setFontWeight('bold');
        row.push(params[k]);
      }
    });

    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('GDPLI assessment logger is running.');
}
