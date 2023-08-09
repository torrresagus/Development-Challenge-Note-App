import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CreateNoteModal from './CreateNoteModal';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const NoteList = () => {
  // State variables
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [isHoveredCreate, setIsHoveredCreate] = useState(false);
  const [isHoveredArchived, setIsHoveredArchived] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('createdAt');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Functions to handle the create note modal
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const toggleShowArchived = () => setShowArchived(!showArchived);


// Function to fetch notes from the backend
const fetchNotes = async () => {
  const res = await axios.get(`http://localhost:3001/notes?archived=false&sortOrder=${sortOrder}&sortBy=${sortBy}&category=${filterCategory}`);
  setNotes(res.data);
};

// Function to fetch archived notes from the backend
const fetchArchivedNotes = async () => {
  const res = await axios.get(`http://localhost:3001/notes?archived=true&sortOrder=${sortOrder}&sortBy=${sortBy}&category=${filterCategory}`);
  setArchivedNotes(res.data);
};

// Function to fetch categories from the backend
const fetchCategories = async () => {
  const res = await axios.get('http://localhost:3001/notes/categories');
  setCategories(res.data);
};


  /// Function to create a note
  const handleCreateNote = async (note) => {
    try {
        const response = await axios.post('http://localhost:3001/notes/', note);
        if (response.status === 201) {
          fetchNotes();
          fetchCategories();
        } else {
          console.error(`Failed to create note`);
        }
      } catch (error) {
        console.error(error);
      }
  };

  // Use effect hook to fetch notes when the sortOrder or sortBy state variables change
  // Or when archived notes are shown or hidden
  useEffect(() => {
    fetchNotes();
    fetchArchivedNotes();
    fetchCategories();
}, [sortOrder, sortBy, showArchived, filterCategory, filterCategory]);


// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
        {React.Children.toArray(children).filter(
          (child) =>
            !value || (typeof child.props.children === 'string' && child.props.children.toLowerCase().startsWith(value)),
          )}
        </ul>
      </div>
    );
  },
);



  return (
    <Container style={{ maxWidth: '75%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ display: 'inline-block', marginRight: '10px' }}>{showArchived ? 'Archived Notes' : 'My Notes'}</h2>
          {!showArchived && 
            <Button 
              style={isHoveredCreate ? styles.hoveredCreateNoteButton : styles.createNoteButton}
              onMouseEnter={() => setIsHoveredCreate(true)}
              onMouseLeave={() => setIsHoveredCreate(false)}
              onClick={handleShowCreate}
            >
              Create New Note
            </Button>
          }
          <Button 
          style={isHoveredArchived ? styles.hoveredArchivedNotesButton : styles.archivedNotesButton}
          onMouseEnter={() => setIsHoveredArchived(true)}
          onMouseLeave={() => setIsHoveredArchived(false)}
          onClick={toggleShowArchived}
          >
          {showArchived ? 'Go back to Unarchived Notes' : 'Archived Notes'}
        </Button>

        <Dropdown onSelect={(e) => setFilterCategory(e)}>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Filter by category
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item eventKey="">All</Dropdown.Item>
            {categories.map(category => (
              <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        </div>
        <Dropdown onSelect={(e) => {const [order, by] = e.split('_'); setSortOrder(order); setSortBy(by);}}>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Sort by
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="asc_createdAt">Created (asc)</Dropdown.Item>
            <Dropdown.Item eventKey="desc_createdAt">Created (desc)</Dropdown.Item>
            <Dropdown.Item eventKey="asc_updatedAt">Updated (asc)</Dropdown.Item>
            <Dropdown.Item eventKey="desc_updatedAt">Updated (desc)</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {!showArchived && 
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {notes.map(note => (
            <Note key={note._id} note={note} onNoteChange={fetchNotes} /> 
          ))}
        </div>
      }
      {showArchived && 
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {archivedNotes.map(note => (
            <Note key={note._id} note={note} onNoteChange={fetchArchivedNotes} />
          ))}
        </div>
      }
      <CreateNoteModal
        show={showCreate}
        handleClose={handleCloseCreate}
        handleCreate={handleCreateNote}
      />
    </Container>
  );
};

const styles = {
  createNoteButton: {
    backgroundColor: 'black',
    color: 'white', 
    borderRadius: '15px',
    border: 'none',
    marginRight: '10px',
  },
  hoveredCreateNoteButton: {
    backgroundColor: 'black',
    color: 'white', 
    borderRadius: '15px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.5)',
    border: 'none',
    marginRight: '10px',
  },
  archivedNotesButton: {
    backgroundColor: 'gray',
    color: 'white', 
    borderRadius: '15px',
    border: 'none',
    marginRight: '10px',
  },
  hoveredArchivedNotesButton: {
    backgroundColor: 'gray',
    color: 'white', 
    borderRadius: '15px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.5)',
    border: 'none',
    marginRight: '10px',
  }
}

export default NoteList;
