import { Button, Checkbox, Form, Input, Radio, Select } from "antd";
import React, { useState } from "react";
import { Applicant } from "../features/form/formSlice";

interface ApplicantFormProps {
  onApplicantAdded: (applicant: Applicant) => void;
}

const ApplicantForm: React.FC<ApplicantFormProps> = ({ onApplicantAdded }) => {
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Applicant>({
    id: 0,
    name: "",
    age: undefined,
    email: "",
    gender: "male",
    country: "",
    techStack: [],
    hobbies: "",
  });
  const [errors, setErrors] = useState<{ [key in keyof Applicant]?: string }>(
    {}
  );

  const nameRegex = /^[\sa-zA-Z]{2,}/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | HTMLInputElement
      | any
    >
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number | undefined = value;
    if (name === "age") {
      parsedValue = parseInt(value, 10) || undefined;
    }
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleGenderChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value as Applicant["gender"],
    }));
    setErrors((prevErrors) => ({ ...prevErrors, gender: undefined }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }));
    setErrors((prevErrors) => ({ ...prevErrors, country: undefined }));
  };

  const handleTechStackChange = (checkedValues: string[]) => {
    setFormData((prev) => ({ ...prev, techStack: checkedValues }));
    setErrors((prevErrors) => ({ ...prevErrors, techStack: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key in keyof Applicant]?: string } = {};
    let isValid = true;

    if (!formData.name.trim() || !nameRegex.test(formData.name)) {
      newErrors.name = "Name must be at least 2 characters.";
      isValid = false;
    }

    if (formData.age === undefined || formData.age < 18 || formData.age > 120) {
      newErrors.age = "Age must be a number between 18 and 120.";
      isValid = false;
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    if (!formData.hobbies.trim()) {
      newErrors.hobbies = "Hobbies are required.";
      isValid = false;
    }
    if (!formData.techStack || formData.techStack.length === 0) {
      newErrors.techStack = "At least one technology must be selected.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onFinish = () => {
    if (validateForm()) {
      const newApplicant: Applicant = {
        ...formData,
        id: 0,
      };

      form.resetFields();
      setFormData({
        id: 0,
        name: "",
        age: undefined,
        email: "",
        gender: "male",
        country: "",
        techStack: [],
        hobbies: "",
      });
      setErrors({});
      onApplicantAdded(newApplicant);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="form justify-content-center">
        {" "}
        <h2 className="text-2xl font-bold mb-4 text-center">
          Application Form
        </h2>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Name"
            name="name"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name}
          >
            <Input
              placeholder="Enter your name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            validateStatus={errors.age ? "error" : ""}
            help={errors.age}
          >
            <Input
              type="number"
              placeholder="Enter your age"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            validateStatus={errors.country ? "error" : ""}
            help={errors.country}
          >
            <Select
              placeholder="select country"
              allowClear
              onChange={handleCountryChange}
              value={formData.country}
            >
              <Select.Option value="India">India</Select.Option>
              <Select.Option value="US">US</Select.Option>
              <Select.Option value="Canada">Canada</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            validateStatus={errors.gender ? "error" : ""}
            help={errors.gender}
          >
            <Radio.Group
              defaultValue="male"
              onChange={handleGenderChange}
              value={formData.gender}
            >
              <div className="flex items-center space-x-2">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </div>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Tech Stack"
            name="techStack"
            validateStatus={errors.techStack ? "error" : ""}
            help={errors.techStack}
          >
            <Checkbox.Group
              onChange={handleTechStackChange}
              value={formData.techStack}
            >
              <div className="flex flex-col">
                <Checkbox value="javascript">JavaScript</Checkbox>
                <Checkbox value="typescript">TypeScript</Checkbox>
                <Checkbox value="react">React</Checkbox>
                <Checkbox value="angular">Angular</Checkbox>
                <Checkbox value="vue">Vue</Checkbox>
                <Checkbox value="other">Other</Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="Hobbies"
            name="hobbies"
            validateStatus={errors.hobbies ? "error" : ""}
            help={errors.hobbies}
          >
            <Input.TextArea
              placeholder="Enter your hobbies"
              name="hobbies"
              value={formData.hobbies || ""}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item className="formitem">
            <Button type="primary" htmlType="submit" className="button">
              Add Applicant
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ApplicantForm;
