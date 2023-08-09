import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { XSquare } from 'react-bootstrap-icons';

function CreateNoteModal({ show, handleClose, handleCreate }) {
  // State to track the title and content fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  
  // Function to handle the title field
  useEffect(() => {
    if (title.trim() === '' || content.trim() === '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [title, content]);
  
  // Function to handle the title field
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle the content field
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // Function to handle the new category field
  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  // Function to handle adding a new category
  const handleAddCategoryClick = () => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  // Function to handle removing a category
  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  // Function to handle the create button
  const handleCreateClick = () => {
    handleCreate({ title, content, categories });
    setTitle('');
    setContent('');
    setCategories([]);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="noteTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={handleTitleChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="noteContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={handleContentChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="noteCategories">
            <Form.Label>Categories:</Form.Label>
            <div style={{borderRadius: '5px', padding: '10px', border: '1px solid #ced4da'}}>
              {categories.length > 0 ?
                categories.map((category, index) => (
                  <div key={index} className="d-flex align-items-center mb-2" style={{backgroundColor: '#e9ecef', borderRadius: '10px', padding: '5px'}}>
                    <span>{category}</span>
                    <XSquare className="ml-2" onClick={() => handleRemoveCategory(category)} />
                  </div>
                )) : <div style={{height: '38px'}}></div>
              }
            </div>
            <Form.Label className="mt-3">Add Category:</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="New category"
                value={newCategory}
                onChange={handleNewCategoryChange}
              />
              <Button variant="secondary" onClick={handleAddCategoryClick} className="ml-2">
                Add
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateClick} disabled={isDisabled}>
          Create Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateNoteModal;
