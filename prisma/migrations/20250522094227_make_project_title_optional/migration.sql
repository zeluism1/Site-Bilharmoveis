-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titlePT" TEXT,
    "titleEN" TEXT,
    "titleES" TEXT,
    "imageUrl" TEXT NOT NULL,
    "location" TEXT,
    "descriptionPT" TEXT,
    "descriptionEN" TEXT,
    "descriptionES" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "descriptionEN", "descriptionES", "descriptionPT", "id", "imageUrl", "location", "titleEN", "titleES", "titlePT", "updatedAt") SELECT "createdAt", "descriptionEN", "descriptionES", "descriptionPT", "id", "imageUrl", "location", "titleEN", "titleES", "titlePT", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
