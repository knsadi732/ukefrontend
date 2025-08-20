import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Modal, Form, Pagination } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import LoadingSpinner from '../common/LoadingSpinner';
import { notifySuccess, notifyError } from '../common/Notification';

const GenericList = ({
  title,
  service,
  columns,
  renderItemActions,
  renderCreateForm,
  renderEditForm,
  renderViewModal,
  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 10;

  const fetchItems = async () => {
    try {
      setLoading(true);
      // In a real implementation, you would pass pagination and search params
      const data = await service.getAll();
      setItems(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      notifyError('Failed to fetch data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (data) => {
    try {
      await service.create(data);
      notifySuccess(`${title} created successfully!`);
      setShowCreateModal(false);
      fetchItems();
      if (onCreateSuccess) onCreateSuccess();
    } catch (error) {
      notifyError('Failed to create: ' + error.message);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await service.update(id, data);
      notifySuccess(`${title} updated successfully!`);
      setShowEditModal(false);
      fetchItems();
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notifyError('Failed to update: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this ${title}?`)) {
      try {
        await service.delete(id);
        notifySuccess(`${title} deleted successfully!`);
        fetchItems();
        if (onDeleteSuccess) onDeleteSuccess();
      } catch (error) {
        notifyError('Failed to delete: ' + error.message);
      }
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <h2>{title}</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <FaPlus /> Add New
          </Button>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index}>{column.header}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((item, index) => (
                  <tr key={item._id || item.id || index}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {column.render ? column.render(item) : item[column.key]}
                      </td>
                    ))}
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleView(item)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(item._id || item.id)}
                      >
                        <FaTrash />
                      </Button>
                      {renderItemActions && renderItemActions(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Pagination className="justify-content-center">
            <Pagination.Prev
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Card.Body>
      </Card>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderCreateForm && renderCreateForm(handleCreate, () => setShowCreateModal(false))}
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && renderEditForm && renderEditForm(selectedItem, handleUpdate, () => setShowEditModal(false))}
        </Modal.Body>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && renderViewModal && renderViewModal(selectedItem)}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GenericList;