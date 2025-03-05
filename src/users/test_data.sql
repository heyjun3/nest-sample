INSERT INTO
    users(id, name)
SELECT
    gen_random_uuid (),
    FORMAT('test%s', i)
FROM
    GENERATE_SERIES(1, 100000) AS i;