import React, { useRef, useState } from "react";
import { Button, Typography, Form, Tabs, Avatar } from "antd";
import { EditOutlined } from '@ant-design/icons';
import TodoInput from "./component/TodoInput";
import TodoList, { MenuKey } from "./component/TodoList";

import { todoListData } from "./utils/data";


import './App.css';

const { Title } = Typography;
const { TabPane } = Tabs;

function App() {
  const ref = useRef(null);
  const [todoList, setTodoList] = useState(todoListData);

  const activeTodoList = todoList.filter(todo => !todo.isCompleted);
  const completedTodoList = todoList.filter(todo => todo.isCompleted);

  const callback = () => { };
  const onFinish = (values: any) => {
    const newTodo = { ...values.todo, isComleted: false };
    setTodoList(todoList.concat(newTodo));
  }

  const onClick = (todoId: string, key: MenuKey) => {
    if (key === "complete") {
      const newTodoList = todoList.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }

        return todo;
      });

      setTodoList(newTodoList);
    } else if (key === "delete") {
      const newTodoList = todoList.filter(todo => todo.id !== todoId);
      setTodoList(newTodoList);
    }
  };

  return (
    <div className="App" ref={ref}>
      <div className="container header">
        <Avatar icon={<EditOutlined />} style={{ backgroundColor: '#87d068' }} alt="" size={64} />
        <Title level={3}>Simple TodoList Demo</Title>
      </div>
      <div className="container">
        <Form onFinish={onFinish}>
          <Form.Item name="todo">
            <TodoInput />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="container">
        <Tabs onChange={callback} type="card">
          <TabPane tab="所有" key="1">
            <TodoList todoList={todoList} onClick={onClick} />
          </TabPane>
          <TabPane tab="进行中" key="2">
            <TodoList todoList={activeTodoList} onClick={onClick} />
          </TabPane>
          <TabPane tab="已完成" key="3">
            <TodoList todoList={completedTodoList} onClick={onClick} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
