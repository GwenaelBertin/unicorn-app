BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UnicornType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UnicornType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UnicornType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Unicorn] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [age] INT NOT NULL,
    [typeId] INT NOT NULL,
    CONSTRAINT [Unicorn_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Unicorn] ADD CONSTRAINT [Unicorn_typeId_fkey] FOREIGN KEY ([typeId]) REFERENCES [dbo].[UnicornType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
