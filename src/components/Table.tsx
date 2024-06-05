import axios from "axios";
import React, { Fragment, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Data } from "../types/Data";
import { useDeletePost } from "@/hooks/useDeletePost";
import { FaPen } from "react-icons/fa";

const path = import.meta.env.VITE_API;

const Table: React.FC = () => {
  // const [post, setPost] = useState<Data[]>([]);

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
      loading: "Loading...",
      success: () => {
        if (rowsRef.current[index]) {
          rowsRef.current[index]!.remove();
        }
        return `Delete success Id: ${id}`;
      },
      error: "Error",
    });
  };

  if (isLoading || isFetching) return "Loading...";
  if (error) return "An error has occurred: " + (error as Error).message;

  return (
    <Fragment>
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
                    <FaPen />
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
