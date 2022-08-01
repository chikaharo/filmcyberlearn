import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormDisabledDemo = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        disabled: componentDisabled,
      }}
      onValuesChange={onFormLayoutChange}
      disabled={componentDisabled}
    >
      <Form.Item label="Tên Phim">
        <Input />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input />
      </Form.Item>
      <Form.Item label="Mô Tả">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Ngày Khởi Chiếu">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Đang Chiếu" valuePropName="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Sắp Chiếu" valuePropName="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="hot">
        <Switch />
      </Form.Item>
      <Form.Item label="Số Sao">
        <InputNumber />
      </Form.Item>

      <Form.Item label="Upload" valuePropName="fileList">
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item>
    </Form>
  );
};

export default () => <FormDisabledDemo />;
