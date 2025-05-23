-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titlePT" TEXT NOT NULL,
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
