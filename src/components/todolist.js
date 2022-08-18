import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Sort from "./sort";

class ToDoList extends Component {
  state = {
    title: "All Tasks",
    tasks: [],
    sortedTasks: [],
    value: "",
    id: 0,
    currentId: 0,
    show: false,
    show1: false,
  };

  handleClose = () => {
    const show = false;
    const show1 = false;
    this.setState({ show1 });
    this.setState({ show });
  };
  handleShow = () => {
    const show = true;
    this.setState({ show });
  };

  handleAdd = (value) => {
    const valueObj = {
      id: this.state.id,
      task: value,
      crossed: false,
    };
    const id = this.state.id + 1;
    this.handleClose();
    const tasks = [...this.state.tasks];
    tasks.push(valueObj);
    this.setState({ tasks });
    this.setState({ id });
    this.setState({ sortedTasks: tasks });
  };

  handleSetValue = (value) => {
    this.setState({ value });
  };

  handleDelete = (e) => {
    const tasks = this.state.tasks.filter(
      (t) => t.id !== Number(e.target.parentNode.id)
    );
    this.setState({ tasks });
    this.setState({ sortedTasks: tasks });
  };

  handleCross = (e) => {
    const tasks = [...this.state.tasks];
    tasks.forEach((t) => {
      if (t.id === Number(e.target.parentNode.id)) {
        t.crossed = !t.crossed;
      }
    });
    this.setState({ tasks });
    this.returnSorted(this.state.title);
  };

  openModal = (e) => {
    const currentId = Number(e.target.parentNode.id);
    this.setState({ currentId });
    const show1 = true;
    this.setState({ show1 });
  };

  handleEdit = () => {
    this.handleClose();
    const tasks = [...this.state.tasks];
    tasks.forEach((t) => {
      if (t.id === this.state.currentId) {
        t.task = this.state.value;
      }
    });
    this.setState(tasks);
  };

  returnSorted(title) {
    if (title === "Completed Tasks") {
      const sortedTasks = this.state.tasks.filter((t) => t.crossed === true);
      this.setState({ sortedTasks });
    } else if (title === "Tasks To Do") {
      const sortedTasks = this.state.tasks.filter((t) => t.crossed === false);
      this.setState({ sortedTasks });
    } else if (title === "All Tasks") {
      const sortedTasks = [...this.state.tasks];
      this.setState({ sortedTasks });
    }
  }

  handleSort = (e) => {
    e.target.parentNode.childNodes.forEach((e) => e.classList.remove("active"));
    e.target.classList.add("active");
    if (e.target.innerText === "To Do") {
      const title = "Tasks To Do";
      this.setState({ title });
      this.returnSorted(title);
    } else if (e.target.innerText === "Completed") {
      const title = "Completed Tasks";
      this.setState({ title });
      this.returnSorted(title);
    } else {
      const title = "All Tasks";
      this.setState({ title });
      this.returnSorted(title);
    }
  };

  render() {
    return (
      <>
        <div className="app-main">
          <Sort onSort={this.handleSort} />
          <div className="app-title">
            <div>
              {this.state.title}
              <span className="badge bg-danger" style={{ marginLeft: "15px" }}>
                {this.state.sortedTasks.length}
              </span>
            </div>
            <div>
              <Button
                className="btn btn-danger"
                variant="primary"
                onClick={this.handleShow}
              >
                + Add task
              </Button>
            </div>
          </div>
          <div className="tasks-list">
            {this.state.sortedTasks.map((task) => (
              <div key={task.id} className="task">
                <div
                  className={task.crossed ? "task-text crossed" : "task-text"}
                >
                  {task.task}
                </div>
                <div className="task-btns" id={task.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    checked={task.crossed}
                    onChange={(e) => this.handleCross(e)}
                  ></input>
                  <i
                    className="fa fa-pencil"
                    aria-hidden="true"
                    onClick={(e) => this.openModal(e)}
                  ></i>
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={(e) => this.handleDelete(e)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Type New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Task</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Max 50 symbols"
                  maxLength="50"
                  onChange={(event) => this.handleSetValue(event.target.value)}
                  style={{ resize: "none" }}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-danger"
              variant="primary"
              onClick={() => this.handleAdd(this.state.value)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.show1} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Task</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Max 50 symbols"
                  maxLength="50"
                  rows={3}
                  onChange={(event) => this.handleSetValue(event.target.value)}
                  style={{ resize: "none" }}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-danger"
              variant="primary"
              onClick={() => this.handleEdit()}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ToDoList;
