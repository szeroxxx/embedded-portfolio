/**
 * Centralized reviews data layer — backed by Google Sheets.
 *
 * The app is deployed on Vercel. Instead of a database, reviews live in a
 * Google Sheet that is exposed through a Google Apps Script Web App (see
 * google-apps-script/Code.gs). The Next.js API routes call that Web App over
 * HTTPS and authenticate with a shared token. No Google service-account keys
 * or OAuth flow are needed inside the app.
 *
 * Required environment variables (set in .env.local and in Vercel):
 *   SHEET_WEBAPP_URL    - the deployed Apps Script Web App URL (…/exec)
 *   SHEET_WEBAPP_TOKEN  - shared secret; must match TOKEN in the Apps Script
 */

// ===== Types =====

/** A review as exposed to the app (visible mapped to a real boolean). */
export interface Review {
  id: number;
  project_name: string;
  client_name: string;
  rating: number;
  review_text: string;
  project_id: number | null;
  visible: boolean;
  created_at: string;
}

export interface NewReview {
  project_name: string;
  client_name: string;
  rating: number;
  review_text: string;
  project_id?: number | null;
}

/** Raw row shape returned by the Apps Script Web App. */
interface SheetRow {
  id: number | string;
  project_name: string;
  client_name: string;
  rating: number | string;
  review_text: string;
  project_id: number | string | null;
  visible: boolean | string | number;
  created_at: string;
}

interface WebAppResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ===== Low-level Web App caller =====

function getConfig() {
  const url = process.env.SHEET_WEBAPP_URL;
  const token = process.env.SHEET_WEBAPP_TOKEN;

  if (!url || !token) {
    throw new Error(
      'Missing Google Sheet configuration. Set SHEET_WEBAPP_URL and SHEET_WEBAPP_TOKEN.'
    );
  }

  return { url, token };
}

/**
 * Call the Apps Script Web App with an action and payload.
 * All requests are POSTs so the token is never placed in a query string/log.
 */
async function callWebApp<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const { url, token } = getConfig();

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Apps Script follows a redirect on /exec; let fetch follow it.
    redirect: 'follow',
    body: JSON.stringify({ action, token, ...payload }),
  });

  const body = (await res.json()) as WebAppResponse<T>;

  if (!res.ok || !body.success) {
    throw new Error(
      body.error || `Google Sheet request failed with status ${res.status}`
    );
  }

  return body.data as T;
}

// ===== Mapper =====

function toBool(v: boolean | string | number): boolean {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v === 1;
  return v === 'true' || v === 'TRUE' || v === '1';
}

function mapReview(row: SheetRow): Review {
  const projectId =
    row.project_id === null || row.project_id === '' || row.project_id === undefined
      ? null
      : Number(row.project_id);

  return {
    id: Number(row.id),
    project_name: String(row.project_name),
    client_name: String(row.client_name),
    rating: Number(row.rating),
    review_text: String(row.review_text),
    project_id: projectId,
    visible: toBool(row.visible),
    created_at: String(row.created_at),
  };
}

// ===== Typed query functions (same interface as before) =====

/** Public: visible reviews only, newest first. */
export async function getReviews(): Promise<Review[]> {
  const rows = await callWebApp<SheetRow[]>('list', { onlyVisible: true });
  return rows.map(mapReview);
}

/** Admin: all reviews (visible and hidden), newest first. */
export async function getAllReviews(): Promise<Review[]> {
  const rows = await callWebApp<SheetRow[]>('list', { onlyVisible: false });
  return rows.map(mapReview);
}

/** Insert a new review (visible by default, matching the old behavior). */
export async function createReview(input: NewReview): Promise<Review> {
  const row = await callWebApp<SheetRow>('create', {
    project_name: input.project_name,
    client_name: input.client_name,
    rating: input.rating,
    review_text: input.review_text,
    project_id: input.project_id ?? null,
  });
  return mapReview(row);
}

/** Admin: show/hide a review. Returns the updated row, or null if not found. */
export async function setVisibility(
  id: number,
  visible: boolean
): Promise<Review | null> {
  const row = await callWebApp<SheetRow | null>('setVisibility', { id, visible });
  return row ? mapReview(row) : null;
}

/** Admin: delete a review. Returns the deleted row, or null if not found. */
export async function deleteReview(id: number): Promise<Review | null> {
  const row = await callWebApp<SheetRow | null>('delete', { id });
  return row ? mapReview(row) : null;
}
