# Dev Container

This project includes a ready-to-use [Dev Container](https://containers.dev/) (VS Code / Cursor / GitHub Codespaces).

## What's set up

- Node.js **22** (matches `engines.node` in `package.json`)
- Dependencies installed automatically (`npm install`)
- [OpenCode](https://opencode.ai/) CLI (`@opencode/cli`) installed globally
- Git configured to use **SSH** for GitHub (HTTPS URLs are rewritten to SSH automatically)
- `.env.local` created from `.env.example` if missing
- `node_modules` persisted in a named volume
- Forwarded ports: `3000` (Next.js), `6006` (Storybook), `9999` (Slice Machine)

## One-time prerequisites (for pushing over SSH)

1. Add an SSH key to your GitHub account (if you don't have one):
   - Generate: `ssh-keygen -t ed25519 -C "you@example.com"`
   - Add the public key (`~/.ssh/id_ed25519.pub`) to https://github.com/settings/keys

2. Make sure your host SSH agent has the key loaded:
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ssh-add -l   # should list your key
   ```

VS Code automatically forwards the SSH agent into the container, so `git push` works out of the box once the key is loaded.

> **Tip:** if your network blocks SSH port 22, use GitHub over port 443:
> `git config --global url."ssh://git@ssh.github.com:443/".insteadOf "ssh://git@github.com/"`

## Usage

1. Open the project in a Dev Container (VS Code: "Reopen in Container").
2. Run OpenCode inside the container:
   ```bash
   opencode
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
