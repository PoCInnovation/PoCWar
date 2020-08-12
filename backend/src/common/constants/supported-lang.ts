export interface SupportedLang {
  image: string;
  extension: string;
}

interface SupportedLangDict {
  [key: string]: SupportedLang
}

export const lang: SupportedLangDict = {
  clang: { image: 'c_app', extension: 'c' },
  cpp: { image: 'cpp_app', extension: 'cpp' },
  go: { image: 'go_app', extension: 'go' },
  javascript: { image: 'javascript_app', extension: 'js' },
  python: { image: 'python_app', extension: 'py' },
  rust: { image: 'rust_app', extension: 'rs' },
};
