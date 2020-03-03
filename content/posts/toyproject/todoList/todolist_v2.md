---
title: TodoList with ReactJS (ver.Function)
date: "2020-01-12"
template: "post"
draft: false
slug: "/posts/toyproject/todo_function"
category: "ToyProject"
tags:
  - "ClassComponent"
  - "Todo"
description: "Class를 이용하여 Todolist를 작업해보았습니다."
---
<span class="notice">
  <em>Function Component로 작업한 버전의 Todo list입니다.</em>
</span>

![todo_v2](/images/project/todo_v2.gif "todo_v2")

**구현기능**
1. 할일 추가/삭제
2. 할일 전체 삭제
3. 완료한일 삭제
4. 해야할일/완료한일 개수 체크
5. 카테고리별 노출

<br>

**디렉토리 구조**

![todo_v2_directory](/images/project/todo_v2_directory.jpg "todo_v2_directory")

<br>

App.js를 제외한 모든 컴포넌트는 [Class Component로 만든 Todolist와 내용](/posts/toyproject/todo_class)이 비슷하다. 그러므로 App.js에서의 차이점을 분석해보자.

<b>App.js</b>

``` jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateInput from './components/Inputs/CreateInput';
import TodoWrapper from './components/Todolist';
import Todo from './components/Todolist/Todo';
import Tab from './components/Tab';
import TabList from './components/Tab/TabList';

import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  const [categories, setCategories] = useState([
    { id: 'all', open: true },
    { id: 'active', open: false },
    { id: 'done', open: false },
  ]);

  useEffect(() => {
    setTodos([
      { id: 1, content: 'HTML', done: false },
      { id: 2, content: 'CSS', done: true },
      { id: 3, content: 'Javascript', done: false },
    ]);

    setCategories([
      { id: 'all', open: true },
      { id: 'active', open: false },
      { id: 'done', open: false },
    ]);
  }, []);

  // Todo 렌더링 함수
  const renderTodo = (todos, categories) => {
    const [{ id: currentCategory }] = categories.filter(category => category.open === true);

    let _todos = todos;

    if (currentCategory === 'active') _todos = todos.filter(todo => todo.done === false);
    if (currentCategory === 'done') _todos = todos.filter(todo => todo.done === true);

    return _todos.map(todo => (
      <Todo key={todo.id} todo={todo} onRemoveTodo={removeTodo} onToggleDone={toggleDone} />
    ));
  };

  // Todo 생성시 ID 생성기능
  const createId = () => {
    return Math.max(0, ...todos.map(todo => todo.id)) + 1;
  };

  // Todo 생성기능
  const addTodo = ({ key, target, target: { value } }) => {
    const content = value.trim();

    if (key !== 'Enter' || content === '') return;

    setTodos([...todos, { id: createId(), content, done: false }]);

    target.value = '';
  };

  // Todo 삭제기능
  const removeTodo = id => {
    setTodos([...todos].filter(todo => todo.id !== id));
  };

  // Todo 완료/미완료 체크 기능
  const toggleDone = id => {
    setTodos([...todos.map(todo => (todo.id === id ? { ...todo, id, done: !todo.done } : todo))]);
  };

  // 전체 완료 기능
  const allDone = e => {
    setTodos([...todos.map(todo => ({ ...todo, done: e.target.checked }))]);
  };

  // 완료한 Todo 삭제기능
  const clearDone = () => {
    setTodos([...todos.filter(todo => todo.done !== true)]);
  };

  // 카테고리 탭 기능
  const changeCategory = id => {
    setCategories([
      ...categories.map(category =>
        category.id === id ? { ...category, open: true } : { ...category, open: false },
      ),
    ]);
  };

  // 미완료/완료된 Todo 개수 체크 및 렌더링 함수
  const doneLength = (() => todos.filter(todo => todo.done === true).length)();
  const activeLength = (() => todos.filter(todo => todo.done === false).length)();

  return (
    <div className="container">
      <Header>
        <CreateInput onAddTodo={addTodo} />
      </Header>
      <Tab>
        {categories.map(category => (
          <TabList key={category.id} category={category} onChangeCategory={changeCategory} />
        ))}
      </Tab>
      <TodoWrapper>{renderTodo(todos, categories)}</TodoWrapper>
      <Footer
        onAllDone={allDone}
        onClearDone={clearDone}
        onDoneLength={doneLength}
        onActiveLength={activeLength}
      />
    </div>
  );
};

export default App;
```

일단 Class Component에서는 constructor에 this.state를 이용하여 상태를 넣어주었는데, functional Component에서는 state가 따로 없어 useState라는 Hook함수를 이용했다. 그리고 라이프사이클 메소드가 따로 없어 useEffect을 이용하였다. class Component와 다른 점은 Hook을 이용한다는 점과 this binding을 따로 안해줘도 되서 불편함이 줄었다. 그리고 코드 길이도 줄어 좀 더 직관적으로 표현이 가능해졌다.

## 느낀점
하지만 기능을 prop로 전달해줘야되는 점에 나는 클래스형 컴포넌트와의 별 반 차이를 별로 못 느꼇다. 함수형 컴포넌트를 사용한다는 의미는 컴포넌트 기능별로 구현할 수 있다라는거라 생각했는데, App.js에서 기능을 다 정의하고, props로 전달해주는 것에 불편함을 느꼇다. 이 점은 이후 ContextAPI 나 Redux를 활용해서 디벨롭을 해봐야겠다.


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