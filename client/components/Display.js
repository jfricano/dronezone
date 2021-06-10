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
            <Th style={{ color: '#292929' }}>{app.company}</Th>
            <Th style={{ color: '#292929' }}>{app.role}</Th>
            <Th style={{ color: '#292929' }}>{app.status}</Th>
            <Th style={{ color: '#292929' }}>{app.date_applied}</Th>
            <Th style={{ color: '#292929' }}>{app.priority}</Th>
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
        useEmail={props.useEmail}
        email={props.email}
        useApps={useApps}
        apps={apps}
        openModal={openModal}
      />
      <Container maxW='container.lg' centerContent>
        <div style={{ textAlign: 'center', color: '#292929' }}>
          <h1
            style={{
              fontSize: '35px',
              fontWeight: 'bold',
              color: '#ffc815',
              // WebkitTextStrokeColor: 'black',
              // WebkitTextStrokeWidth: '1px',
            }}
          >
            Welcome to nektr
          </h1>
          <br />
          If you would like to add a new application, please select the menu on
          the top left.
          <br />
          Below are your current applications. To see more details about, edit,
          or delete an application, please select it below.
        </div>
        <br />
        <br />
      </Container>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th
              style={{
                fontSize: '15px',
                color: '#ffc815',
                fontWeight: 'bolder',
                // WebkitTextStrokeColor: 'black',
                // WebkitTextStrokeWidth: '0.5px',
              }}
            >
              Company Name
            </Th>
            <Th
              style={{
                fontSize: '15px',
                color: '#ffc815',
                // WebkitTextStrokeColor: 'black',
                // WebkitTextStrokeWidth: '0.5px',
              }}
            >
              Role
            </Th>
            <Th
              style={{
                fontSize: '15px',
                color: '#ffc815',
                // WebkitTextStrokeColor: 'black',
                // WebkitTextStrokeWidth: '0.5px',
              }}
            >
              Status
            </Th>
            <Th
              style={{
                fontSize: '15px',
                color: '#ffc815',
                // WebkitTextStrokeColor: 'black',
                // WebkitTextStrokeWidth: '0.5px',
              }}
            >
              Date Applied
            </Th>
            <Th
              style={{
                fontSize: '15px',
                color: '#ffc815',
                // WebkitTextStrokeColor: 'black',
                // WebkitTextStrokeWidth: '0.5px',
              }}
            >
              Priority
            </Th>
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
        email={props.email}
      />
    </Container>
  );
}
