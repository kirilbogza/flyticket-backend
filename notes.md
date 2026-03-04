## Git:

### Pull commits without extra commits:

```bash
git reset --hard origin/<branch-name>
```

### Go back one commit:

```bash
git reset --hard HEAD~1
```

#### Then:

```bash
git push --force
```

### Usefull words:

```bash
feat:     new feature
fix:      bug fix
docs:     documentation only
style:    formatting only (no logic change)
refactor: code change without behavior change
perf:     performance improvement
test:     add/modify tests
build:    build system / dependency changes
ci:       CI/CD config changes
chore:    maintenance, non-feature work
revert:   revert previous commit
```

## Plan:

```markdown
1. decide clear project goals and functionality
2. create a clear file structure based on requirement and tech-choices
3. dicide which plugins to use based on requirement and from old projects
```
