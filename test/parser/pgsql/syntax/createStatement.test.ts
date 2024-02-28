import PostgresSQL from 'src/parser/postgre';
import { readSQL } from 'test/helper';

const parser = new PostgresSQL();

const features = {
    creates: readSQL(__dirname, 'create.sql'),
};

describe('PgSQL Create Syntax Tests', () => {
    features.creates.forEach((create) => {
        it(create, () => {
            expect(parser.validate(create).length).toBe(0);
        });
    });
});
