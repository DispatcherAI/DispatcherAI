-- Existing calls predate reliable call-ended updates, so backfill them as closed.
UPDATE "Call"
SET
    "inProgress" = false,
    "status" = 'Resolved',
    "endedAt" = COALESCE("endedAt", "createdAt")
WHERE
    "inProgress" IS DISTINCT FROM false
    OR "status" IS DISTINCT FROM 'Resolved'
    OR "endedAt" IS NULL;
