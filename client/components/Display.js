import React, { useState } from 'react';
import Header from './Header';
import {
  useDisclosure,
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

export default function Display(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, useModal] = useState({
    company: 'Test',
    role: 'Fake role',
    status: 'Rejected',
    dateApplied: '6/7/2021',
  });
  const openModal = () => {
    console.log('hi');
    onOpen();
  };
  return (
    <Container maxW='container.lg'>
      <Header useLoginStatus={props.useLoginStatus} />
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Company Name</Th>
            <Th>Position</Th>
            <Th>Status</Th>
            <Th>Date Applied</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr onClick={openModal}>
            <Th>Apple</Th>
            <Th>Senior Engineer</Th>
            <Th>Applied</Th>
            <Th>6/7/2021</Th>
          </Tr>
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add an Application</ModalHeader>
          <ModalBody>
            {modal.company}
            <br />
            {modal.role}
            <br />
            {modal.status}
            <br />
            {modal.dateApplied}
            <br />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
