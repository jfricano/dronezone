import React from 'react';
import {
  useDisclosure,
  Container,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
} from '@chakra-ui/react';
import axios from 'axios';

import { HamburgerIcon } from '@chakra-ui/icons';
export default function Header(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleApp = () => {
    // grabs all values from Modal
    const company = document.getElementById('coname').value;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;
    const date_applied = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;
    const notes = document.getElementById('notes').value;
    const link = document.getElementById('link').value;

    const reqBody = {
      company,
      role,
      status,
      date_applied,
      priority,
      notes,
      link,
    };

    axios.post('/dashboard', reqBody).then((res) => {
      // do something with returned ID
      const tempApps = props.apps;
      tempApps.push(res);
      props.useApps(tempApps);
      onClose();
    });
  };
  return (
    <Container className='header' maxW='container.lg'>
      {/* Modal for add Application */}
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add an Application</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label>Name of the Company</label>
            <br />
            <input
              type='text'
              id='coname'
              placeholder='Company Name'
              required
            />
            <br /> <br />
            <label>Role you Applied For</label>
            <br />
            <input type='text' id='role' placeholder='Role' />
            <br /> <br />
            <label>Select Application Status</label>
            <br />
            <select name='status' id='status'>
              <option value='applied'>Applied</option>
              <option value='notapplied'>Not Applied</option>
              <option value='interviewed'>Interviewed</option>
              <option value='rejected'>Rejected</option>
              <option value='offer'>Offer Received</option>
            </select>
            <br /> <br />
            <label>Date you Applied</label>
            <br />
            <input type='date' id='date' />
            <br /> <br />
            <label>Priority - level 1 (low), level 2, or level 3 (high)</label>
            <br />
            <input type='number' placeholder='Enter priority' id='priority' />
            <br />
            <br />
            <label>Add a Link to the Posting</label> <br />
            <input
              type='text'
              placeholder='Link to posting'
              id='link'
            /> <br /> <br />
            <label>Notes regarding Application</label>
            <br />
            <textarea id='notes' placeholder='Enter any notes here'></textarea>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={handleApp}>
              Add Application
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Menu button for Add App and Logout */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
        >
          Navigation
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Add an Application</MenuItem>
          <MenuItem onClick={() => props.useLoginStatus(false)}>
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Container>
  );
}
