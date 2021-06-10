import React, { useState, useEffect } from 'react';
import Header from './Header';
import {
  useDisclosure,
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

  const [ids, useIds] = useState([]);

  // state object to hold the current values for the modal
  const [modal, useModal] = useState({});

  //
  const [modalEdit, useModalEdit] = useState(false);

  // on click function to handle the opening of the modal
  const openModal = (app) => {
    useModal(app);
    onOpen();
  };

  // use effect to make fetch request to back end for initial list of array items
  useEffect(() => {
    // should be returning results of fetch request, hopefully an array?
    axios.get('/dashboard').then((res) => {
      const tempArr = [];
      const idArr = [];
      res.data.forEach((app) => {
        idArr.push(app._id);
        tempArr.push(
          <Tr onClick={() => openModal(app)}>
            <Th>{app.company}</Th>
            <Th>{app.role}</Th>
            <Th>{app.status}</Th>
            <Th>{app.date_applied}</Th>
            <Th>{app.priority}</Th>
          </Tr>
        );
      });
      useIds(idArr);
      console.log(idArr);
      useApps(tempArr);
    });
  }, []);

  return (
    <Container maxW='container.lg'>
      <Header
        useLoginStatus={props.useLoginStatus}
        useApps={useApps}
        apps={apps}
        openModal={openModal}
      />
      <Container maxW='container.lg' centerContent>
        <h1 style={{ textAlign: 'center' }}>
          Welcome to Nektr.
          <br />
          <br />
          If you would like to add a new application, please select the menu on
          the top left.
          <br />
          Below are your current applications. To see more details about, edit,
          or delete an application, please select it below.
        </h1>
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
        <Tbody>{apps}</Tbody>
      </Table>

      <DisplayModal
        isOpen={isOpen}
        onClose={onClose}
        modalEdit={modalEdit}
        useModalEdit={useModalEdit}
        modal={modal}
        useModal={useModal}
        apps={apps}
        useApps={useApps}
        ids={ids}
        openModal={openModal}
        useIds={useIds}
      />
    </Container>
  );
}
