import { Lang } from '@prisma/client';

export interface SupportedLangInfo {
  image: string;
  extension: string;
  compilation: string;
}

type SupportedLangDictionary<T extends string> = {
  [K in T]: SupportedLangInfo;
};

export const supportedLangs: SupportedLangDictionary<Lang> = {
  c: { image: 'c_app', extension: 'c', compilation: 'gcc -W -Wall -Wextra -o bin.out code.c' },
  cpp: { image: 'cpp_app', extension: 'cpp', compilation: 'g++ -W -Wall -Wextra -o bin.out code.cpp' },
  go: { image: 'go_app', extension: 'go', compilation: 'go build code.go -o bin.out' },
  javascript: { image: 'javascript_app', extension: 'js', compilation: '(echo "#!/usr/bin/env node" && cat "code.js") > bin.out && chmod +x bin.out' },
  python: { image: 'python_app', extension: 'py', compilation: '(echo "#!/usr/bin/env python3" && cat "code.py") > bin.out && chmod +x bin.out' },
  ruby: { image: 'ruby_app', extension: 'rb', compilation: '(echo "#!/usr/bin/env ruby" && cat "code.rb") > bin.out && chmod +x bin.out' },
  rust: { image: 'rust_app', extension: 'rs', compilation: 'rustc code.rs -o bin.out' },
};
