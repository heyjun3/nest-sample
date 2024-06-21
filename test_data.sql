-- inとanyの違いを確認する。
CREATE TABLE
    customer (id UUID PRIMARY KEY, NAME VARCHAR);

INSERT INTO
    customer (id, NAME)
SELECT
    gen_random_uuid (),
    FORMAT('test%s', i)
FROM
    GENERATE_SERIES(1, 9000000) AS i;
