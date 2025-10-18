import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';

// Polyfill para React Router (soluciona ReferenceError: TextEncoder is not defined)
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}