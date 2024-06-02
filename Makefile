
schema-inspect:
	atlas schema inspect -u "postgres://postgres:postgres@localhost:5433/sample?sslmode=disable" --format '{{ sql . }}'

schema-diff:
	atlas schema diff \
		--to "file://src/database/schema.sql" \
		--from "postgres://postgres:postgres@localhost:5433/sample?sslmode=disable" \
		--dev-url "docker://postgres/16/dev"

apply-dry-run:
	atlas schema apply \
		--to "file://src/database/schema.sql" \
		--url "postgres://postgres:postgres@localhost:5433/sample?sslmode=disable" \
		--dry-run \
		--dev-url "docker://postgres/16/dev"

apply:
	atlas schema apply \
		--to "file://src/database/schema.sql" \
		--url "postgres://postgres:postgres@localhost:5433/sample?sslmode=disable" \
		--dev-url "docker://postgres/16/dev"
