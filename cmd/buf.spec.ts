import { create, toJson } from "@bufbuild/protobuf";
import { AuthorSchema } from "../src/gen/api/author/v1/author_pb";

test("buf", async () => {
    const author = create(AuthorSchema, {
        id: 'test',
        fullname: 'fullname'
    })
    expect(toJson(AuthorSchema, author)).toEqual({ id: 'test', fullname: 'fullname' })
})