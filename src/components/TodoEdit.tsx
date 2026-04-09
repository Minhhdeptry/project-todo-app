import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Button, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getById, update } from "../services/todo";
import toast from "react-hot-toast";
import { useEffect } from "react";
export type ITodoForm = {
  title: string;
  completed: boolean;
};
const TodoEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const query = useQuery({
    queryKey: ["todos", id],
    queryFn: () => getById(id!),
    enabled: !!id
  });
  console.log(query.data);

  useEffect(() => {
    if (!query?.data) return;
    form.setFieldsValue(query.data);
  }, [id, query.data]);

  const nav = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: Omit<ITodoForm, "id">) => update(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Cập nhật thành công")
      nav("/list");
    },
  });

  if (!id) return;
  const handleSubmit = (value: any) => {
    mutation.mutate(value);
  };
  return (
    <div>
      <Form
        form={form}
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TodoEdit;
