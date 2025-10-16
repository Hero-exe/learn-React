// Jest DOM matchers
import '@testing-library/jest-dom';

// React Testing Library のカスタム設定
import { configure } from '@testing-library/react';

// テストタイムアウトを長めに設定
configure({ testIdAttribute: 'data-testid' });

// グローバルなテスト設定
beforeEach(() => {
  // 各テスト前にコンソールエラーをクリア
  jest.clearAllMocks();
});

// モック関数のグローバル設定
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// ResizeObserver のモック
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// IntersectionObserver のモック
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));