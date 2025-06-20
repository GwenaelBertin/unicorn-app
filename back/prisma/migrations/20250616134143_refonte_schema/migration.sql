/*
  Warnings:

  - You are about to drop the `Unicorn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnicornType` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Unicorn] DROP CONSTRAINT [Unicorn_typeId_fkey];

-- DropTable
DROP TABLE [dbo].[Unicorn];

-- DropTable
DROP TABLE [dbo].[UnicornType];

-- CreateTable
CREATE TABLE [dbo].[sector] (
    [sector_id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    CONSTRAINT [sector_pkey] PRIMARY KEY CLUSTERED ([sector_id]),
    CONSTRAINT [sector_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[status] (
    [status_id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(50) NOT NULL,
    CONSTRAINT [status_pkey] PRIMARY KEY CLUSTERED ([status_id]),
    CONSTRAINT [status_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[startup] (
    [startup_id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [founded_year] INT,
    [valuation] DECIMAL(20,2) NOT NULL,
    [website] NVARCHAR(255),
    [description] NVARCHAR(255),
    [sector_id] INT NOT NULL,
    [status_id] INT NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [startup_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL,
    CONSTRAINT [startup_pkey] PRIMARY KEY CLUSTERED ([startup_id]),
    CONSTRAINT [startup_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[startup] ADD CONSTRAINT [startup_sector_id_fkey] FOREIGN KEY ([sector_id]) REFERENCES [dbo].[sector]([sector_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[startup] ADD CONSTRAINT [startup_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[status]([status_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
