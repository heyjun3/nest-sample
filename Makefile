.PHONY: connect-db

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

grpc-test:
	grpcurl -plaintext -d '{"id": "1"}' localhost:5000 api.author.v1.AuthorService/GetAuthor

connect-db:
	PGPASSWORD=postgres psql -d sample -h localhost -U postgres -p 5433