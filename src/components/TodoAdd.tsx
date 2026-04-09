import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { add } from "../services/todo";
import toast from "react-hot-toast";
export type ITodoForm = {
  title: string;
  completed: boolean;
};
const TodoAdd = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  // add
  const mutationAdd = useMutation({
    mutationFn: add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Thêm mới thành công");
      nav("/list");
    },
  });

  const handleSubmit = (value: any) => {
    mutationAdd.mutate(value)
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="completed"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select>
            <Select.Option value={true}>Done</Select.Option>
            <Select.Option value={false}>Pending</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TodoAdd;
