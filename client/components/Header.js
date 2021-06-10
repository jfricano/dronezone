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
  Tr,
  Th,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import logo from '../../public/nektr-light-trans.png';

import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
export default function Header(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleApp = (e) => {
    e.preventDefault();
    // grabs all values from Modal
    const company = document.getElementById('coname').value;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;
    const date_applied = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;
    const notes = document.getElementById('notes').value;
    const link = document.getElementById('link').value;
    const email = props.email;

    const reqBody = {
      email,
      company,
      role,
      status,
      date_applied,
      priority,
      notes,
      link,
    };
    // empty strings, undefined, falsy value
    axios.post('/addApplication', reqBody).then((res) => {
      // do something with returned ID
      const tempApps = props.apps;
      tempApps.push(
        <Tr onClick={() => props.openModal(res.data)}>
          <Th>{res.data.company}</Th>
          <Th>{res.data.role}</Th>
          <Th>{res.data.status}</Th>
          <Th>{res.data.date_applied}</Th>
          <Th>{res.data.priority}</Th>
        </Tr>
      );
      props.useApps([...tempApps]);
      onClose();
    });
  };
  return (
    <Container className='header' maxW='container.lg'>
      {/* Modal for add Application */}
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            style={{
              fontSize: '25px',
              fontWeight: 'bold',
              color: '#ffc815',
            }}
          >
            Add an Application
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <label>
                <b>Name of the Company</b>
              </label>
              <br />
              <input
                type='text'
                id='coname'
                placeholder='Company Name'
                required
              />
              <br /> <br />
              <label>
                <b>Role you Applied For</b>
              </label>
              <br />
              <input type='text' id='role' placeholder='Role' required />
              <br /> <br />
              <label>
                <b>Select Application Status</b>
              </label>
              <br />
              <select name='status' id='status' required>
                <option value='applied'>Applied</option>
                <option value='notapplied'>Not Applied</option>
                <option value='interviewed'>Interviewed</option>
                <option value='rejected'>Rejected</option>
                <option value='offer'>Offer Received</option>
              </select>
              <br /> <br />
              <label>
                <b>Date you Applied</b>
              </label>
              <br />
              <input type='date' id='date' required />
              <br /> <br />
              <label>
                <b>Priority - level 1 (low), level 2, or level 3 (high)</b>
              </label>
              <br />
              <input
                type='number'
                placeholder='Enter priority'
                id='priority'
                required
              />
              <br />
              <br />
              <label>
                <b>Add a Link to the Posting</b>
              </label>{' '}
              <br />
              <input type='text' placeholder='Link to posting' id='link' />{' '}
              <br /> <br />
              <label>
                <b>Notes regarding Application</b>
              </label>
              <br />
              <textarea
                id='notes'
                placeholder='Enter any notes here'
              ></textarea>
              <div style={{ textAlign: 'right' }}>
                <Button
                  style={{ color: '#292929', borderColor: '#ffc815' }}
                  type='submit'
                  variant='outline'
                  onClick={(e) => handleApp(e)}
                >
                  Add Application
                </Button>
                <Button
                  onClick={onClose}
                  style={{ backgroundColor: '#ffc815', color: '#292929' }}
                >
                  Close
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Menu button for Add App and Logout */}
      <img src={logo} />
      <Menu style={{ color: '#292929', borderColor: '#ffc815' }}>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          style={{ color: '#292929', borderColor: '#ffc815' }}
          variant='outline'
        >
          Navigation
        </MenuButton>
        <MenuList style={{ borderColor: '#ffc815' }}>
          <MenuItem onClick={onOpen} style={{ color: '#292929' }}>
            Add an Application
          </MenuItem>
          <MenuItem
            onClick={() => props.useEmail(null)}
            style={{ color: '#292929' }}
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
      <Button
        onClick={toggleColorMode}
        variant='outline'
        style={{
          margin: '0px 5px 0px 5px',
          color: '#292929',
          borderColor: '#ffc815',
        }}
      >
        {colorMode === 'dark' ? (
          <SunIcon style={{ marginRight: '10px' }} />
        ) : (
          <MoonIcon style={{ marginRight: '10px' }} />
        )}
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </Container>
  );
}
