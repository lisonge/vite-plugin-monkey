// ==UserScript==
// @name         CSS PostCSS Test
// @namespace    npm/vite-plugin-monkey
// @version      0.0.0
// @description  Test CSS processing with PostCSS
// @icon         https://vitejs.dev/logo.svg
// @match        https://example.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  (function() {
    (n=>{if(typeof GM_addStyle=="function"){GM_addStyle(n);return}const e=document.createElement("style");e.textContent=n,document.head.append(e);})(`.container{
  max-width:1200px;
  margin:0 auto;
  padding:20px;
}

.container .header{
    background:linear-gradient(45deg, #ff6b6b, #4ecdc4);
    padding:20px;
    border-radius:8px;
  }

.container .header h1{
      color:white;
      margin:0;
      font-size:2rem;
    }

.container .header h1:hover{
        transform:scale(1.05);
        transition:transform 0.3s ease;
      }

.container .content{
    margin-top:20px;
    display:flex;
    flex-direction:column;
    gap:15px;
  }

.container .content .card{
      background:white;
      border:1px solid #ddd;
      border-radius:6px;
      padding:15px;
      box-shadow:0 2px 4px rgba(0, 0, 0, 0.1);
    }

.container .content .card:hover{
        box-shadow:0 4px 8px rgba(0, 0, 0, 0.15);
        transform:translateY(-2px);
        transition:all 0.3s ease;
      }

.container .content .card h3{
        margin-top:0;
        color:#333;
      }

.container .content .card p{
        line-height:1.6;
        color:#666;
      }
`);})();
  console.log("PostCSS测试开始");
  const container = document.createElement("div");
  container.className = "container";
  const header = document.createElement("div");
  header.className = "header";
  const title = document.createElement("h1");
  title.textContent = "PostCSS 处理测试";
  header.appendChild(title);
  const content = document.createElement("div");
  content.className = "content";
  const card1 = document.createElement("div");
  card1.className = "card";
  card1.innerHTML = `
  <h3>测试卡片 1</h3>
  <p>这个样式经过了 PostCSS 处理，包括嵌套语法展开和自动前缀添加。</p>
`;
  const card2 = document.createElement("div");
  card2.className = "card";
  card2.innerHTML = `
  <h3>测试卡片 2</h3>
  <p>hover 效果使用了 transform 和 transition，应该有相应的浏览器前缀。</p>
`;
  const loadComponentBtn = document.createElement("button");
  loadComponentBtn.textContent = "加载组件样式";
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
    await Promise.resolve().then(() => {
      ((n) => {
        if (typeof GM_addStyle == "function") {
          GM_addStyle(n);
          return;
        }
        const o = document.createElement("style");
        o.textContent = n, document.head.append(o);
      })(`.component{
  border:2px solid #007bff;
  border-radius:8px;
  padding:16px;
  margin:12px 0;
}
.component .title{
    font-size:1.2rem;
    font-weight:bold;
    margin-bottom:8px;
  }
.component .title.primary{
      color:#007bff;
    }
.component .title.secondary{
      color:#6c757d;
    }
.component .description{
    line-height:1.5;
  }
.component .description p{
      margin:8px 0;
    }
.component .description p:first-child{
        margin-top:0;
      }
.component .description p:last-child{
        margin-bottom:0;
      }
.component:hover{
    transform:scale(1.02);
    transition:transform 0.2s ease-in-out;
    box-shadow:0 4px 12px rgba(0, 123, 255, 0.3);
  }
`);
    });
    const component = document.createElement("div");
    component.className = "component";
    component.innerHTML = `
    <div class="title primary">主要组件标题</div>
    <div class="description">
      <p>这是一个测试组件，它的样式通过按需加载的方式注入。</p>
      <p>样式经过了 PostCSS 处理，包括嵌套语法和自动前缀。</p>
    </div>
  `;
    content.appendChild(component);
    loadComponentBtn.textContent = "组件样式已加载";
    loadComponentBtn.disabled = true;
  };
  content.appendChild(card1);
  content.appendChild(card2);
  content.appendChild(loadComponentBtn);
  container.appendChild(header);
  container.appendChild(content);
  document.body.appendChild(container);
  console.log("PostCSS测试页面已加载");

})();