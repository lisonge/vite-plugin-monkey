/// <reference types="vite/client" />

import './main.css';

console.log('PostCSS测试开始');

// 创建测试页面
const container = document.createElement('div');
container.className = 'container';

const header = document.createElement('div');
header.className = 'header';

const title = document.createElement('h1');
title.textContent = 'PostCSS 处理测试';
header.appendChild(title);

const content = document.createElement('div');
content.className = 'content';

const card1 = document.createElement('div');
card1.className = 'card';
card1.innerHTML = `
  <h3>测试卡片 1</h3>
  <p>这个样式经过了 PostCSS 处理，包括嵌套语法展开和自动前缀添加。</p>
`;

const card2 = document.createElement('div');
card2.className = 'card';
card2.innerHTML = `
  <h3>测试卡片 2</h3>
  <p>hover 效果使用了 transform 和 transition，应该有相应的浏览器前缀。</p>
`;

// 动态加载按钮
const loadComponentBtn = document.createElement('button');
loadComponentBtn.textContent = '加载组件样式';
loadComponentBtn.style.cssText = `
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
`;

loadComponentBtn.onclick = async () => {
  // 动态导入CSS
  await import('./component.css');

  const component = document.createElement('div');
  component.className = 'component';
  component.innerHTML = `
    <div class="title primary">主要组件标题</div>
    <div class="description">
      <p>这是一个测试组件，它的样式通过按需加载的方式注入。</p>
      <p>样式经过了 PostCSS 处理，包括嵌套语法和自动前缀。</p>
    </div>
  `;

  content.appendChild(component);
  loadComponentBtn.textContent = '组件样式已加载';
  loadComponentBtn.disabled = true;
};

content.appendChild(card1);
content.appendChild(card2);
content.appendChild(loadComponentBtn);

container.appendChild(header);
container.appendChild(content);

document.body.appendChild(container);

console.log('PostCSS测试页面已加载');
