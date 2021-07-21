import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../helpers/CenterModal";
import "./modal.css";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../actions/uiActions";
import { eventAddNew, eventClearActive, eventUpdated } from "../actions/events";

Modal.setAppElement("#root");

const now = moment().minute(0).second(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");
const initForm = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

export const CalendarModal = () => {
  const [formValue, setFormValue] = useState(initForm);
  const { notes, title, start, end } = formValue;
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [isTitleValid, setIsTitleValid] = useState(true);

  const ui = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  useEffect(() => {
    if (activeEvent) {
      setFormValue(activeEvent);
    } else {
      setFormValue(initForm);
    }
  }, [activeEvent, setFormValue]);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActive());
    setFormValue(initForm);
  };

  const handleInputchange = ({ target }) => {
    setFormValue({ ...formValue, [target.name]: target.value });
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValue({ ...formValue, start: e });
  };
  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValue({ ...formValue, end: e });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire("Error", "Las fechas deben ser diferentes", "error");
    }
    if (title.trim().length < 2) {
      setIsTitleValid(false);
    } else {
      setIsTitleValid(true);
    }

    if (activeEvent) {
      dispatch(eventUpdated(formValue));
    } else {
      dispatch(eventAddNew({ ...formValue, id: new Date().getTime() }));
    }
  };

  return (
    <Modal
      isOpen={ui.modalOpen}
      onAfterOpen={ui.modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> {activeEvent ? "Editar evento" : "Nuevo evento"}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          {/* <input className="form-control" placeholder="Fecha inicio" /> */}
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${isTitleValid || `is-invalid`} `}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputchange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputchange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
