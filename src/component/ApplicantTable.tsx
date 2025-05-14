import { Button, Input, Modal, Select, Space, Table } from "antd";
import React, { useState } from "react";
import { Applicant } from "../features/form/formSlice";

interface ApplicantTableProp {
  applicants: Applicant[];
  onUpdateApplicant: (
    id: number,
    updatedApplicant: Omit<Applicant, "id">
  ) => void;
  onDeleteApplicant: (id: number) => void;
}

const techStackOptions = [
  { label: "Javascript", value: "javascript" },
  { label: "Typescript", value: "typescript" },
  { label: "Angular", value: "angular" },
  { label: "Vue", value: "vue" },
  { label: "Others", value: "others" },
];

const countryOptions = [
  { label: "India", value: "India" },
  { label: "US", value: "US" },
  { label: "Canada", value: "Canada" },
];

const ApplicantTable: React.FC<ApplicantTableProp> = ({
  applicants,
  onUpdateApplicant,
  onDeleteApplicant,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Omit<Applicant, "id">>({
    name: "",
    age: undefined,
    email: "",
    gender: "male",
    country: "",
    techStack: [],
    hobbies: "",
  });

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const handleEdit = (applicant: Applicant) => {
    setEditingId(applicant.id);
    setEditedData({
      name: applicant.name,
      age: applicant.age,
      email: applicant.email,
      gender: applicant.gender,
      country: applicant.country,
      techStack: applicant.techStack,
      hobbies: applicant.hobbies,
    });
  };
  const handleSave = (id: number) => {
    onUpdateApplicant(id, editedData);
    setEditingId(null);
  };
  const showDeleteConfirm = (id: number) => {
    setIdToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = (id: number) => {
    onDeleteApplicant(id);
    setEditingId(null);
    setDeleteModalVisible(false);
    setIdToDelete(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number | undefined = value;

    if (name === "age") {
      parsedValue = parseInt(value, 10) || undefined;
    }

    setEditedData((prev) => ({ ...prev, [name]: parsedValue }));
  };
  const handleGenderChange = (value: "male" | "female" | "other") => {
    setEditedData((prev) => ({ ...prev, gender: value }));
  };

  const handleCountryChange = (value: string) => {
    setEditedData((prev) => ({ ...prev, country: value }));
  };

  const handleTechStackChange = (values: string[]) => {
    setEditedData((prev) => ({ ...prev, techStack: values }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Applicant) =>
        editingId === record.id ? (
          <Input
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
          />
        ) : (
          text
        ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (age: number | undefined, record: Applicant) =>
        editingId === record.id ? (
          <Input
            name="age"
            type="number"
            value={editedData.age || ""}
            onChange={handleInputChange}
          />
        ) : age !== undefined ? (
          age
        ) : (
          "N/A"
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string, record: Applicant) =>
        editingId === record.id ? (
          <Input
            type="email"
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
            className="w-full"
          />
        ) : (
          text
        ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (country: string, record: Applicant) =>
        editingId === record.id ? (
          <Select
            value={editedData.country}
            onChange={handleCountryChange}
            className="w-full"
          >
            {countryOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        ) : (
          country
        ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string, record: Applicant) =>
        editingId === record.id ? (
          <Select
            onChange={handleGenderChange}
            defaultValue={editedData.gender}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        ) : (
          gender
        ),
    },
    {
      title: "Tech Stack",
      dataIndex: "techStack",
      key: "techStack",
      render: (techStack: string[], record: Applicant) =>
        editingId === record.id ? (
          <Select
            mode="multiple"
            value={editedData.techStack}
            onChange={handleTechStackChange}
            className="w-full"
          >
            {techStackOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        ) : (
          techStack.join(", ")
        ),
    },
    {
      title: "Hobbies",
      dataIndex: "hobbies",
      key: "hobbies",
      render: (text: string, record: Applicant) =>
        editingId === record.id ? (
          <Input.TextArea
            name="hobbies"
            value={editedData.hobbies}
            onChange={handleInputChange}
            className="w-full"
          />
        ) : (
          text
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Applicant) => {
        return (
          <Space className="space-x-2">
            {editingId === record.id ? (
              <>
                <Button onClick={() => handleSave(record.id)} title="Save">
                  Save
                </Button>
                <Button onClick={() => setEditingId(null)} title="Cancel">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => handleEdit(record)} title="Edit">
                Edit
              </Button>
            )}
            <Button title="Delete" onClick={() => showDeleteConfirm(record.id)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Applicants List</h2>
      {applicants.length === 0 ? (
        <p className="text-center text-gray-500">No applicants added yet.</p>
      ) : (
        <>
          <Table columns={columns} dataSource={applicants} rowKey="id" />
          <Modal
            title="Are you sure?"
            open={deleteModalVisible}
            onOk={() => {
              if (idToDelete !== null) {
                handleDelete(idToDelete);
              }
            }}
            onCancel={() => {
              setDeleteModalVisible(false);
              setIdToDelete(null);
            }}
          >
            <p>
              This action cannot be undone. This will permanently delete this
              applicant data.
            </p>
          </Modal>
        </>
      )}
    </div>
  );
};

export default React.memo(ApplicantTable);
