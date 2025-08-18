import React, { useState, useEffect } from "react";
import { UsersHeaders } from "../../../helpers/headers/usersHeaders";
import userService from "../../../service/user.service";
import CustomTable from "../../common/CustomTable";
import UserDetailModal from "./UserDetailModal";
import UserFormModal from "./UserFormModal";
import ViewDocuments from "../ViewDocuments";
import roleService from "../../../service/role.service";
import Select from "react-select";

const UserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [documentData, setDocumentData] = useState(null);
  const [roles, setRoles] = useState([]);
  const [sites, setSites] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [filters, setFilters] = useState({
    role: "",
    site: "",
    workOrder: "",
  });

  useEffect(() => {
    document.title = "User Management";
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userService.GetUsers();
      if (res?.status === 200) {
        const usersWithSerial = res?.data?.docs.map((user, index) => ({
          no: index + 1,
          ...user,
        }));
        setUsers(usersWithSerial);
        setFilteredUsers(usersWithSerial);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await roleService.GetRoles();
      if (res?.status === 200) {
        setRoles(res?.data?.docs);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const handleViewDocuments = (user) => {
    setDocumentData(user);
    setShowDocuments(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const formData = new FormData();
        formData.append("id", id);
        const res = await userService.DeleteUserById(formData);
        if (res?.status === 200) {
          fetchUsers(); // Refresh the user list
        } else {
          console.error("Error deleting user:", res?.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserForm(true);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Apply filters to the user list
    let filtered = [...users];
    
    if (newFilters.role) {
      filtered = filtered.filter(user => user.role === newFilters.role);
    }
    
    if (newFilters.site) {
      filtered = filtered.filter(user => user.site_id === newFilters.site);
    }
    
    if (newFilters.workOrder) {
      filtered = filtered.filter(user => user.wo_id === newFilters.workOrder);
    }
    
    setFilteredUsers(filtered);
  };

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-12">
          <h2 className="text-primary">User Management</h2>
          <p className="text-muted">Manage employee information and permissions</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <label className="form-label">Filter by Role</label>
          <Select
            options={roles.map(role => ({ label: role.role_name, value: role.role_name }))}
            onChange={(selected) => handleFilterChange('role', selected?.value || '')}
            placeholder="Select Role"
            isClearable
          />
        </div>
        
        <div className="col-md-4 mb-2">
          <label className="form-label">Filter by Site</label>
          <Select
            options={sites.map(site => ({ label: site.site_name, value: site._id }))}
            onChange={(selected) => handleFilterChange('site', selected?.value || '')}
            placeholder="Select Site"
            isClearable
          />
        </div>
        
        <div className="col-md-4 mb-2">
          <label className="form-label">Filter by Work Order</label>
          <Select
            options={workOrders.map(wo => ({ label: wo.wo_name, value: wo._id }))}
            onChange={(selected) => handleFilterChange('workOrder', selected?.value || '')}
            placeholder="Select Work Order"
            isClearable
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row mb-3">
        <div className="col-12">
          <button 
            className="btn btn-primary me-2"
            onClick={handleAddUser}
          >
            <i className="bi bi-person-plus me-1"></i>
            Add New User
          </button>
          
          <button 
            className="btn btn-outline-secondary"
            onClick={fetchUsers}
          >
            <i className="bi bi-arrow-repeat me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <CustomTable
                headers={UsersHeaders}
                body={filteredUsers}
                loading={loading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleViewDetails={handleViewDetails}
                handleViewDocuments={handleViewDocuments}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showUserForm && (
        <UserFormModal
          show={showUserForm}
          onHide={() => {
            setShowUserForm(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          roles={roles}
          sites={sites}
          workOrders={workOrders}
          onSuccess={fetchUsers}
        />
      )}

      {showUserDetail && (
        <UserDetailModal
          show={showUserDetail}
          onHide={() => setShowUserDetail(false)}
          user={selectedUser}
        />
      )}

      {showDocuments && (
        <ViewDocuments
          show={showDocuments}
          onHide={() => setShowDocuments(false)}
          data={documentData}
        />
      )}
    </div>
  );
};

export default UserManagement;