set dotenv-load

default:
    just dev

dev:
    pnpm tauri dev

build:
    pnpm tauri build

i18n:
    pnpm run i18n
