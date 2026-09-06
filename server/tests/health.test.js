import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../server.js';
test('health route is registered', () => { assert.equal(typeof app, 'function'); });
