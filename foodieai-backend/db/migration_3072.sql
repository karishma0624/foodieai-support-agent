-- Drop the old function and table to recreate with 3072 dimensions
drop function if exists match_knowledge_base;
drop table if exists knowledge_base;

-- Recreate knowledge_base with vector(3072)
create table knowledge_base (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  content text not null,
  embedding vector(3072), -- Gemini gemini-embedding-001 = 3072 dimensions
  created_at timestamptz default now()
);



-- Recreate similarity search function
create or replace function match_knowledge_base (
  query_embedding vector(3072),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  title text,
  category text,
  content text,
  similarity float
)
language sql stable
as $$
  select
    knowledge_base.id,
    knowledge_base.title,
    knowledge_base.category,
    knowledge_base.content,
    1 - (knowledge_base.embedding <=> query_embedding) as similarity
  from knowledge_base
  where 1 - (knowledge_base.embedding <=> query_embedding) > match_threshold
  order by knowledge_base.embedding <=> query_embedding
  limit match_count;
$$;
