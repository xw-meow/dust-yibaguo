import { useState } from 'react';
import { resetAll } from '../store/progress';

export function SiteFooter() {
  const [confirming, setConfirming] = useState(false);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>进度保存在本机浏览器 · 内容仅供备考练习</p>
        {confirming ? (
          <span className="footer-reset-group">
            <span>确认清空全部学习进度？</span>
            <button
              type="button"
              className="footer-reset footer-reset--danger"
              onClick={() => {
                resetAll();
                setConfirming(false);
              }}
            >
              确认清空
            </button>
            <button type="button" className="footer-reset" onClick={() => setConfirming(false)}>
              取消
            </button>
          </span>
        ) : (
          <button type="button" className="footer-reset" onClick={() => setConfirming(true)}>
            清空进度
          </button>
        )}
      </div>
    </footer>
  );
}
