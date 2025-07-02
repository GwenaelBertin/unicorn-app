BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[user] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(255) NOT NULL,
    [password] NVARCHAR(255) NOT NULL,
    [first_name] NVARCHAR(100),
    [last_name] NVARCHAR(100),
    [is_active] BIT NOT NULL CONSTRAINT [user_is_active_df] DEFAULT 1,
    [role] NVARCHAR(50) NOT NULL CONSTRAINT [user_role_df] DEFAULT 'USER',
    [created_at] DATETIME NOT NULL CONSTRAINT [user_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [user_email_key] UNIQUE NONCLUSTERED ([email])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
