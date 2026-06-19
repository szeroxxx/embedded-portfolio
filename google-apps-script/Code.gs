/**
 * Google Apps Script Web App — reviews backend for the portfolio site.
 *
 * Stores reviews in the bound Google Sheet and exposes a small JSON API that
 * the Vercel app (lib/db.ts) calls. Authentication is a shared token.
 *
 * SHEET LAYOUT (first tab, row 1 = headers, exactly these columns A–G):
 *   A: id        B: project_name   C: client_name   D: rating
 *   E: review_text   F: project_id   G: visible   H: created_at
 *
 * SETUP
 *   1. In the Sheet: Extensions → Apps Script. Paste this file as Code.gs.
 *   2. Set a strong TOKEN below (must match SHEET_WEBAPP_TOKEN in Vercel).
 *   3. Run `setup` once (Run menu) to create headers — authorize when asked.
 *   4. Deploy → New deployment → type "Web app":
 *        Execute as: Me
 *        Who has access: Anyone
 *      Copy the /exec URL → that's SHEET_WEBAPP_URL.
 */

// ⚠️ Change this and keep it in sync with SHEET_WEBAPP_TOKEN in Vercel.
var TOKEN = 'CHANGE_ME_to_a_long_random_string';

var HEADERS = [
  'id', 'project_name', 'client_name', 'rating',
  'review_text', 'project_id', 'visible', 'created_at'
];

function sheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

/** Run once to write the header row. */
function setup() {
  var sh = sheet_();
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function ok_(data) { return json_({ success: true, data: data }); }
function err_(message) { return json_({ success: false, error: message }); }

/** Read all rows as objects (skips the header row). */
function readAll_() {
  var sh = sheet_();
  var last = sh.getLastRow();
  if (last < 2) return [];
  var values = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  var out = [];
  for (var i = 0; i < values.length; i++) {
    var r = values[i];
    if (r[0] === '' && r[2] === '') continue; // skip blank rows
    out.push({
      id: r[0],
      project_name: r[1],
      client_name: r[2],
      rating: r[3],
      review_text: r[4],
      project_id: r[5] === '' ? null : r[5],
      visible: r[6] === true || r[6] === 'TRUE' || r[6] === 'true' || r[6] === 1,
      created_at: r[7] instanceof Date ? r[7].toISOString() : String(r[7]),
      _row: i + 2 // 1-based sheet row (for updates/deletes)
    });
  }
  return out;
}

function strip_(o) {
  return {
    id: o.id, project_name: o.project_name, client_name: o.client_name,
    rating: o.rating, review_text: o.review_text, project_id: o.project_id,
    visible: o.visible, created_at: o.created_at
  };
}

function nextId_(rows) {
  var max = 0;
  for (var i = 0; i < rows.length; i++) {
    var n = Number(rows[i].id);
    if (!isNaN(n) && n > max) max = n;
  }
  return max + 1;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(20000);
  try {
    var body = {};
    try { body = JSON.parse(e.postData.contents); } catch (_) {}

    if (body.token !== TOKEN) return err_('Unauthorized');

    var action = body.action;

    // ----- list -----
    if (action === 'list') {
      var rows = readAll_();
      if (body.onlyVisible) rows = rows.filter(function (r) { return r.visible; });
      rows.sort(function (a, b) {
        return String(b.created_at).localeCompare(String(a.created_at));
      });
      return ok_(rows.map(strip_));
    }

    // ----- create -----
    if (action === 'create') {
      if (!body.project_name || !body.client_name || !body.rating || !body.review_text) {
        return err_('Missing required fields');
      }
      var rows = readAll_();
      var id = nextId_(rows);
      var createdAt = new Date().toISOString();
      var rec = {
        id: id,
        project_name: String(body.project_name),
        client_name: String(body.client_name),
        rating: Number(body.rating),
        review_text: String(body.review_text),
        project_id: (body.project_id === null || body.project_id === undefined || body.project_id === '') ? null : Number(body.project_id),
        visible: true,
        created_at: createdAt
      };
      sheet_().appendRow([
        rec.id, rec.project_name, rec.client_name, rec.rating,
        rec.review_text, rec.project_id === null ? '' : rec.project_id,
        true, rec.created_at
      ]);
      return ok_(rec);
    }

    // ----- setVisibility -----
    if (action === 'setVisibility') {
      var rows = readAll_();
      var target = null;
      for (var i = 0; i < rows.length; i++) {
        if (Number(rows[i].id) === Number(body.id)) { target = rows[i]; break; }
      }
      if (!target) return ok_(null);
      var vis = body.visible === true || body.visible === 'true';
      sheet_().getRange(target._row, 7).setValue(vis); // column G
      target.visible = vis;
      return ok_(strip_(target));
    }

    // ----- delete -----
    if (action === 'delete') {
      var rows = readAll_();
      var target = null;
      for (var i = 0; i < rows.length; i++) {
        if (Number(rows[i].id) === Number(body.id)) { target = rows[i]; break; }
      }
      if (!target) return ok_(null);
      sheet_().deleteRow(target._row);
      return ok_(strip_(target));
    }

    return err_('Unknown action: ' + action);
  } catch (ex) {
    return err_(String(ex && ex.message ? ex.message : ex));
  } finally {
    lock.releaseLock();
  }
}

/** Optional: a GET ping so you can sanity-check the deployment in a browser. */
function doGet() {
  return ok_('reviews web app is running');
}
