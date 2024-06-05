import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Data } from "../types/Data";
import { useDeletePost } from "@/hooks/useDeletePost";
import { FaPen } from "react-icons/fa";
import { Modal } from "antd";

const path = import.meta.env.VITE_API;

const Table: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Data>({ userId: 0, id: 0, title: '', body: '' });

  const showModal = (userId: number, id: number, title: string, body: string): void => {
    setModalData({ userId, id, title, body });
    console.log({ userId, id, title, body })
    setIsModalOpen(true);
  };

  const handleOk = () => {
    toast.success('Updated');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    isLoading,
    error,
    data: posts,
    isFetching,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await axios.get(path);
      return response.data;
    },
  });

  const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);
  const { mutateAsync: deletePost } = useDeletePost();

  const handleDelete = (id: number, index: number) => {
    toast.promise(deletePost(id), {
      loading: "Deleting ...",
      success: () => {
        if (rowsRef.current[index]) {
          rowsRef.current[index]!.remove();
        }
        return `Delete success Id: ${id}`;
      },
      error: "Error",
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setModalData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (isLoading || isFetching) return "Loading...";
  if (error) return "An error has occurred: " + (error as Error).message;

  return (
    <Fragment>
      <Modal title="Update" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="text-[16px] ">
          <div className="">
            <label htmlFor="userId">UserId</label>
            <input className="block w-full pl-2 border rounded-lg outline-none h-9" name="userId" type="text" value={modalData.userId} onChange={handleChange} />
          </div>
          <div className="mt-2">
            <label htmlFor="title">Title</label>
            <input className="block w-full pl-2 border rounded-lg outline-none h-9" name="title" type="text" value={modalData.title} onChange={handleChange} />
          </div>
          <div className="mt-2">
            <label htmlFor="body">Body</label>
            <input className="block w-full pl-2 border rounded-lg outline-none h-9" name="body" type="text" value={modalData.body} onChange={handleChange} />
          </div>
        </div>
      </Modal>
      <Toaster />
      <div className="relative overflow-x-auto">
        <table className="table w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                UserId
              </th>
              <th scope="col" className="px-6 py-4">
                Id
              </th>
              <th scope="col" className="px-6 py-4">
                Title
              </th>
              <th scope="col" className="px-6 py-4">
                Body
              </th>
              <th scope="col" className="px-6 py-4">
                Update
              </th>
              <th scope="col" className="px-6 py-4">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.map((item: Data, index: number) => (
                <tr key={item.id} ref={(el) => (rowsRef.current[index] = el)}>
                  <td className="px-6 py-4">{item.userId}</td>
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.body}</td>
                  <td className="px-6 py-4">
                    <FaPen onClick={() => showModal(item.userId, item.id, item.title, item.body)} />
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(item.id, index)}>
                      <MdOutlineDeleteOutline className="text-lg text-red-600 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table;
