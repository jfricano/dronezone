import React, { useState, useEffect } from 'react';
import Header from './Header';
import {
  useDisclosure,
  Button,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from '@chakra-ui/react';
import DisplayModal from './DisplayModal';
import axios from 'axios';

export default function Display(props) {
  // handles the opening and closing of the Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // state object to hold array of applications
  const [apps, useApps] = useState([]);

  // state object to hold the current values for the modal
  const [modal, useModal] = useState({});

  const [modalEdit, useModalEdit] = useState(false);

  // on click function to handle the opening of the modal
  const openModal = (app) => {
    useModal(app);
    onOpen();
  };

  // conditionally fills table once apps has been populated
  const fillTable = () => {
    const rows = [];
    for (let i = 0; i < apps.length; i += 1) {
      rows.push(apps[i]);
    }
    return rows;
  };

  // use effect to make fetch request to back end for initial list of array items
  useEffect(() => {
    // should be returning results of fetch request, hopefully an array?
    axios.get('/dashboard').then((res) => {
      const tempArr = [];
      // temporary response before DB route is connected
      const tempRes = [
        {
          company: 'Apple',
          role: 'Senior Engineer',
          status: 'Applied',
          date: '2021-06-07',
          priority: 2,
          link: 'http://apple.com',
          notes: 'Notes for the application!',
          id: 7,
        },
      ];
      tempRes.forEach((app) => {
        tempArr.push(
          <Tr onClick={() => openModal(app)}>
            <Th>{app.company}</Th>
            <Th>{app.role}</Th>
            <Th>{app.status}</Th>
            <Th>{app.date}</Th>
            <Th>{app.priority}</Th>
          </Tr>
        );
      });
      useApps(tempArr);
    });
  }, []);

  return (
    <Container maxW='container.lg'>
      <Header
        useLoginStatus={props.useLoginStatus}
        useApps={useApps}
        apps={apps}
      />
      <Container maxW='container.lg' centerContent>
        <h1>Nektr</h1>
        <br />
        <br />
      </Container>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Company Name</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Date Applied</Th>
            <Th>Priority</Th>
          </Tr>
        </Thead>
        {/* if apps has been populated, fill table */}
        <Tbody>{apps.length > 0 && fillTable()}</Tbody>
      </Table>

      <DisplayModal
        isOpen={isOpen}
        onClose={onClose}
        modalEdit={modalEdit}
        useModalEdit={useModalEdit}
        modal={modal}
        apps={apps}
        useApps={useApps}
      />
    </Container>
  );
}
