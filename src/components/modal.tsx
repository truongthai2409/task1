// import { Toaster, toast } from "sonner";

// const [isModalOpen, setIsModalOpen] = useState(false);
// const [modalData, setModalData] = useState<Data>({
//   userId: 0,
//   id: 0,
//   title: "",
//   body: "",
// });

// const showModal = (
//   userId: number,
//   id: number,
//   title: string,
//   body: string
// ): void => {
//   setModalData({ userId, id, title, body });
//   setIsModalOpen(true);
// };

// const handleOk = () => {
//   // update in here
//   toast.success("Updated");
//   setIsModalOpen(false);
// };

// const handleCancel = () => {
//   setIsModalOpen(false);
// };

// const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);
// const { mutateAsync: deletePost } = useDeletePost();

// const handleDelete = (id: number, index: number) => {
//   toast.promise(deletePost(id), {
//     loading: "Deleting ...",
//     success: () => {
//       if (rowsRef.current[index]) {
//         rowsRef.current[index]!.remove();
//       }
//       return `Delete success Id: ${id}`;
//     },
//     error: "Error",
//   });
// };
// const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//   const { name, value } = e.target;
//   setModalData((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
// };

 


// modal

{
  /* 
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
                    <FaPen
                      onClick={() =>
                        showModal(item.userId, item.id, item.title, item.body)
                      }
                    />
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
      </div> */
}

//   <MdOutlineDeleteOutline className="text-lg text-red-600 cursor-pointer" />

// table
{/* <Table
  className="ant-table-pagination ant-table-pagination-right"
  columns={columns}
  dataSource={posts}
  onRow={(record, rowIndex) => {
    return {
      onClick: (event) => {
        console.log(event);
        console.log({ record, rowIndex });
      },
    };
  }}
/>; */}
