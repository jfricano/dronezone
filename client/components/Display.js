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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import axios from 'axios';

export default function Display(props) {
  // handles the opening and closing of the Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // state object to hold the current values for the modal
  // ultimate goal is to house props for selected item to fill out the modal
  const [modal, useModal] = useState({
    company: 'Test',
    role: 'Fake role',
    status: 'Rejected',
    dateApplied: '6/7/2021',
    priority: 2,
  });

  // on click function to handle the opening of the modal. want to use the useModal here
  const openModal = () => {
    onOpen();
  };

  // use effect to make fetch request to back end for initial list of array items
  useEffect(() => {
    // should be returning results of fetch request, hopefully an array?
    axios.get('/dashboard').then((res) => console.log(res.data));
  }, []);

  return (
    <Container maxW='container.lg'>
      <Header useLoginStatus={props.useLoginStatus} />
      <Container maxW='container.lg' centerContent>
        Welcome to DroneZone!
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
        <Tbody>
          <Tr onClick={openModal}>
            <Th>Apple</Th>
            <Th>Senior Engineer</Th>
            <Th>Applied</Th>
            <Th>6/7/2021</Th>
            <Th>2</Th>
          </Tr>
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modal.role} at {modal.company}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modal.status}
            <br />
            {modal.dateApplied}
            <br />
            {modal.priority}
            <br />
            {modal.notes}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
