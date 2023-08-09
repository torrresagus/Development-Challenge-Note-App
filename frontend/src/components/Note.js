import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faTrash, faEdit, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from './ConfirmModal';
import EditNoteModal from './EditNoteModal';

const Note = ({ note, onNoteChange }) => {

  // Function to handle unarchiving a note
  const handleUnarchive = async () => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${note._id}/unarchive`, {
        method: 'POST',
      });
  
      if (response.ok) {
        console.log(`Unarchived note with ID: ${note._id}`);
        onNoteChange();
      } else {
        console.error(`Failed to unarchive note with ID: ${note._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle deleting a note
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${note._id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`Deleted note with ID: ${note._id}`);
        onNoteChange();
      } else {
        console.error(`Failed to delete note with ID: ${note._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle updating a note
  const handleUpdate = async (updatedNote) => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
  
      if (response.ok) {
        console.log(`Updated note with ID: ${note._id}`);
        onNoteChange();
      } else {
        console.error(`Failed to update note with ID: ${note._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // Function to handle archiving a note
  const handleArchive = async () => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${note._id}/archive`, {
        method: 'POST',
      });

      if (response.ok) {
        console.log(`Archived note with ID: ${note._id}`);
        onNoteChange();
      } else {
        console.error(`Failed to archive note with ID: ${note._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // State to track modal visibility
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [modalContent, setModalContent] = useState({});

  // Functions to handle modal visibility
  const handleClose = () => setShow(false);
  const handleShow = (content) => {
    setModalContent(content);
    setShow(true);
  };

  // Functions to handle edit modal visibility
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  // Function to handle confirm button click
  const handleConfirm = () => {
    if (modalContent.action === 'delete') {
      handleDelete();
    }
    if (modalContent.action === 'archive') {
      handleArchive();
    }
    if (modalContent.action === 'unarchive') {
      handleUnarchive();
    }
    handleClose();
  };
  
  return (
    <Card style={{ width: '18rem', margin: '10px', boxShadow: '0px 3px 15px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>
          {note.content}
        </Card.Text>
      </Card.Body>
      <div className="text-end" style={{ margin: '5px' }}>
        <Button 
        variant={note.archived ? "warning" : "secondary"} 
        style={{ margin: '5px' }}
        onClick={() => {
          if (note.archived) {
            handleShow({ 
              title: "Confirm Unarchive", 
              body: "Are you sure you want to unarchive this note?", 
              confirmButtonText: "Yes, unarchive", 
              action: "unarchive" 
            });
          } else {
            handleShow({ 
              title: "Confirm Archive", 
              body: "Are you sure you want to archive this note?", 
              confirmButtonText: "Yes, archive", 
              action: "archive" 
            });
          }
        }}
        >
        <FontAwesomeIcon icon={note.archived ? faBoxOpen : faArchive} />
        </Button>
        <Button 
          variant="danger" 
          style={{ margin: '5px' }}
          onClick={() => handleShow({ 
            title: "Confirm Deletion", 
            body: "Are you sure you want to delete this note?", 
            confirmButtonText: "Yes, delete", 
            action: "delete" 
          })}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button variant="primary" style={{ margin: '5px' }} onClick={handleShowEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>
      
      <ConfirmModal 
        show={show} 
        handleClose={handleClose} 
        title={modalContent.title} 
        body={modalContent.body} 
        confirmButtonText={modalContent.confirmButtonText}
        onConfirm={handleConfirm}
      />

      <EditNoteModal 
        note={note} 
        show={showEdit} 
        handleClose={handleCloseEdit}
        handleUpdate={handleUpdate}
      />
    </Card>
  );
};

export default Note;