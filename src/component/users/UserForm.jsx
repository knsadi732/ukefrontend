import React, { useState } from "react";
import {
  Upload,
  X,
  Edit2,
  Save,
  FileText,
  User,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
} from "lucide-react";

const UserForm = () => {
  const initialValue = {
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    fatherName: "",
    motherName: "",

    // Contact Information
    email: "",
    mobileNumber: "",
    alternateNumber: "",

    // Address Information
    currentAddress: "",
    permanentAddress: "",
    city: "",
    state: "",
    pincode: "",
    district: "",

    // Government IDs
    aadharNumber: "",
    panNumber: "",
    voterIdNumber: "",
    passportNumber: "",

    // Professional Information
    occupation: "",
    employerName: "",
    monthlyIncome: "",
    category: "",

    // Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",

    // Emergency Contact
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
  };
  const InitialDoc = [
    {
      id: 1,
      name: "Aadhar Card",
      file: null,
      status: "pending",
      required: true,
    },
    {
      id: 2,
      name: "PAN Card",
      file: null,
      status: "pending",
      required: true,
    },
    {
      id: 3,
      name: "Voter ID",
      file: null,
      status: "pending",
      required: false,
    },
    {
      id: 4,
      name: "Passport",
      file: null,
      status: "pending",
      required: false,
    },
    {
      id: 5,
      name: "Income Certificate",
      file: null,
      status: "pending",
      required: false,
    },
    {
      id: 6,
      name: "Bank Statement",
      file: null,
      status: "pending",
      required: false,
    },
    { id: 7, name: "Photo", file: null, status: "pending", required: true },
    {
      id: 8,
      name: "Signature",
      file: null,
      status: "pending",
      required: true,
    },
  ];
  const [formData, setFormData] = useState(initialValue);

  const [documents, setDocuments] = useState(InitialDoc);

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (docId, file) => {
    if (file) {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === docId ? { ...doc, file, status: "uploaded" } : doc
        )
      );
    }
  };

  const removeDocument = (docId) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId ? { ...doc, file: null, status: "pending" } : doc
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log("Form Data:", formData);
    console.log("Documents:", documents);
  };

  const stateOptions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  const categoryOptions = ["General", "OBC", "SC", "ST", "EWS"];

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === id
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const FormField = ({
    label,
    name,
    type = "text",
    required = false,
    options = null,
    placeholder = "",
  }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={required}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={required}
        />
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Government User Registration Form
        </h1>
        <p className="text-gray-600">
          Please fill all required fields marked with *
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <TabButton id="personal" label="Personal Info" icon={User} />
          <TabButton id="contact" label="Contact" icon={Phone} />
          <TabButton id="address" label="Address" icon={MapPin} />
          <TabButton id="government" label="Government IDs" icon={CreditCard} />
          <TabButton id="documents" label="Documents" icon={FileText} />
        </div>

        <button
          type="button"
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isEditMode
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          {isEditMode ? <Save size={18} /> : <Edit2 size={18} />}
          {isEditMode ? "Save Mode" : "Edit Mode"}
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === "personal" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                label="First Name"
                name="firstName"
                required
                placeholder="Enter first name"
              />
              <FormField
                label="Middle Name"
                name="middleName"
                placeholder="Enter middle name"
              />
              <FormField
                label="Last Name"
                name="lastName"
                required
                placeholder="Enter last name"
              />
              <FormField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                required
              />
              <FormField
                label="Gender"
                name="gender"
                required
                options={["Male", "Female", "Other"]}
              />
              <FormField
                label="Marital Status"
                name="maritalStatus"
                options={["Single", "Married", "Divorced", "Widowed"]}
              />
              <FormField
                label="Father's Name"
                name="fatherName"
                required
                placeholder="Enter father's name"
              />
              <FormField
                label="Mother's Name"
                name="motherName"
                required
                placeholder="Enter mother's name"
              />
              <FormField
                label="Category"
                name="category"
                options={categoryOptions}
              />
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Email Address"
                name="email"
                type="email"
                required
                placeholder="Enter email address"
              />
              <FormField
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                required
                placeholder="Enter 10-digit mobile number"
              />
              <FormField
                label="Alternate Number"
                name="alternateNumber"
                type="tel"
                placeholder="Enter alternate contact number"
              />
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-3 text-gray-700">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    label="Emergency Contact Name"
                    name="emergencyContactName"
                    placeholder="Enter contact name"
                  />
                  <FormField
                    label="Emergency Contact Number"
                    name="emergencyContactNumber"
                    type="tel"
                    placeholder="Enter contact number"
                  />
                  <FormField
                    label="Relation"
                    name="emergencyContactRelation"
                    placeholder="Enter relation"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "address" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <FormField
                  label="Current Address"
                  name="currentAddress"
                  required
                  placeholder="Enter current address"
                />
              </div>
              <div className="md:col-span-2">
                <FormField
                  label="Permanent Address"
                  name="permanentAddress"
                  required
                  placeholder="Enter permanent address"
                />
              </div>
              <FormField
                label="City"
                name="city"
                required
                placeholder="Enter city"
              />
              <FormField
                label="State"
                name="state"
                required
                options={stateOptions}
              />
              <FormField
                label="PIN Code"
                name="pincode"
                required
                placeholder="Enter 6-digit PIN code"
              />
              <FormField
                label="District"
                name="district"
                required
                placeholder="Enter district"
              />
            </div>
          </div>
        )}

        {activeTab === "government" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Government IDs & Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Aadhar Number"
                name="aadharNumber"
                required
                placeholder="Enter 12-digit Aadhar number"
              />
              <FormField
                label="PAN Number"
                name="panNumber"
                required
                placeholder="Enter PAN number"
              />
              <FormField
                label="Voter ID Number"
                name="voterIdNumber"
                placeholder="Enter Voter ID number"
              />
              <FormField
                label="Passport Number"
                name="passportNumber"
                placeholder="Enter passport number"
              />
              <FormField
                label="Occupation"
                name="occupation"
                placeholder="Enter occupation"
              />
              <FormField
                label="Employer Name"
                name="employerName"
                placeholder="Enter employer name"
              />
              <FormField
                label="Monthly Income"
                name="monthlyIncome"
                type="number"
                placeholder="Enter monthly income"
              />
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-3 text-gray-700">
                  Bank Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    label="Bank Name"
                    name="bankName"
                    placeholder="Enter bank name"
                  />
                  <FormField
                    label="Account Number"
                    name="accountNumber"
                    placeholder="Enter account number"
                  />
                  <FormField
                    label="IFSC Code"
                    name="ifscCode"
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Document Upload
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">
                      {doc.name}{" "}
                      {doc.required && <span className="text-red-500">*</span>}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        doc.status === "uploaded"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                  {doc.file ? (
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <span className="text-sm text-gray-600 truncate">
                        {doc.file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeDocument(doc.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="text-center">
                        <Upload
                          size={20}
                          className="mx-auto mb-1 text-gray-400"
                        />
                        <span className="text-sm text-gray-500">
                          Upload {doc.name}
                        </span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload(doc.id, e.target.files[0])
                        }
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Please upload clear, legible copies of
                your documents. Accepted formats: PDF, JPG, JPEG, PNG. Maximum
                file size: 2MB per document.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={18} />
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
