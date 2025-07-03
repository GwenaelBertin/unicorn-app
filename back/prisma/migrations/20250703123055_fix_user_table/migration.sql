/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- Drop constraints first
ALTER TABLE [dbo].[user] DROP CONSTRAINT [user_is_active_df];
ALTER TABLE [dbo].[user] DROP CONSTRAINT [user_role_df];
ALTER TABLE [dbo].[user] DROP CONSTRAINT [user_created_at_df];
ALTER TABLE [dbo].[user] DROP CONSTRAINT [user_pkey];
ALTER TABLE [dbo].[user] DROP CONSTRAINT [user_email_key];

-- AlterTable
ALTER TABLE [dbo].[user] DROP COLUMN [first_name],
[id],
[is_active],
[last_name],
[role];
ALTER TABLE [dbo].[user] ADD [user_id] INT NOT NULL IDENTITY(1,1);
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([user_id]);
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_email_key] UNIQUE NONCLUSTERED ([email]);
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_created_at_df] DEFAULT CURRENT_TIMESTAMP FOR [created_at];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
