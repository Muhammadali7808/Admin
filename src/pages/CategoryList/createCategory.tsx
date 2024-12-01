import React from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { RcFile } from "antd/es/upload/interface";
import { usePostCategory } from "./service/mutate/usePostCategory";
import { useCatalogGet } from "./service/mutate/useCatalogGet";
import { useParams } from "react-router-dom";
import { useCatalogGetId } from "./service/mutate/useCatalogGetId";
export const CreateCategory: React.FC = () => {
  const [form] = Form.useForm();
  const { mutate } = usePostCategory();
  const { refetch } = useCatalogGet();
  const paramis = useParams();
  const { data, isLoading, isError, error } = useCatalogGetId(paramis?.id);
  console.log(data);
  
  const handleFinish = (values: { title: string; image: { file: RcFile } }) => {
    const formData = new FormData();
    formData.append("title", values.title);

    if (values.image) {
      formData.append("image", values.image.file);
    }

    mutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully!");
        form.resetFields();
        refetch();
      },
      onError: () => {
        message.error("Failed to add category!");
      },
    });
  };
  if(isLoading) return <p>Loading...</p>
  return (
    <Form
    initialValues={data}
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input value={data?.title} placeholder="Enter category title"  />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        valuePropName="file"
        rules={[{ required: true, message: "Please upload an image!" }]}
      >
        <Upload
          beforeUpload={() => false} 
          accept="image"
          maxCount={1}
        >
          <Button>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Add Category
        </Button>
      </Form.Item>
    </Form>
  );
};
