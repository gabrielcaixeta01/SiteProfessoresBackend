/*
  Warnings:

  - You are about to drop the column `nota` on the `Avaliacao` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Avaliacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "professorId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Avaliacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Avaliacao" ("courseId", "createdAt", "date", "id", "isEdited", "professorId", "text", "updatedAt", "userId") SELECT "courseId", "createdAt", "date", "id", "isEdited", "professorId", "text", "updatedAt", "userId" FROM "Avaliacao";
DROP TABLE "Avaliacao";
ALTER TABLE "new_Avaliacao" RENAME TO "Avaliacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
