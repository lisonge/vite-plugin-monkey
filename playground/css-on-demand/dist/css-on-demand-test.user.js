// ==UserScript==
// @name         CSS On-Demand Test
// @namespace    npm/vite-plugin-monkey
// @version      0.0.0
// @description  Test CSS on-demand loading functionality
// @icon         https://vitejs.dev/logo.svg
// @match        https://example.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  (function() {
    (n=>{if(typeof GM_addStyle=="function"){GM_addStyle(n);return}const t=document.createElement("style");t.textContent=n,document.head.append(t);})(`/* \u4E3B\u6837\u5F0F\u6587\u4EF6 */

.main-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  text-align: center;
  opacity: 0.9;
}

.button-container {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
}

.load-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.load-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.load-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.load-btn.secondary {
  background: rgba(255, 193, 7, 0.2);
  border-color: rgba(255, 193, 7, 0.5);
}

.load-btn.secondary:hover {
  background: rgba(255, 193, 7, 0.3);
}
`);})();
  console.log("CSS按需加载测试开始");
  function createComponent() {
    const div = document.createElement("div");
    div.className = "component-box";
    div.innerHTML = `
    <div class="component-header">动态组件</div>
    <div class="component-content">这是一个动态创建的组件，它的样式是按需加载的。</div>
  `;
    return div;
  }
  const container = document.createElement("div");
  container.className = "main-container";
  const title = document.createElement("h1");
  title.className = "page-title";
  title.textContent = "CSS 按需加载功能测试";
  const description = document.createElement("p");
  description.className = "description";
  description.textContent = "此页面测试CSS文件的按需加载功能。点击按钮动态加载组件样式。";
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  const loadStyleBtn = document.createElement("button");
  loadStyleBtn.className = "load-btn";
  loadStyleBtn.textContent = "加载组件样式";
  loadStyleBtn.onclick = async () => {
    await Promise.resolve().then(() => {
      ((n) => {
        if (typeof GM_addStyle == "function") {
          GM_addStyle(n);
          return;
        }
        const o = document.createElement("style");
        o.textContent = n, document.head.append(o);
      })(`/* 组件样式文件 */
.component-box {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.component-header {
  font-weight: bold;
  color: #555;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.component-content {
  line-height: 1.6;
  color: #666;
}
`);
    });
    const component = createComponent();
    container.appendChild(component);
    loadStyleBtn.textContent = "样式已加载";
    loadStyleBtn.disabled = true;
  };
  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.className = "load-btn secondary";
  loadMoreBtn.textContent = "加载更多样式";
  loadMoreBtn.onclick = async () => {
    await Promise.resolve().then(() => {
      ((n) => {
        if (typeof GM_addStyle == "function") {
          GM_addStyle(n);
          return;
        }
        const e = document.createElement("style");
        e.textContent = n, document.head.append(e);
      })(`/* 动态加载样式文件 */
.extra-component {
  border: 3px solid #28a745;
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  background: linear-gradient(
    45deg,
    rgba(40, 167, 69, 0.1),
    rgba(40, 167, 69, 0.05)
  );
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.2);
}

.extra-header {
  font-weight: bold;
  color: #28a745;
  font-size: 1.2rem;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.extra-content {
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
}
`);
    });
    const extraComponent = document.createElement("div");
    extraComponent.className = "extra-component";
    extraComponent.innerHTML = `
    <div class="extra-header">额外组件</div>
    <div class="extra-content">这个组件使用了动态加载的额外样式。</div>
  `;
    container.appendChild(extraComponent);
    loadMoreBtn.textContent = "更多样式已加载";
    loadMoreBtn.disabled = true;
  };
  buttonContainer.appendChild(loadStyleBtn);
  buttonContainer.appendChild(loadMoreBtn);
  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(buttonContainer);
  document.body.appendChild(container);
  console.log("CSS按需加载测试页面已加载");

})();