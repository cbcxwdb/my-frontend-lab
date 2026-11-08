// render.js —— 只负责"画"
// 注意：这个文件里不能用 box、todos、filter 这些变量
// 因为它不知道它们是谁，必须通过参数传进来

export function renderList(container, items, filter, onItemClick, onDelete) {
  container.replaceChildren();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (filter === 'todo' && item.done) continue;
    if (filter === 'done' && !item.done) continue;

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = item.title;
    if (item.done) li.classList.add('done');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      onDelete(item);
    })
    li.appendChild(delBtn);
    li.appendChild(span);

    li.addEventListener('click', function () {
      onItemClick(item);
    });
    container.appendChild(li);
  }
}