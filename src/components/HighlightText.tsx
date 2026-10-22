import type { ReactNode } from 'react';

interface HighlightTextProps {
  text: string;
  /** original：荧光笔底纹；memory：加粗数字/缩写，不铺底纹 */
  variant?: 'original' | 'memory';
}

const TOKEN_PATTERN = /(\d+(?:\.\d+)?(?:\s*(?:分|米|元|公里\/小时|km\/h|小时|分钟|日|年|%|次|人|张|条|吨|座|岁))?|[A-Z][A-Z0-9/]{1,7})/g;
const UNIT_PATTERN = /分|米|元|公里\/小时|km\/h|小时|分钟|日|年|%|次|人|张|条|吨|座|岁/;

function isHighlightWorthy(token: string): boolean {
  if (/^[A-Z]/.test(token)) return token.length >= 2;
  if (UNIT_PATTERN.test(token)) return true;
  const numeric = Number.parseFloat(token.replace(/[^\d.]/g, ''));
  if (Number.isNaN(numeric)) return false;
  // 四位以上的纯数字多半是年份/法条编号，不铺荧光笔。
  return numeric < 1000;
}

function isTokenPart(part: string): boolean {
  // split 出来的普通文本段落绝不能再套荧光笔，只处理数字/缩写 token。
  return /^\d/.test(part) || /^[A-Z][A-Z0-9/]*$/.test(part);
}

export function HighlightText({ text, variant = 'original' }: HighlightTextProps): ReactNode {
  const parts = text.split(TOKEN_PATTERN).filter((part) => part !== '');
  return (
    <>
      {parts.map((part, index) => {
        if (!isTokenPart(part) || !isHighlightWorthy(part)) return part;
        if (variant === 'memory') {
          return <b key={`${part}-${index}`}>{part}</b>;
        }
        return <mark key={`${part}-${index}`}>{part}</mark>;
      })}
    </>
  );
}
