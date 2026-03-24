# Rebase Instructions for feat/emptyColumn

## 当前问题
- 当前分支 `feat/emptyColumn` 已经 merge 过 `next` 分支
- 直接对 `next` 发起 PR 会有很多重复 commits
- 需要 rebase 并整理 commit 记录

## 解决方案

### 选项 1：手动整理（推荐）

```bash
# 1. 切换到 feat/emptyColumn
git checkout feat/emptyColumn

# 2. 保存当前修改
git diff dtstack/next > /tmp/changes.patch

# 3. 基于 next 创建新分支
git checkout dtstack/next
git checkout -b feat/emptyColumn_rebased

# 4. 应用修改
git apply /tmp/changes.patch

# 5. 重新生成 parsers
npm run antlr4

# 6. 创建整洁的 commits
git add src/lib/SQLParserBase.ts src/grammar/postgresql/PostgreSqlParser.g4 src/parser/postgresql/postgreEntityCollector.ts
git commit -m "feat: support empty column matching in entityCollecting context"

git add src/grammar/hive/HiveSqlParser.g4 src/grammar/flink/FlinkSqlParser.g4
git commit -m "fix: remove semantic predicates from path rules"

git add src/parser/common/entityCollector.ts test/
git commit -m "feat: keep empty column entities in collector"

git add src/lib/
git commit -m "build: regenerate parsers"

# 7. 推送新分支
git push origin feat/emptyColumn_rebased
```

### 选项 2：使用 git rebase -i

```bash
# 在 feat/emptyColumn 分支上执行
git checkout feat/emptyColumn
git rebase -i dtstack/next

# 在编辑器中：
# - 删除与 next 重复的 commits
# - 将相关 commits squash 在一起
# - 保存并退出
```

### 选项 3：保持现状

如果重复的 commits 不影响代码审查，可以直接创建 PR 并在描述中说明：
"This PR includes commits from next branch. Please review the unique changes only."

## 验证

```bash
# 查看与 next 的差异
git diff dtstack/next --stat

# 运行测试
npm test

# 查看 commit 历史
git log --oneline dtstack/next..HEAD
```
