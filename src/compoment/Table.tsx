import { getData } from "./GetData";
import { Data } from "../../Data"

import React, { Fragment, useEffect, useState } from "react";

const Table: React.FC = () => {
  const [posts, setPosts] = useState<Data[]>([]);
    
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) { 
        setPosts(data);
      }
      console.log(posts);
    };

    fetchData();
  }, []);


  return (
    <Fragment>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-center text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <th>
                Body
              </th>
            </tr>
          </thead>
      
          <tbody>
            {posts.length > 0 && posts.map(item => (
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
