import { defineConfig } from 'vitest/config';

// Limit local test memory while other project tasks build in the same workspace.
export default defineConfig({ test: { maxWorkers: 1, fileParallelism: false } });
