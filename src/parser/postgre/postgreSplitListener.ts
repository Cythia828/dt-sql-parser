import { SingleStmtContext } from '../../lib/pgsql/PostgreSQLParser';

import { PostgreSQLParserListener } from '../../lib/pgsql/PostgreSQLParserListener';

export default class PostgreSqlSplitListener implements PostgreSQLParserListener {
    private _statementsContext: SingleStmtContext[] = [];

    exitSingleStmt = (ctx: SingleStmtContext) => {
        this._statementsContext.push(ctx);
    };

    enterSingleStmt = (ctx: SingleStmtContext) => {};

    get statementsContext() {
        return this._statementsContext;
    }
}
