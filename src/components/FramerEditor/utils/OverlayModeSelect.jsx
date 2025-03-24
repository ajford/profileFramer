import React from 'react';
import {Form} from "react-bootstrap";

export default function OverlayModeSelect({options, selected, changeHandler, controlId, ...props}) {

  let selectOptions = [];
  for (const k in options){
    let opt = options[k];
    selectOptions.push(
      <option key={opt.key} id={opt.key} value={opt.key}>{opt.name}</option>
    )
  }

  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>Overlay Mode</Form.Label>
      <Form.Select {...props}
                   onChange={changeHandler}
                   value={selected.key}
      >
        {selectOptions}
      </Form.Select>
    </Form.Group>
  )

}
