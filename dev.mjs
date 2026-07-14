// dev.mjs — chạy cả Express (port 45456) và Vite dev server (port 45455) cùng lúc
import { spawn } from "child_process";

const colors = { express: "\x1b[36m", vite: "\x1b[35m", reset: "\x1b[0m" };

function run(label, cmd, args, env = {}) {
  const color = colors[label] || "";
  const proc = spawn(cmd, args, {
    cwd: process.cwd(),
    env: { ...process.env, ...env },
    shell: true,
  });
  proc.stdout.on("data", (d) => process.stdout.write(`${color}[${label}]${colors.reset} ${d}`));
  proc.stderr.on("data", (d) => process.stderr.write(`${color}[${label}]${colors.reset} ${d}`));
  proc.on("exit", (code) => {
    console.log(`${color}[${label}]${colors.reset} Process exited with code ${code}`);
    process.exit(code ?? 0);
  });
  return proc;
}

console.log("🚀 Starting Express (port 45456) + Vite dev server (port 45455)...\n");

run("express", "node", ["server.js"], { PORT: "45456" });

// Small delay so Express starts before Vite
setTimeout(() => {
  run("vite", "npx", ["vite", "--port", "45455"]);
}, 1500);

// Graceful shutdown
process.on("SIGINT", () => process.exit(0));
