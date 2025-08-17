/// <reference types="vite/client" />

import './main.css';

console.log('CSS按需加载测试开始');

// 创建组件的函数
function createComponent() {
  const div = document.createElement('div');
  div.className = 'component-box';
  div.innerHTML = `
    <div class="component-header">动态组件</div>
    <div class="component-content">这是一个动态创建的组件，它的样式是按需加载的。</div>
  `;
  return div;
}

// 创建主容器
const container = document.createElement('div');
container.className = 'main-container';

const title = document.createElement('h1');
title.className = 'page-title';
title.textContent = 'CSS 按需加载功能测试';

const description = document.createElement('p');
description.className = 'description';
description.textContent =
  '此页面测试CSS文件的按需加载功能。点击按钮动态加载组件样式。';

const buttonContainer = document.createElement('div');
buttonContainer.className = 'button-container';

// 动态加载组件样式按钮
const loadStyleBtn = document.createElement('button');
loadStyleBtn.className = 'load-btn';
loadStyleBtn.textContent = '加载组件样式';

loadStyleBtn.onclick = async () => {
  // 动态导入组件样式
  await import('./component.css');

  const component = createComponent();
  container.appendChild(component);

  loadStyleBtn.textContent = '样式已加载';
  loadStyleBtn.disabled = true;
};

// 动态加载更多样式按钮
const loadMoreBtn = document.createElement('button');
loadMoreBtn.className = 'load-btn secondary';
loadMoreBtn.textContent = '加载更多样式';

loadMoreBtn.onclick = async () => {
  // 动态导入额外的样式
  await import('./dynamic.css');

  const extraComponent = document.createElement('div');
  extraComponent.className = 'extra-component';
  extraComponent.innerHTML = `
    <div class="extra-header">额外组件</div>
    <div class="extra-content">这个组件使用了动态加载的额外样式。</div>
  `;

  container.appendChild(extraComponent);

  loadMoreBtn.textContent = '更多样式已加载';
  loadMoreBtn.disabled = true;
};

buttonContainer.appendChild(loadStyleBtn);
buttonContainer.appendChild(loadMoreBtn);

container.appendChild(title);
container.appendChild(description);
container.appendChild(buttonContainer);

document.body.appendChild(container);

console.log('CSS按需加载测试页面已加载');
