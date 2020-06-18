import React from "react";
import { Input, Select, DatePicker } from "antd";
import { Moment } from "moment";
import { userList } from "../utils/data";

const { Option } = Select;

enum UserId {
  one = 't001',
  two = 't002',
  three = 't003'
}
export interface TodoValue {
  userid?: UserId,
  content?: string,
  date?: string
}

interface TodoInputProps {
  value?: TodoValue,
  onChange?: (value: TodoValue) => void
}
interface TodoInputState {
  userid: UserId,
  content: string,
  date: string
}

class TodoInput extends React.Component<TodoInputProps, TodoInputState> {
  state = {
    userid: UserId.one,
    content: "",
    date: ""
  };

  private triggerChange = (changedValue: TodoValue) => {
    const { content, userid, date } = this.state;
    const { value, onChange } = this.props;

    if (onChange) {
      onChange({ content, userid, date, ...value, ...changedValue });
    }
  };

  private onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value = {} } = this.props;

    if (!("content" in value!)) {
      this.setState({
        content: e.target.value
      });
    }

    this.triggerChange({ content: e.target.value });
  };

  private onUserChange = (selectValue: UserId) => {
    const { value = {} } = this.props;

    if (!("user" in value!)) {
      this.setState({
        userid: selectValue
      });
    }

    this.triggerChange({ userid: selectValue });
  };

  private onDateOk = (date: Moment) => {
    const { value = {} } = this.props;
    if (!("date" in value!)) {
      this.setState({
        date: date.format("YYYY-MM-DD HH:mm")
      });
      console.log(date.format("YYYY-MM-DD HH:mm"))
    }

    this.triggerChange({ date: date.format("YYYY-MM-DD HH:mm") });
  };

  public render() {
    const { value } = this.props;
    const { content, userid } = this.state;
    return (
      <div className="todoInput">
        <Input
          type="text"
          placeholder="输入待办事项内容"
          value={value?.content || content}
          onChange={this.onContentChange}
        />
        <Select
          style={{ width: 80 }}
          size="small"
          defaultValue={UserId.one}
          value={value?.userid || userid}
          onChange={this.onUserChange}
        >
          {userList.map(user => (
            <Option value={user.id}>{user.name}</Option>
          ))}
        </Select>
        <DatePicker
          showTime
          size="small"
          onOk={this.onDateOk}
          style={{ marginLeft: "16px", marginRight: "16px" }}
        />
      </div>
    );
  }
}

export default TodoInput;
