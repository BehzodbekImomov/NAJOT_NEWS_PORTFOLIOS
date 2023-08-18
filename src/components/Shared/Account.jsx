import { Col, Form, Input, message, Row, Tabs, Upload, Button } from "antd";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { request } from "../../server/Request";
import { IMG_URL } from "../../constants";
import Loading from "../Loading";
import { setAuthCookies } from "../../utils/setAuthCookies";
import { AuthContex } from "../../context/AuthContex";
const { useForm } = Form;
const { TextArea } = Input;

const Account = () => {
  let items = [
    {
      label: "Information",
      key: "info",
      children: <Information />,
    },
    {
      label: "Password",
      key: "pass",
      children: <Password />,
    },
  ];
  return (
    <Fragment>
      <Tabs defaultActiveKey="1" centered items={items} />
    </Fragment>
  );
};

const Information = () => {
  const {token}=useContext(AuthContex)
  const [form] = useForm();
  const [imgLoading, setImgLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
console.log(token);
  const getData = useCallback(() => {
    request("auth/me",{Authorization:`Bearer${token}`}).then(({ data }) => {
      form.setFieldsValue(data);
      setImageUrl(data.photo);
    });
  }, [form,token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = async (e) => {
    try {
      await request.delete(`auth/upload/${imageUrl}`);
      setImgLoading(true);
      let form = new FormData();
      form.append("file", e.file.originFileObj);
      await request.post("auth/upload", form);
      getData();
    } catch (err) {
      console.log(err.message);
    } finally {
      setImgLoading(false);
    }
  };

  const submit = async (values) => {
    try {
      setLoading(true);
      await request.put("auth/details", values);
      message.success("Edited successfully !");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Row>
      <Col lg={6}>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={IMG_URL + imageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            <div>
              {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          )}
        </Upload>
      </Col>
      <Col lg={16}>
        {loading ? (
          <Loading />
        ) : (
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={submit}
          >
            <Form.Item
              name="first_name"
              label="First name"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Last name"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="info"
              label="Info"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
                {
                  pattern: "",
                  message: "+998999400807",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Col>
    </Row>
  );
};

const Password = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const submit = async (values) => {
    try {
      setLoading(true);
      let { data } = await request.put("auth/password", values);
      setAuthCookies(data);
      message.success("Changed successfully !");
      form.resetFields();
    } catch (err) {
      message.error(err.response.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form form={form} layout="vertical" autoComplete="off" onFinish={submit}>
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[
          {
            required: true,
            message: "Please fill this field !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New password"
        rules={[
          {
            required: true,
            message: "Please fill this field !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType="submit" type="primary">
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Account;
