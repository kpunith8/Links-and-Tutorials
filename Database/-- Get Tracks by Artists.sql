-- Get Tracks by Artists
--
-- Description: Retrieves all tracks with their corresponding artists by joining
--              track, album, and artist tables
--
-- Written by @pgsql [Claude Sonnet 3.5]

SELECT 
    ar.name AS artist_name,
    t.title AS track_name,
    al.title AS album_name,
    t.len AS duration,
    t.rating,
    t.count AS play_count
FROM track t
JOIN album al ON t.album_id = al.id
JOIN artist ar ON al.artist_id = ar.id
ORDER BY ar.name, t.title;