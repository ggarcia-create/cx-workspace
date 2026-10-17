# Historical storage — implementation status

Not enabled in production. The desktop and cx-api still use Supabase. No source records have been removed.

## Verified backup

Native workbook: https://docs.google.com/spreadsheets/d/18K2GhkeDERiHDx1cw_lNXOIcdUFF4cG6X1QQE1ghd1I

Source workspace version 89, captured 2026-10-17. Contains 86 records, including 80 dated before October. `Originales` contains ordered base64 fragments of the complete business snapshot, with SHA-256 verification. This preserves nested and future fields beyond the readable worksheets. Account profiles are excluded. A readback from the native Sheet was decoded and compared against the local snapshot successfully.

Readable worksheets: Expedientes, Fallas, Reparaciones, Calidad, Seguimiento, VentasMensuales. One expediente has one ID and folio. Failure rows reference that ID; they must never be summed as financial transactions. Orders and serials remain text; amounts are integer MXN cents.

## Implemented locally

- `archive/snapshot.cjs`: validates IDs, folios, dates, routes, textual order numbers and integer amounts; makes, chunks, restores and verifies lossless snapshots; partitions by the Mexico City calendar month.
- `archive/tiered-state.cjs`: hydrates historical monthly bundles and stages immutable changed bundles. The current month remains in the live state. Open records follow the same date rule as closed records.
- Tests exercise lossless roundtrip, duplicates, corruption, timezone boundaries, historical updates, unchanged reuse, isolated failed writes, and readers retaining their previously committed view.

## Production work still required

1. Server-only access is configured using Rematech Sheets. A deployed protected diagnostic confirmed real read/write on 2026-10-17. Never embed credentials in desktop assets, Git, workbook cells, or logs.
2. The authenticated Sheets object adapter is implemented locally. Append immutable revisions, read back and verify before returning a reference. A timeout must not publish an unverified reference. Store only references/checksums in Supabase.
3. Hydration and staging are wired locally into business operations, report data, email report generation and `cx_commit_state`. Deployment is pending. Commit the index and live state atomically through existing version/profile checks. A losing commit may leave an unreferenced Sheet revision; it must never overwrite the winner.
4. Lightweight version refresh is implemented locally; deploy it to replace full unchanged downloads. Add scoped reads and scoped reads so clients do not fetch every record each 30 seconds. Combine both sources under the existing module permissions. On Sheets failure, expose unavailable history instead of silently returning an incomplete dashboard or report.
5. Add explicit import preview and validation using the existing business validator. Reject missing required fields and ambiguous destinations. Preserve valid IDs and serials; reserve new folios once per idempotent batch. Do not treat an arbitrary edited workbook as trusted application state.
6. Test real read/write against a disposable historical record, permission denial, competing updates, backdated creation, month rollover, search, dashboards and PDF/email reports.
7. Refresh and verify the backup against the latest source version, then perform the first migration with the same version check. Do not remove source records based on the version-89 backup if newer changes exist.

The backup workbook is not yet an editable database. Until the production adapter and routing pass these checks, changes continue in Supabase.
