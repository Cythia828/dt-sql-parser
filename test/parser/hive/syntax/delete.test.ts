import HiveSQL from 'src/parser/hive';
import { readSQL } from 'test/helper';

const parser = new HiveSQL();

const features = {
    deletes: readSQL(__dirname, 'delete.sql'),
};

describe('HiveSQL Delete Syntax Tests', () => {
    features.deletes.forEach((del) => {
        it(del, () => {
            expect(parser.validate(del).length).toBe(0);
        });
    });
});
