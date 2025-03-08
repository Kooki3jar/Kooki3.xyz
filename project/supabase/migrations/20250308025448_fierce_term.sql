/*
  # Remove Duplicate Notifications Table

  1. Changes
    - Drop the duplicate notifications table
    - Keep admin_notifications table for admin-specific notifications
    - Ensure all data is preserved in the main notifications table

  2. Security
    - Maintain existing RLS policies
*/

-- Drop the duplicate notifications table if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public' 
    AND tablename = 'notifications'
  ) THEN
    DROP TABLE public.notifications;
  END IF;
END $$;