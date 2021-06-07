import React from 'react';
import Header from './Header';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Display() {
  return (
    <div>
      <Header />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date Applied</th>
            <th>Priority</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={createModal}>
            <th>Apple</th>
            <th>Senior Engineer</th>
            <th>Applied</th>
            <th>6/5/2021</th>
            <th>3</th>
            <th>examplelink.com</th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
