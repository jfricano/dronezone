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
} from '@chakra-ui/react';

export default function DisplayModal(props) {
  const deleteApp = (id) => {
    axios.delete('/', {}, { params: { id } }).then((res) => {
      const tempArr = apps;
      let removeIndex;
      for (let i = 0; i < tempArr.length; i += 1) {
        if (tempArr[i].id === id) {
          removeIndex = i;
          break;
        }
      }
      tempArr.splice(removeIndex, 1);
      useApps(tempArr);
    });
  };

  const updateApp = (id) => {
    const company = document.getElementById('coname').value;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;
    const notes = document.getElementById('notes').value;
    const link = document.getElementById('link').value;

    const modalUpdate = {
      ...modal,
      company,
      role,
      status,
      date,
      priority,
      notes,
      link,
    };

    useModal(modalUpdate);

    axios.put('/', {}, { params: { id } }).then((res) => {
      const tempArr = props.apps;
      tempArr.push(res);
      props.useArrs(tempArr);
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
              <input type='date' id='date' defaultValue={props.modal.date} />
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
              <b>Date</b>: {props.modal.date}
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
              <Button variant='ghost' onClick={() => updateApp(props.modal.id)}>
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
              <Button variant='ghost' onClick={() => deleteApp(props.modal.id)}>
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
