import React from "react";
import { Button, Popconfirm, Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, remove } from "../services/todo";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
type ITodos = {
  id: string;
  title: string;
  completed: boolean;
};
const TodoList = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getAll,
  });

  const mutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Xóa thành công")
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (
        <span>{completed ? "✅ Done" : "❌ Pending"}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (todo: ITodos) => {
        return (
          <>
            <Link to={`/edit/${todo.id}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                handleDelete(todo.id);
              }}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ]
  return (
    <>
      <Table dataSource={query.data} columns={columns} rowKey="id" />
    </>
  )
};

export default TodoList;
