import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tr,
  Th,
} from '@chakra-ui/react';
import axios from 'axios';

export default function DisplayModal(props) {
  const deleteApp = (jobAppId) => {
    axios.delete(`/${jobAppId}`).then((res) => {
      const tempArr = props.apps;
      let removeIndex;
      for (let i = 0; i < tempArr.length; i += 1) {
        if (props.ids[i] === jobAppId) {
          removeIndex = i;
          break;
        }
      }
      tempArr.splice(removeIndex, 1);
      props.useApps([...tempArr]);
      props.onClose();
    });
  };

  const updateApp = (jobAppId) => {
    const company = document.getElementById('coname').value;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;
    const date_applied = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;
    const notes = document.getElementById('notes').value;
    const link = document.getElementById('link').value;

    const modalUpdate = {
      ...props.modal,
      company,
      role,
      status,
      date_applied,
      priority,
      notes,
      link,
    };

    props.useModal(modalUpdate);

    axios.put(`/${jobAppId}`, modalUpdate).then((res) => {
      const tempArr = [...props.apps];
      for (let i = 0; i < tempArr.length; i += 1) {
        if (props.ids[i] === jobAppId) {
          tempArr[i] = (
            <Tr onClick={() => props.openModal(res.data)}>
              <Th>{res.data.company}</Th>
              <Th>{res.data.role}</Th>
              <Th>{res.data.status}</Th>
              <Th>{res.data.date_applied}</Th>
              <Th>{res.data.priority}</Th>
            </Tr>
          );
          break;
        }
      }
      props.useApps([...tempArr]);
      props.onClose();
    });
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {props.modal.role} at {props.modal.company}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {props.modalEdit ? (
            <div>
              <label>Name of the Company</label>
              <br />
              <input
                type='text'
                id='coname'
                defaultValue={props.modal.company}
                required
              />
              <br /> <br />
              <label>Role you Applied For</label>
              <br />
              <input type='text' id='role' defaultValue={props.modal.role} />
              <br /> <br />
              <label>Select Application Status</label>
              <br />
              <select
                name='status'
                id='status'
                defaultValue={props.modal.status}
              >
                <option value='applied'>Applied</option>
                <option value='notapplied'>Not Applied</option>
                <option value='interviewed'>Interviewed</option>
                <option value='rejected'>Rejected</option>
                <option value='offer'>Offer Received</option>
              </select>
              <br /> <br />
              <label>Date you Applied</label>
              <br />
              <input
                type='date'
                id='date'
                defaultValue={props.modal.date_applied}
              />
              <br /> <br />
              <label>
                Priority - level 1 (low), level 2, or level 3 (high)
              </label>
              <br />
              <input
                type='number'
                id='priority'
                defaultValue={props.modal.priority}
              />
              <br />
              <br />
              <label>Add a Link to the Posting</label> <br />
              <input
                type='text'
                id='link'
                defaultValue={props.modal.link}
              />{' '}
              <br /> <br />
              <label>Notes regarding Application</label>
              <br />
              <textarea id='notes' defaultValue={props.modal.notes}></textarea>
            </div>
          ) : (
            <div>
              <b>Status</b>: {props.modal.status}
              <br />
              <b>Date</b>: {props.modal.date_applied}
              <br />
              <b>Priority</b>: {props.modal.priority}
              <br />
              <b>Notes</b>: {props.modal.notes}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {props.modalEdit ? (
            <div>
              <Button
                variant='ghost'
                onClick={() => {
                  updateApp(props.modal._id);
                  props.useModalEdit(false);
                }}
              >
                Update Application
              </Button>{' '}
              <Button
                onClick={() => {
                  props.useModalEdit(false);
                  props.onClose();
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <div>
              <Button variant='ghost' onClick={() => props.useModalEdit(true)}>
                Edit Application
              </Button>{' '}
              <Button
                variant='ghost'
                onClick={() => deleteApp(props.modal._id)}
              >
                Delete Application
              </Button>{' '}
              <Button onClick={props.onClose}>Close</Button>
            </div>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
