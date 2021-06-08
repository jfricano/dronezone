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

import { HamburgerIcon } from '@chakra-ui/icons';
export default function Header(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container className='header' maxW='container.lg'>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add an Application</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Hello</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button variant='ghost'>Secondary</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
