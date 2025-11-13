/*
  # Create BookBridge Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - User unique identifier
      - `email` (text, unique) - User email address
      - `fullname` (text) - User's full name
      - `address` (text, nullable) - User's address for book collection
      - `created_at` (timestamptz) - Account creation timestamp
      
    - `books`
      - `id` (uuid, primary key) - Book unique identifier
      - `title` (text) - Book title
      - `author` (text) - Book author
      - `description` (text) - Book condition description
      - `cover_image_url` (text, nullable) - URL to book cover from Open Library API
      - `isbn` (text, nullable) - ISBN for API lookup
      - `donor_id` (uuid, foreign key) - Reference to users table
      - `status` (text) - Book donation status (pending, collected, distributed)
      - `created_at` (timestamptz) - Donation timestamp
      
    - `feedbacks`
      - `id` (uuid, primary key) - Feedback unique identifier
      - `feedback` (text) - Feedback content
      - `sender_id` (uuid, foreign key) - Reference to users table
      - `created_at` (timestamptz) - Feedback submission timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to books leaderboard
    
  3. Important Notes
    - All timestamps use server timestamp for consistency
    - Books track cover images from Open Library API
    - Status field helps track donation lifecycle
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  fullname text NOT NULL,
  address text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  description text NOT NULL,
  cover_image_url text,
  isbn text,
  donor_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback text NOT NULL,
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Books policies
CREATE POLICY "Anyone can view books for leaderboard"
  ON books FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own book donations"
  ON books FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = donor_id);

CREATE POLICY "Users can view their own book donations"
  ON books FOR SELECT
  TO authenticated
  USING (auth.uid() = donor_id);

CREATE POLICY "Users can update their own book donations"
  ON books FOR UPDATE
  TO authenticated
  USING (auth.uid() = donor_id)
  WITH CHECK (auth.uid() = donor_id);

-- Feedbacks policies
CREATE POLICY "Users can create their own feedback"
  ON feedbacks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can view their own feedback"
  ON feedbacks FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_books_donor_id ON books(donor_id);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedbacks_sender_id ON feedbacks(sender_id);
