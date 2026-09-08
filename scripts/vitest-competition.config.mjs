import { defineConfig } from 'vitest/config';
// Keep graphics/Angular verification usable alongside a running desktop preview.
export default defineConfig({ test: { maxWorkers: 1, fileParallelism: false } });
