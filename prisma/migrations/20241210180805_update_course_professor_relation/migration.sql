/*
  Warnings:

  - You are about to drop the `CourseProfessor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CoursesToProfessors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CourseProfessor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CoursesToProfessors";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ProfessorCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProfessorCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfessorCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "Professors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessorCourses_AB_unique" ON "_ProfessorCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessorCourses_B_index" ON "_ProfessorCourses"("B");
