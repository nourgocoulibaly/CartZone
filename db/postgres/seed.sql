INSERT INTO categories (id, name, slug, icon, description, color) VALUES
('gaming', 'Gaming', 'gaming', 'Gamepad2', 'PlayStation, Xbox, Nintendo, Steam et plus', 'oklch(0.65 0.19 245)'),
('music', 'Musique', 'musique', 'Music', 'Spotify, Apple Music, Deezer', 'oklch(0.72 0.19 155)'),
('streaming', 'Streaming', 'streaming', 'Tv', 'Netflix, Disney+, Amazon Prime', 'oklch(0.65 0.18 30)')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, slug, category_id, brand, description, image, denominations_json, currency, discount, is_new, is_featured, rating, reviews) VALUES
('ps-store-10', 'PlayStation Store', 'playstation-store', 'gaming', 'PlayStation', 'Carte cadeau PlayStation Store.', '/images/ps-store.jpg', '[10,20,50,100]'::jsonb, 'EUR', 5, FALSE, TRUE, 4.8, 342),
('xbox-gift', 'Xbox Gift Card', 'xbox-gift-card', 'gaming', 'Xbox', 'Carte cadeau Xbox.', '/images/xbox-gift.jpg', '[15,25,50,100]'::jsonb, 'EUR', NULL, FALSE, TRUE, 4.7, 218),
('spotify-premium', 'Spotify Premium', 'spotify-premium', 'music', 'Spotify', 'Carte cadeau Spotify Premium.', '/images/spotify.jpg', '[10,30,60]'::jsonb, 'EUR', 10, FALSE, TRUE, 4.8, 456),
('netflix-gift', 'Netflix', 'netflix', 'streaming', 'Netflix', 'Carte cadeau Netflix.', '/images/netflix.jpg', '[15,25,50]'::jsonb, 'EUR', NULL, FALSE, TRUE, 4.8, 389)
ON CONFLICT (id) DO NOTHING;
