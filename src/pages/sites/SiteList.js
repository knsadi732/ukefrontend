import React from 'react';
import GenericList from '../../components/GenericList';
import siteService from '../../services/siteService';
import SiteForm from './SiteForm';
import { Card } from 'react-bootstrap';

const SiteList = () => {
  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Location', key: 'location' },
    { header: 'Status', key: 'status' },
    { header: 'Manager', key: 'manager' }
  ];

  const renderViewModal = (site) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Site Details</Card.Title>
          <Card.Text><strong>Name:</strong> {site.name}</Card.Text>
          <Card.Text><strong>Location:</strong> {site.location}</Card.Text>
          <Card.Text><strong>Status:</strong> {site.status}</Card.Text>
          <Card.Text><strong>Manager:</strong> {site.manager}</Card.Text>
          <Card.Text><strong>Description:</strong> {site.description || 'N/A'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Sites"
      service={siteService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <SiteForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(site, onSubmit, onCancel) => (
        <SiteForm initialData={site} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default SiteList;