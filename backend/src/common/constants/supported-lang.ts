import { Lang } from '@prisma/client';

export interface SupportedLangInfo {
  image: string;
  extension: string;
}

type SupportedLangDictionary<T extends string> = {
  [K in T]: SupportedLangInfo;
};

export const lang: SupportedLangDictionary<Lang> = {
  c: { image: 'c_app', extension: 'c' },
  cpp: { image: 'cpp_app', extension: 'cpp' },
  go: { image: 'go_app', extension: 'go' },
  javascript: { image: 'javascript_app', extension: 'js' },
  python: { image: 'python_app', extension: 'py' },
  rust: { image: 'rust_app', extension: 'rs' },
  ruby: { image: 'ruby_app', extension: 'rb' },
};
