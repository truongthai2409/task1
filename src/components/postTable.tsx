import { Toaster, toast } from "sonner";
import { Data } from "../types/Data";
import type { TableProps } from "antd";
import { useDeletePost } from "@/hooks/useDeletePost";
import usePost from "@/hooks/usePost";
import { AxiosResponse } from "axios";
import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { useUpdatePost } from "@/hooks/useUpdatePost";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  record: Data;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  // index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          key={record.id}
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const PostTable: React.FC = () => {
  const { isLoading, data: posts } = usePost();
  const { mutateAsync: deletePost } = useDeletePost();
  const mutation = useUpdatePost();

  const [form] = Form.useForm();
  const [data, setData] = useState<Data[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Data>({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });

  useEffect(() => {
    if (posts) {
      const postsData = (posts as AxiosResponse<Data[]>).data;
      setData(postsData);
    }
  }, [posts]);

  if (isLoading) return "Loading...";

  const isEditing = (record: Data) => record.id === editingKey;

  const edit = (record: Partial<Data>) => {
    form.setFieldsValue({ userId: "", id: "", title: "", body: "", ...record });
    setEditingKey(record.id ?? null);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const handleSave = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Data;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData[index]);
        const data = newData[index];
        const id = index + 1;
        // mutation.mutate({id, data})
        toast.promise(mutation.mutateAsync({ id, data }), {
          loading: "Updating ...",
          success: () => {
            setData(newData);
            return `Update success`;
          },
          error: "Error",
        });
        setEditingKey(null);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(null);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (record: Data) => {
    toast.promise(deletePost(record.id), {
      loading: "Deleting ...",
      success: () => {
        const newData = data.filter((item) => item.id !== record.id);
        setData(newData);
        return `Delete success Id: ${record.id}`;
      },
      error: "Error",
    });
  };
 
  const showModal = (
    // userId: number,
    // id: number,
    // title: string,
    // body: string
  ): void => {
    // setModalData({ userId, id, title, body });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // update in here
    console.log(modalData)
    toast.success("Add success");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setModalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const columns = [
    {
      title: "UserID",
      dataIndex: "userId",
      key: "userId",
      editable: true,
      width: "5%",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      editable: false,
      width: "5%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      editable: true,
      width: "23%",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      editable: true,
      width: "50%",
    },
    {
      title: "Update",
      dataIndex: "update",
      key: "update",
      width: "7%",
      render: (_: string, record: Data) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => handleSave(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== null}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      width: "5%",
      render: (_: string, record: Data) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const mergedColumns: TableProps["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Data) => ({
        record,
        inputType:
          col.dataIndex === "id" || col.dataIndex === "userId"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Fragment>
      <Modal
        title="Update"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="text-[16px] ">
          <div className="">
            <label htmlFor="userId">UserId</label>
            <input
              className="block w-full pl-2 border rounded-lg outline-none h-9"
              name="userId"
              type="text"
              value={modalData.userId}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full pl-2 border rounded-lg outline-none h-9"
              name="title"
              type="text"
              value={modalData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="body">Body</label>
            <input
              className="block w-full pl-2 border rounded-lg outline-none h-9"
              name="body"
              type="text"
              value={modalData.body}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
      <Toaster />
      <Form form={form} component={false}>
        <Button type="primary" style={{ margin: 16 }} onClick={showModal}>
          Add a row
        </Button>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            position: ["bottomCenter"],
          }}
          rowKey="id"
        />
      </Form>
    </Fragment>
  );
};

export default PostTable;
