import axios from "axios";
import React, { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { Data } from "../../Data";

// Hoặc định nghĩa Data trực tiếp trong file này
// interface Data {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

const Table: React.FC = () => {
  const { isLoading, error, data: posts, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return response.data;
    },
  });

  if (isLoading || isFetching) return 'Loading...';

  if (error) return 'An error has occurred: ' + (error as Error).message;

  return (
    <Fragment>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">UserId</th>
              <th scope="col" className="px-6 py-4">Id</th>
              <th scope="col" className="px-6 py-4">Title</th>
              <th>Body</th>
            </tr>
          </thead>

          <tbody>
            {posts && posts.map((item: Data) => (
              <tr key={item.id}>
                <td className="px-6 py-4">{item.userId}</td>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table;
