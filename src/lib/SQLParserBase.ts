import * as antlr from "antlr4ng";
export abstract class SQLParserBase<T = antlr.ParserRuleContext> extends antlr.Parser{
    public constructor(input: antlr.TokenStream) {
        super(input);
    }

    public abstract program(): T;

    public caretTokenIndex = -1;

    public entityCollecting = false;

    public shouldMatchEmpty() {
        // Only enable in entity collecting mode
        if (!this.entityCollecting) {
            return false;
        }
        
        // Check if previous token is DOT (table.column separator)
        const prevToken = this.tokenStream.LT(-1);
        const isAfterDot = prevToken?.text === '.';
        
        if (!isAfterDot) {
            return false;
        }

        // Check if next token is valid
        const nextToken = this.tokenStream.LT(1);
        if (!nextToken) {
            return false;
        }

        // Check if we're at caret position (if caretTokenIndex is set)
        if (this.caretTokenIndex >= 0) {
            const isAtCaretPosition = 
                (prevToken.tokenIndex ?? -1) <= this.caretTokenIndex &&
                (nextToken.tokenIndex ?? Number.MAX_SAFE_INTEGER) >= this.caretTokenIndex;
            
            if (!isAtCaretPosition) {
                return false;
            }
        }

        // Valid follow token types for empty column
        const validFollowTypes = [
            'FROM', 'from', 'COMMA', ',', 'WHERE', 'where',
            'ORDER', 'order', 'GROUP', 'group', 'HAVING', 'having',
            'JOIN', 'join', 'ON', 'on', 'USING', 'using',
            'WINDOW', 'window', 'LIMIT', 'limit', 'OFFSET', 'offset',
            'FETCH', 'fetch', 'FOR', 'for', 'UNION', 'union',
            'INTERSECT', 'intersect', 'EXCEPT', 'except', ';',
        ];

        // Check if token type is EOF
        const isEof = nextToken.type === antlr.Token.EOF;
        
        const isValidFollowToken = isEof || validFollowTypes.includes(nextToken.text ?? '');

        return isValidFollowToken;
    }
}
