import { useState } from 'react';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import plus from './img/plus-square.svg';
import minus from './img/dash-square.svg';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setCurrentTask(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = _.uniqueId();
    const task = { id, text: currentTask };
    setTasks((tasks) => [...tasks, task]);
    setCurrentTask('');
    handleClose();
  }

  const handleClick = (id) => (e) => {
    e.preventDefault();
    const index = tasks.findIndex((item) => item.id === id);
    setTasks((tasks) => [...tasks.slice(0, index), ...tasks.slice(index + 1)]);
  }

  return (
    <div className="wrapper">
      <h1 className="mb-4">Список задач</h1>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        <img src={plus} alt="" className="me-3"/>
        Добавить задачу
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> 
            Добавить задачу
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="task">
              <Form.Label visuallyHidden>Новая задача</Form.Label>
              <Form.Control type="text" value={currentTask} onChange={handleChange} autoFocus />
            </Form.Group>
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item className="d-flex justify-content-between" key={task.id}>
            {task.text}
            <Button variant="primary" className="d-flex align-items-center" onClick={handleClick(task.id)}>
              <img src={minus} alt="" />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;
