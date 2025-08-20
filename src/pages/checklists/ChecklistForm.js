import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaTrash, FaPlus } from 'react-icons/fa';

const ChecklistForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    items: [{ text: '', required: true }]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        items: initialData.items || [{ text: '', required: true }]
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { text: '', required: true }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = [...formData.items];
      newItems.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        items: newItems
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = 'Title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={12} className="mb-3">
          <Form.Group controlId="title">
            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
              placeholder="Enter checklist title"
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12} className="mb-3">
          <Form.Group controlId="category">
            <Form.Label>Category <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
              placeholder="Enter category"
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12} className="mb-3">
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mb-3">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Checklist Items</span>
              <Button variant="success" size="sm" onClick={addItem}>
                <FaPlus /> Add Item
              </Button>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                {formData.items.map((item, index) => (
                  <ListGroup.Item key={index} className="mb-2">
                    <Row>
                      <Col md={8}>
                        <Form.Control
                          type="text"
                          value={item.text}
                          onChange={(e) => handleItemChange(index, 'text', e.target.value)}
                          placeholder="Enter checklist item"
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Check
                          type="checkbox"
                          label="Required"
                          checked={item.required}
                          onChange={(e) => handleItemChange(index, 'required', e.target.checked)}
                        />
                      </Col>
                      <Col md={1}>
                        {formData.items.length > 1 && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeItem(index)}
                          >
                            <FaTrash />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {initialData ? "Update Checklist" : "Create Checklist"}
        </Button>
      </div>
    </Form>
  );
};

export default ChecklistForm;