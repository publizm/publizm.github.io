---
title: TodoList with ReactJS (ver.Class)
date: "2020-01-10"
template: "post"
draft: false
slug: "/posts/toyproject/todo_class"
category: "ToyProject"
tags:
  - "ClassComponent"
  - "Todo"
description: "Class를 이용하여 Todolist를 작업해보았습니다."
---
<span class="notice">
  <em>Class Component로 작업한 버전의 Todo list입니다.</em>
</span>

![todo_v1](/images/project/todo_v1.gif "todo_v1")

**구현기능**
1. 할일 추가/삭제
2. 할일 전체 삭제
3. 완료한일 삭제
4. 해야할일/완료한일 개수 체크
5. 카테고리별 노출

<br>

**디렉토리 구조**

![todo_v1_directory](/images/project/todo_v1_directory.jpg "todo_v1_directory")

<br>

<b>App.js</b>

``` jsx
import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TodosWrapper from './components/Todolist';
import Todo from './components/Todolist/Todo';
import Tab from './components/Tab';
import Tablist from './components/Tab/TabList';
import CreateInput from './components/Inputs/CreateInput';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      categories: [
        { id: 'all', open: true },
        { id: 'active', open: false },
        { id: 'done', open: false },
      ],
    };
  }

  componentDidMount() {
    this.setState({
      todos: [
        { id: 1, content: 'HTML', done: false },
        { id: 2, content: 'CSS', done: true },
        { id: 3, content: 'Javascript', done: false },
      ],
    });
  }

  // Todo 렌더링 함수
  renderTodo = (todos, categories) => {
    const [{ id: currentCategory }] = categories.filter(category => category.open === true);

    let _todos = todos;

    if (currentCategory === 'active') _todos = todos.filter(todo => todo.done === false);
    if (currentCategory === 'done') _todos = todos.filter(todo => todo.done === true);

    return _todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onRemoveTodo={this.removeTodo}
        onToggleDone={this.toggleDone}
      />
    ));
  };

  // Todo 생성시 ID 생성기능
  createId = () => {
    return Math.max(0, ...this.state.todos.map(todo => todo.id)) + 1;
  };

  // Todo 생성기능
  addTodo = ({ key, target, target: { value } }) => {
    if (key !== 'Enter' || value.trim() === '') return;

    this.setState({
      todos: [...this.state.todos, { id: this.createId(), content: value, done: false }],
    });

    target.value = '';
  };

  // Todo 삭제기능
  removeTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)],
    });
  };

  // Todo 완료/미완료 체크 기능
  toggleDone = id => {
    this.setState({
      todos: [
        ...this.state.todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
      ],
    });
  };

  // 전체 완료 기능
  allDone = e => {
    this.setState({
      todos: [
        ...this.state.todos.map(todo => ({
          ...todo,
          done: e.target.checked,
        })),
      ],
    });
  };

  // 완료한 Todo 삭제기능
  clearDone = () => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.done !== true)],
    });
  };

  // 카테고리 탭 기능
  changeCategory = id => {
    this.setState({
      categories: [
        ...this.state.categories.map(category =>
          category.id === id ? { ...category, open: true } : { ...category, open: false },
        ),
      ],
    });
  };

  render() {
    const { todos, categories } = this.state;
    return (
      <>
        <div className="container">
          {/* Header와 할일 추가 Input 영역 */}
          <Header>
            <CreateInput onAddTodo={this.addTodo} />
          </Header>

          {/* 할일 카테고리 탭 영역 */}
          <Tab>
            {this.state.categories.map(category => (
              <Tablist
                key={category.id}
                categoryInfo={category}
                onChangeCategory={this.changeCategory}
              />
            ))}
          </Tab>

          {/* 할일 리스트 영역 */}
          <TodosWrapper>{this.renderTodo(todos, categories)}</TodosWrapper>

          {/* 할일 푸터 영역 */}
          <Footer todos={todos} onAllDone={this.allDone} onClearDone={this.clearDone} />
        </div>
      </>
    );
  }
}
```

<br>

Header안에 CreateInput이 있는 이유는 Header안에 input을 넣어버리면 처음 App.js에서 Header안에 어떤 기능이 있는지 예측이 안되기 때문에 가독성을 위해서 input을 쓰임새 있게 쓰기 위해 컴포넌트화하여 구분시켰다.

<b>Component > Header > index.jsx</b>

``` jsx
import React from 'react';

export default function Header(props) {
  return (
    <header>
      <h1 className="title">Todos</h1>
      <div className="ver">1.0</div>
      {props.children}
    </header>
  );
}
```

<b>Component > Inputs > CreateInput.jsx</b>

``` jsx
import React from 'react';

export default function CreateInput({ onAddTodo }) {
  return (
    <input
      className="input-todo"
      placeholder="What needs to be done?"
      onKeyPress={onAddTodo}
      autoFocus
    />
  );
}
```

<br>

Tab 또한 Header와 같이 내부에 무엇이 존재하는지 표기하기 위해서 Tab 컴포넌트안에 list들을 정의하지 않고 따른 컴포넌트로 분리시켜 작업하였다.

<b>Component > Tab > index.jsx</b>

``` jsx
import React from 'react';

export default function Tab({ onChangeTab, children }) {
  return (
    <ul className="nav" onClick={onChangeTab}>
      {children}
    </ul>
  );
}
```

<b>Component > Tab > TabList.jsx</b>

``` jsx
import React from 'react';

export default function TabList({ categoryInfo, onChangeCategory }) {
  const { id, open } = categoryInfo;
  return (
    <li
      id={id}
      className={open ? 'active' : ''}
      onClick={() => onChangeCategory(id)}>
      {id.charAt(0).toUpperCase() + id.slice(1)}
    </li>
  );
}
```

<br>

Todo List 영역은 TodosWrapper라는 Component로 감싸주었다. 이 또한 코드 가독성을 위해서 만들었다.

<b>Component > Tab > TabList.jsx</b>

``` jsx
import React from 'react';

export default function TodosWrapper(props) {
  return <ul className="todos">{props.children}</ul>;
}
```

<b>Component > Tab > Todo.jsx</b>

``` jsx
import React from 'react';

export default function Todo({ todo: { id, content, done }, onRemoveTodo, onToggleDone }) {
  return (
    <li id={id} className="todo-item">
      <input
        className="custom-checkbox"
        type="checkbox"
        id={'ck-myId' + id}
        checked={done ? true : false}
        onChange={() => onToggleDone(id)}
      />
      <label htmlFor={'ck-myId' + id}>{content}</label>
      <i className="remove-todo far fa-times-circle" onClick={() => onRemoveTodo(id)}></i>
    </li>
  );
}
```

그리고 App.js에서 TodoWrapper를 보면 다음과 같이 되어있는데,

``` jsx
<TodosWrapper>{this.renderTodo(todos, categories)}</TodosWrapper>
```

renderTodo 메소드를 state인 todos와 categories를 인수로 넘겨준다.

renderTodo 메소드의 살펴보면

``` jsx
renderTodo = (todos, categories) => {
  const [{ id: currentCategory }] = categories.filter(category => category.open === true);

  let _todos = todos;

  if (currentCategory === 'active') _todos = todos.filter(todo => todo.done === false);
  if (currentCategory === 'done') _todos = todos.filter(todo => todo.done === true);

  return _todos.map(todo => (
    <Todo
      key={todo.id}
      todo={todo}
      onRemoveTodo={this.removeTodo}
      onToggleDone={this.toggleDone}
    />
  ));
};
```

state인 todos와 categories를 받아 tab에 active 상태를 체크하여 category별로 렌더링해주는 로직에 사용하였다.

<br>

마지막으로 푸터영역을 살펴보자

``` jsx
import React from 'react';

export default function Footer({ todos, onClearDone, onAllDone }) {
  return (
    <footer className="footer">
      <div className="complete-all">
        <input
          className="custom-checkbox"
          type="checkbox"
          id="ck-complete-all"
          onChange={onAllDone}
        />
        <label htmlFor="ck-complete-all">Mark all as done</label>
      </div>
      <div className="clear-completed">
        <button className="btn" onClick={onClearDone}>
          Clear Done (
          <span className="completed-todos">
            {todos.filter(todo => todo.done === true).length}
          </span>
          )
        </button>
        <strong className="active-todos">
          {todos.filter(todo => todo.done === false).length} items left
        </strong>
      </div>
    </footer>
  );
}
```


## 느낀점
생각 보다 간단했다. 하지만 내 스스로 코드를 줄인다고 줄였는데 막상 보니까 많이 길어보인다. 좀 더 효율적인 부분을 찾아야될 것 같다.

제일 고민이 많았던 부분은 바로 Category별로 렌더링해주는 부분이였다. 이부분은 수정을 여러번하였다. 처음에는 switch문으로 접근하여 구현했으나, 코드 길이가 너무 길어 한눈에 보기가 어려움이 있어 if문으로 바꾸었다.

그리고 현재의 활성화된 카테고리를 체크하는 상태값을 어떻게 처리해야할지에 대한 고민이 있었다. state로 구현하는데 있어서 값으로 현재의 활성화된 아이디 값만 받아 문자열을 교체하는 식으로 해볼까 했는데, tab list에 ui로 active class가 toggle로 동작이 되어야해서 e.target 식으로 DOM요소로 접근해야되는 점이 있엇다. 그래서 DOM을 직접적으로 사용하고 싶지 않아 각 category별로 id값과 open 여부를 상태로 저장하여 관리하는 쪽을 선택했다.


<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>