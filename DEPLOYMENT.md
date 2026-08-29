# 2 Stray Cats — AWS Deployment Setup Guide

Follow these steps once in the AWS console + GitHub to wire everything up.

---

## Step 1 — Create Two Amplify Apps

1. Go to → **AWS Console** → **AWS Amplify** → **New App → Host Web App**
2. Connect your **GitHub repo** → Select branch **`test`** → App name: `2cat-test`
3. Build settings — use these:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
4. Repeat for branch **`main`** → App name: `2cat-prod`
5. Note down both **App IDs** (e.g. `d3abc123xyz`)

---

## Step 2 — Create IAM OIDC Role for GitHub Actions (No long-lived keys)

1. **AWS Console** → **IAM** → **Identity Providers** → **Add Provider**
   - Provider type: **OpenID Connect**
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`

2. **IAM** → **Roles** → **Create Role**
   - Trusted entity: **Web identity** → Select the OIDC provider above
   - Condition: `token.actions.githubusercontent.com:sub` = `repo:YOUR_GITHUB_USERNAME/2cat:*`
   - Attach policy: `AdministratorAccess-Amplify` (or custom policy below)
   - Role name: `github-actions-deploy`
   - Copy the **Role ARN** (e.g. `arn:aws:iam::123456789:role/github-actions-deploy`)

### Minimum IAM Policy (Recommended over Admin)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "amplify:StartJob",
        "amplify:GetJob",
        "amplify:ListJobs"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## Step 3 — Add GitHub Secrets

Go to → **GitHub Repo** → **Settings** → **Secrets and Variables** → **Actions** → **New Repository Secret**

| Secret Name           | Value                                  |
|-----------------------|----------------------------------------|
| `AWS_ACCOUNT_ID`      | Your 12-digit AWS Account ID           |
| `AMPLIFY_APP_ID_TEST` | App ID from the `2cat-test` Amplify app |
| `AMPLIFY_APP_ID_PROD` | App ID from the `2cat-prod` Amplify app |

---

## Step 4 — Create `test` Branch

```bash
git checkout main
git checkout -b test
git push origin test
```

---

## Step 5 — Protect Branches (Recommended)

Go to → **GitHub Repo** → **Settings** → **Branches** → **Add Rule**

For `main`:
- ✅ Require a pull request before merging
- ✅ Require status checks to pass (add `deploy` job)
- ✅ Do not allow bypassing

For `test`:
- ✅ Require a pull request before merging

---

## Step 6 — Your Daily Workflow

```bash
# Start a new feature
git checkout test
git checkout -b feature/my-new-feature

# Work, commit, push
git push origin feature/my-new-feature

# Open PR: feature/my-new-feature → test
# → GitHub Actions auto-runs test.yaml → Testing site updated

# After verifying on Testing:
# Open PR: test → main
# → GitHub Actions auto-runs prod.yaml → Production site updated
```

---

## Deployed URLs

| Environment | URL                                          |
|-------------|----------------------------------------------|
| Testing     | `https://test.YOUR_APP_ID.amplifyapp.com`   |
| Production  | `https://2straycats.amplifyapp.com`         |
