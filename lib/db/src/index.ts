export * from "./schema";

  const SUPABASE_URL = process.env.SUPABASE_URL!;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
  }

  type Row = Record<string, unknown>;
  type Result<T> = { data: T | null; error: { message: string } | null; count?: number };

  class QB {
    private _table: string;
    private _select = "*";
    private _filters: string[] = [];
    private _order: string[] = [];
    private _limit?: number;
    private _offset?: number;
    private _single = false;
    private _maybeSingle = false;
    private _withCount = false;
    private _writeData?: Row | Row[];
    private _writeMode?: "insert" | "update" | "delete" | "upsert";
    private _withSelect = false;
    private _onConflict?: string;

    constructor(table: string) { this._table = table; }

    select(cols = "*", opts?: { count?: string }) {
      if (this._writeMode) this._withSelect = true;
      this._select = cols;
      if (opts?.count === "exact") this._withCount = true;
      return this;
    }

    insert(data: Row | Row[]) { this._writeMode = "insert"; this._writeData = data; return this; }
    update(data: Row) { this._writeMode = "update"; this._writeData = data; return this; }
    delete() { this._writeMode = "delete"; return this; }
    upsert(data: Row, opts?: { onConflict?: string }) {
      this._writeMode = "upsert"; this._writeData = data; this._onConflict = opts?.onConflict; return this;
    }

    eq(col: string, val: unknown) { this._filters.push(`${col}=eq.${encodeURIComponent(String(val))}`); return this; }
    ilike(col: string, val: string) { this._filters.push(`${col}=ilike.${encodeURIComponent(val)}`); return this; }
    gte(col: string, val: unknown) { this._filters.push(`${col}=gte.${encodeURIComponent(String(val))}`); return this; }
    lte(col: string, val: unknown) { this._filters.push(`${col}=lte.${encodeURIComponent(String(val))}`); return this; }
    lt(col: string, val: unknown) { this._filters.push(`${col}=lt.${encodeURIComponent(String(val))}`); return this; }
    in(col: string, vals: (string | number)[]) { this._filters.push(`${col}=in.(${vals.join(",")})`); return this; }
    order(col: string, opts?: { ascending?: boolean }) {
      this._order.push(`${col}.${(opts?.ascending ?? true) ? "asc" : "desc"}`); return this;
    }
    limit(n: number) { this._limit = n; return this; }
    range(from: number, to: number) { this._offset = from; this._limit = to - from + 1; return this; }
    single() { this._single = true; this._withSelect = true; return this; }
    maybeSingle() { this._maybeSingle = true; return this; }

    then<T>(resolve: (v: Result<T | T[]>) => void, reject?: (e: unknown) => void) {
      this._execute<T>().then(resolve, reject);
    }

    private async _execute<T>(): Promise<Result<T | T[]>> {
      const qp: string[] = [...this._filters];
      const isRead = !this._writeMode;
      if (isRead || this._withSelect) qp.push(`select=${encodeURIComponent(this._select)}`);
      if (this._order.length > 0) qp.push(`order=${this._order.join(",")}`);
      if (this._limit !== undefined) qp.push(`limit=${this._limit}`);
      if (this._offset !== undefined) qp.push(`offset=${this._offset}`);

      const url = `${SUPABASE_URL}/rest/v1/${this._table}${qp.length ? "?" + qp.join("&") : ""}`;

      const prefer: string[] = [];
      if (this._withSelect || this._withCount) prefer.push("return=representation");
      if (this._withCount) prefer.push("count=exact");
      if (this._writeMode === "upsert") prefer.push("resolution=merge-duplicates");

      let method = "GET";
      let body: string | undefined;
      if (this._writeMode === "insert" || this._writeMode === "upsert") { method = "POST"; body = JSON.stringify(this._writeData); }
      else if (this._writeMode === "update") { method = "PATCH"; body = JSON.stringify(this._writeData); }
      else if (this._writeMode === "delete") { method = "DELETE"; }

      const reqHeaders: Record<string, string> = {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      };
      if (prefer.length > 0) reqHeaders.Prefer = prefer.join(",");

      const response = await fetch(url, { method, headers: reqHeaders, body });

      if (!response.ok) {
        const errText = await response.text();
        return { data: null, error: { message: errText } };
      }

      let count: number | undefined;
      if (this._withCount) {
        const cr = response.headers.get("Content-Range");
        if (cr) { const p = cr.split("/"); if (p[1] !== "*") count = parseInt(p[1], 10); }
      }

      const text = await response.text();
      if (!text || text === "null") return { data: null, error: null, count };

      const parsed = JSON.parse(text) as T | T[];

      if (this._single) {
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        if (arr.length === 0) return { data: null, error: { message: "No rows found" }, count };
        return { data: arr[0] as T, error: null, count };
      }
      if (this._maybeSingle) {
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        return { data: (arr[0] ?? null) as T | null, error: null, count };
      }

      return { data: parsed as T[], error: null, count };
    }
  }

  export const supabase = {
    from: (table: string) => new QB(table),
  };
  