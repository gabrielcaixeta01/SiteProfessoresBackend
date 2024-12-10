/*
  Warnings:

  - You are about to drop the column `idProfessors` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `idCourses` on the `Professors` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `User` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.
  - Made the column `dateUpdated` on table `Courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateUpdated` on table `Professors` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "CourseProfessor" (
    "courseId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,

    PRIMARY KEY ("courseId", "professorId"),
    CONSTRAINT "CourseProfessor_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourseProfessor_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CoursesToProfessors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CoursesToProfessors_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CoursesToProfessors_B_fkey" FOREIGN KEY ("B") REFERENCES "Professors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Avaliacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "userId2" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEdited" BOOLEAN NOT NULL,
    "professorId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Avaliacao_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Avaliacao" ("date", "id", "isEdited", "nota", "text", "userId2") SELECT "date", "id", "isEdited", "nota", "text", "userId2" FROM "Avaliacao";
DROP TABLE "Avaliacao";
ALTER TABLE "new_Avaliacao" RENAME TO "Avaliacao";
CREATE TABLE "new_Courses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" DATETIME NOT NULL
);
INSERT INTO "new_Courses" ("dateCreated", "dateUpdated", "id", "name") SELECT coalesce("dateCreated", CURRENT_TIMESTAMP) AS "dateCreated", "dateUpdated", "id", "name" FROM "Courses";
DROP TABLE "Courses";
ALTER TABLE "new_Courses" RENAME TO "Courses";
CREATE UNIQUE INDEX "Courses_name_key" ON "Courses"("name");
CREATE TABLE "new_Professors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" DATETIME NOT NULL
);
INSERT INTO "new_Professors" ("dateCreated", "dateUpdated", "department", "id", "name") SELECT coalesce("dateCreated", CURRENT_TIMESTAMP) AS "dateCreated", "dateUpdated", "department", "id", "name" FROM "Professors";
DROP TABLE "Professors";
ALTER TABLE "new_Professors" RENAME TO "Professors";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "courseId" INTEGER,
    "profilepic" TEXT,
    CONSTRAINT "User_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("department", "email", "id", "name", "password", "profilepic") SELECT "department", "email", "id", "name", "password", "profilepic" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToProfessors_AB_unique" ON "_CoursesToProfessors"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToProfessors_B_index" ON "_CoursesToProfessors"("B");
