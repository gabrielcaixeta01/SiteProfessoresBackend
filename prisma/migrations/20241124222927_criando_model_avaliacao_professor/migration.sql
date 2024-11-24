-- CreateTable
CREATE TABLE "Courses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idProfessors" TEXT,
    "dateCreated" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Professors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "idCourses" TEXT,
    "dateCreated" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Courses_name_key" ON "Courses"("name");
