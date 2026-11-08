# 前端学习笔记

> 目标：AI 前端（桌面端 / Agent 方向）
> **记录规则：只记「变化」和「为什么」。完整代码放文件里，不抄进笔记。**
> 最后更新：2026-11-01

---

## 目录

1. [学习进度](#1-学习进度)
2. [错题本](#2-错题本)
3. [排查清单](#3-排查清单)
4. [待学清单](#4-待学清单)
5. [API 速查](#5-api-速查)
6. [每日记录](#6-每日记录)

---

## 1. 学习进度

| 日期 | 里程碑 | 对应文件 |
|---|---|---|
| 10/31 | DOM 渲染：能脱稿写 `renderList` | `02-render-list.html` |
| 10/31 | 变式：加序号 | `03-render-list-numbered.html` |
| 11/01 | 事件：点击高亮（多选 → 单选） | `05-events-single.html` |
| 11/01 | 造 4 个 bug 并归因 | `06-bug-lab.html` |

---

## 2. 错题本

### 2.1 语法类

**① 方法后面漏括号**

```js
container.replaceChildren;    // ❌ 不报错，但什么都不做
container.replaceChildren();  // ✅ 真正的清空
```

> 属性是名词：`li.textContent` ｜ 方法是动词：`replaceChildren()`

**② 清空的是容器，不是数据**

```js
list.replaceChildren()   // ❌ list 是数组，没有这个方法
box.replaceChildren()    // ✅ box 才是 DOM 元素
```

> 数据 = 原料筐，容器 = 盘子。擦盘子，不扔水果。

**③ 字符串里的空格**

```js
(i + 1) + '.' + items[i];    // ❌ 输出 1.HTML
(i + 1) + '. ' + items[i];   // ✅ 输出 1. HTML
```

> 这个错犯过两次。写完要**按字面核对**输出是否符合需求。

**④ 复制代码时漏段**

复制时只复制了 `<body>` 部分，漏掉 `<head>` 里的 `<style>`，导致"点击没反应"。
→ 预防：**复制整个文件**，不要复制代码片段。

### 2.2 逻辑类

**⑤ 数组越界**

```js
for (let i = 0; i <= items.length; i++)   // ❌
for (let i = 0; i < items.length; i++)    // ✅
```

> `length` 是 5，合法下标只有 0–4。`<=` 会取到 `items[5]` = `undefined`。
> **不报错**，只是多一项。真实场景：表格多一行空行、分页多一页空白、商品列表末尾多个 `undefined`。

**⑥ 忘记清空导致累积**

> 渲染的定义是"让界面等于数据"，不是"往界面里追加数据"。
> 不清空 → 每次调用都在后面追加 → 苹果、香蕉都留着。

**⑦ 事件名拼错 → 静默失败**

```js
'clik'      // ❌ 不报错，永远等不到
'keyDown'   // ❌ 正确是 'keydown'
'dbclick'   // ❌ 正确是 'dblclick'
```

> 事件名只是字符串，浏览器不认识就不触发，**不会提示你拼错**。

**⑧ `forEach` 里的操作会执行 N 次**

```js
all.forEach(function (x) {
  x.classList.add('active');     // ❌ 给全部 3 个都加 → 全黄且取消不掉
  x.classList.remove('active');  // ✅ 全部清掉（这才是"清场"）
});
```

> `forEach` 遍历所有元素，里面写什么就乘以 N。
> **`remove` 和 `add` 不是简单的反义词替换**：在 `forEach` 里，一个清全场，一个染全场。

**⑨ 方法相同，作用对象不同，效果不同**

```js
x.classList.add('active');    // 循环里的每一个
li.classList.add('active');   // 只有当前这一个
```

### 2.3 安全类

**⑩ `innerHTML` 会执行代码（XSS）**

```js
li.textContent = '<b>加粗</b>';                   // 显示字符 <b>加粗</b>
li.innerHTML   = '<b>加粗</b>';                   // 真的变粗体
li.innerHTML   = '<img src=x onerror=alert(1)>';  // 弹出窗口！
```

> 原理：`innerHTML` 把"数据"当成"代码"解析执行。
> **原则：默认用 `textContent`**，只有确定内容安全且确实需要富文本时才用 `innerHTML`。
> **不可信来源**：用户输入、接口返回、**AI 模型输出**（提示词注入可以让模型吐出恶意 HTML）。

---

## 3. 排查清单

### 3.1 「点击没反应」怎么查

```
① Console 有红字吗？
   ├─ 有 → 看行号（先排除 favicon.ico 404 这类噪音）
   └─ 没有 → 往下
② Elements 里 class 变了吗？
   ├─ 变了 → 逻辑对，是 CSS 问题
   └─ 没变 → 往下
③ 事件名拼对了吗？
④ 我编辑的文件和浏览器加载的是同一个吗？
```

### 3.2 Console 红字分两类

| 类型 | 例子 | 要不要管 |
|---|---|---|
| **真错误** | `ReferenceError: li is not defined` | 必须管 |
| **噪音** | `favicon.ico 404`、`Live reload enabled` | 永远无视 |

> 判断法：有没有 `Error`、有没有你那行代码的行号。

### 3.3 看循环代码的方法

在纸上写出来，别在脑子里想象：

```
第 1 轮：x = 第1项，做了什么 →
第 2 轮：x = 第2项，做了什么 →
第 3 轮：x = 第3项，做了什么 →
```

---

## 4. 待学清单

- [ ] **异步**：Promise / `await` / `fetch` —— 为什么 `fetch` 要 `await`
- [ ] **`var` vs `let`**：函数作用域 vs 块级作用域
      线索：事件回调里能用 `li`，因为循环里用 `let` 每轮新建；换成 `var` 会全部指向最后一个
- [ ] **`querySelectorAll` 与 `querySelector` 的区别**（全部 vs 第一个）
- [ ] **匿名函数 / 箭头函数**（`function () {}` vs `() => {}`）
- [ ] **`add` / `remove` / `toggle`** 的完整语义
- [ ] **CSS 系统学习**：盒模型、选择器优先级、flex 布局

---

## 5. API 速查

### 通用的
|`() => {} `|叫箭头函数，是 function () {} 的简写。没有参数时写 ()，一个参数可以省略括号。

### DOM 渲染

| API | 作用 |
|---|---|
| `document.querySelector('#id')` | 找第一个匹配元素 |
| `document.querySelectorAll('li')` | 找全部（类数组，自带 `forEach`） |
| `document.createElement('li')` | 造元素（还在内存里，页面看不见） |
| `el.textContent = '文字'` | 设置纯文本 |
| `parent.appendChild(child)` | 挂到父节点（这一刻才显示） |
| `parent.replaceChildren()` | 清空所有子节点 |

### 事件

| API | 作用 |
|---|---|
| `el.addEventListener('click', 函数)` | 添加事件监听 |
| `el.classList.add('x')` | 加 class |
| `el.classList.remove('x')` | 删 class |
| `el.classList.toggle('x')` | 切换（有就删，没有就加） |

### 异步

| API | 作用 |
|---|---|
| `fetch(url)` | 发请求，返回 Promise（**不是数据**） |
| `res.json()` | 把响应体解析成 JS 对象，**也返回 Promise**（所以要第二个 await） |
| `await` | 等 Promise 完成再往下走；只能写在 `async` 函数里 |
| `async function` | 声明可写 await 的函数，它自己也返回 Promise |
| `try { } catch (err) { }` | 接住 await 的失败，避免页面永远卡在"加载中" |
| `new Promise(r => setTimeout(r, ms))` | 伪造延时，用来观察"加载中"的过程 |

**要点**
- `fetch` 返回的是「取餐号」，不是奶茶
- **两个 await 缺一不可**：漏第一个会报错；漏第二个**不报错但结果是 undefined**
- `await` 暂停的是**这个函数**，不是整个页面
- async 函数里的错误会变成「Promise 被拒绝」，报错显示为 `Uncaught (in promise)`
- 加 `try/catch` 后，**代码写错也会被 catch 住**，显示成"加载失败"——别被误导，要看 catch 里的 `err`

---

## 6. 每日记录

### 2026-10-31 · DOM 渲染

**完成**：`renderList` 脱稿写（4 分钟）；变式加序号 `(i + 1) + '. ' + items[i]`

**4 个 bug 实验**

| 改了什么 | 结果 | 原因 |
|---|---|---|
| `<script>` 移到 `<head>` | `Cannot read properties of null (reading 'replaceChildren')` | 浏览器从上往下解析，执行到 `<head>` 时 `<body>` 还没解析 |
| 删掉 `replaceChildren()` | 不报错，但内容不清空，每次都在旧内容后追加 | 渲染 = 让界面等于数据，不是追加 |
| `<` 改 `<=` | 多一项 `undefined` | `length` 是 5，合法下标只有 0–4 |
| `textContent` 改 `innerHTML` | 数据里的 HTML 被执行 | 数据变成了代码（XSS） |

### 2026-11-01 · 事件（点击高亮）

**完成**：点击变黄 → 单选高亮（同一时刻只有一项）

**多选 → 单选，只多了 4 行**

```js
// 多选版：只管切换自己
li.addEventListener('click', function () {
  li.classList.toggle('active');
});

// 单选版：多一步"清场"
li.addEventListener('click', function () {
  const all = container.querySelectorAll('li');
  all.forEach(function (x) {
    x.classList.remove('active');   // ① 先全部清掉
  });
  li.classList.add('active');        // ② 再设置自己
});
```

**本质区别**：多选只管"切换自己"；单选多了"清场"——先收走所有黄牌，再给自己发一张。

**少任何一步都不行**：
- 只做 ② → 多选
- 只做 ① → 什么都选不上
- ① 里 `remove` 写成 `add` → 全部染黄且无法取消

**这个模式用在哪**：下拉菜单、Tab 切换、轮播图指示点、单选按钮组 —— 凡"同一时刻只能有一个选中"的地方。

**4 个 bug 实验**

| 改了什么 | 我预测 | 实际 | 原因 |
|---|---|---|---|
| 删掉整段 `<style>` | 点击无反应 | 如预期 | JS 正常，class 也加上了，只是没有 CSS 规则 |
| `'click'` → `'clik'` | 会报错 | **无报错**，点击无反应 | 事件名只是字符串，浏览器不认识就不触发 |
| `remove` → `add` | 只会变黄，可点多个 | **点任意一行全部变黄，且无法取消** | `forEach` 给每个 li 都 `add`，一次点击染全场；没有 `remove`/`toggle` 所以取消不掉 |
| 注释掉"清场"整段 | 不会再有取消，点哪个亮哪个 | 如预期 | 那 4 行的作用就是"清场" |

**今日最大收获**：`remove` → `add` 那题预测错了。原因是**没有在脑子里执行 `forEach`**——`forEach` 里的操作会对每个元素执行，效果要乘以 N。

## Phase A 复盘（2026.10.12 – 11.08）

### 原计划 vs 实际

| 计划任务 | 状态 | 说明 |
|---|---|---|
| HTML 基础 | ✅ | |
| CSS 基础 | ⚠️ | 盒模型/flex/优先级会了，但布局还不够熟 |
| JS 语法 | ✅ | |
| Git + GitHub | ✅ | 5 次提交，Pages 上线 |
| 静态页面部署 | ✅ | 手机可访问 |
| （超出计划）DOM 渲染 | ✅ | 提前 2 周 |
| （超出计划）事件 | ✅ | 提前 2 周 |
| （超出计划）异步 fetch | ✅ | 提前 3 周 |
| （超出计划）状态管理雏形 | ✅ | 待办筛选 |

### 我真正会的（不看参考能写出来）
- HTML基础知识
- css部分基础知识
- js语法
- Git + Github
- 静态页面部署
- DOM渲染
- 事件
### 我还不确定的（诚实写，别美化）
- 异步 fetch，大体明白用法，知道语法，但不能不看提示纯手打
- 状态管理雏形 能理解并根据提示基本做出，但出错地方多，且不能完整手打做出
- CSS语句还有许多是仅了解，不熟练
### 我踩过的坑（数一数错题本有几条）
- 有非常多的错题
- 其中最高频的是：经常漏括号和打错固定用法的单词
### Phase B 的目标（11/09 – 12/06）

- [ ] ES Module（今天开始）
- [ ] TypeScript 入门
- [ ] Node.js 基础
- [ ] 用 TS 写一个小工具