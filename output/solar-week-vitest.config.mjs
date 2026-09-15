import { defineConfig } from 'vitest/config';
// Concurrent project builds caused 5-second timeouts in otherwise passing suites.
// Keep every assertion; serialize the verification run and allow scheduling headroom.
export default defineConfig({ test: { maxWorkers: 1, fileParallelism: false, testTimeout: 30000, hookTimeout: 30000 } });
