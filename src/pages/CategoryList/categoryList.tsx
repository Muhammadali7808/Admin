import React from "react";
import { Table, message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCatalogGet } from "./service/mutate/useCatalogGet";
import { useProductDelete } from "./service/mutate/usePutCategory";
interface Category {
  id: number;
  title: string;
  image: string;
  children: Category[];
}

export const CategoryList: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useCatalogGet();
  const navigate = useNavigate();
  const { mutate: deleteCategory, isLoading: isDeleting } = useProductDelete();

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load categories";
    message.error(errorMessage);
    return <p>{errorMessage}</p>;
  }
  // getCatalogId(navigate?.id)

  const handleDelete = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => {
        message.success("Category deleted successfully!");
        refetch();
      },
      onError: () => {
        message.error("Failed to delete category!");
      },
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? (
          <img src={image} alt="category" style={{ width: 50, height: 50 }} />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Children Count",
      dataIndex: "children",
      key: "children",
      render: (children: Category[] | undefined) =>
        children ? children.length : 0,
    },
    {
      title: "Edit",
      key: "actions",
      render: (record: Category) => (
        <Link to={`/app/create-category/${record.id}`}>
          <Button
            type="link"
            onClick={() => navigate(`/app/create-category/${record.id}`, { state: { category: record } })}
            style={{
              marginRight: 8,
              background: "green",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "400",
            }}
          >
            Edit
          </Button>
        </Link>
      ),
    },
    {
      title: "Delete",
      key: "actions",
      render: (record: Category) => {
        return (
          <Button
            style={{
              background: "red",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "400",
            }}
            type="link"
            danger
            onClick={() => handleDelete(record.id)}
            loading={isDeleting}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Button
        style={{ marginBottom: 16 }}
        type="primary"
        onClick={() => navigate("/app/create-categor0y")}
      >
        Create Category
      </Button>
      <Table<Category>
        columns={columns}
        dataSource={data?.results || []}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};
