import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const GenericForm = ({ fields, initialValues = {}, onSubmit, onCancel, submitButtonText = "Submit" }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
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
        {fields.map((field, index) => (
          <Col md={field.md || 12} key={index} className="mb-3">
            <Form.Group controlId={field.name}>
              <Form.Label>
                {field.label} {field.required && <span className="text-danger">*</span>}
              </Form.Label>
              
              {field.type === 'select' ? (
                <Form.Select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  isInvalid={!!errors[field.name]}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              ) : field.type === 'textarea' ? (
                <Form.Control
                  as="textarea"
                  rows={field.rows || 3}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  isInvalid={!!errors[field.name]}
                  placeholder={field.placeholder}
                />
              ) : field.type === 'checkbox' ? (
                <Form.Check
                  type="checkbox"
                  name={field.name}
                  checked={!!formData[field.name]}
                  onChange={handleChange}
                  label={field.label}
                  isInvalid={!!errors[field.name]}
                />
              ) : (
                <Form.Control
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  isInvalid={!!errors[field.name]}
                  placeholder={field.placeholder}
                />
              )}
              
              <Form.Control.Feedback type="invalid">
                {errors[field.name]}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        ))}
      </Row>
      
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {submitButtonText}
        </Button>
      </div>
    </Form>
  );
};

export default GenericForm;