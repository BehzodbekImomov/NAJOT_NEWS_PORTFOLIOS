import { Button, message, Modal, Pagination, Table } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsersAction, fetchUsers } from "../../redux/actions/userActions";
import { Fragment, useState } from "react";
import { PER_PAGE } from "../../constants";

const { confirm } = Modal;

const UsersP = () => {
  const columns = [
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
    },

    {
      title: "User name",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Actions",
      render: ({ _id }) => (
        <Fragment>
          <Button type="primary" danger onClick={() => deleteUsers(_id)}>
            Delete
          </Button>
        </Fragment>
      ),
    },
  ];
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { users, totalUser, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  function deleteUsers(id) {
    confirm({
      title: "Do you want to delete this category?",
      icon: <ExclamationCircleFilled />,
      onOk: async () => {
        dispatch(deleteUsersAction(id));
        message.success("Deleted successfully !");
      },
    });
  }

  return (
    <div>
      {loading ? (
        "...Loading"
      ) : (
        <>
          <Table
            pagination={false}
            title={() => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Total: {totalUser}</h1>
              </div>
            )}
            dataSource={users}
            columns={columns}
          />
          <Pagination
            pageSize={PER_PAGE}
            current={page}
            onChange={(page) => setPage(page)}
            total={totalUser}
          />
        </>
      )}
    </div>
  );
};

export default UsersP;
