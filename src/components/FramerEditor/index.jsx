import React, {useEffect, useRef, useState} from 'react';
import {Form, Button} from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import {Stage, Layer} from 'react-konva';
import useImage from 'use-image';

import profilePlaceholder from "./profile_placeholder_female.png";
import ImageWithPlaceholder from "./utils/ImageWithPlaceholder";
import OverlayModeSelect from "./utils/OverlayModeSelect";
import ImageOverlay from "./utils/ImageOverlay";
import PreviewImage from "./utils/PreviewImage";

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const width = 1024;
const height = 1024;

export const OverlayMode = {
  Frame: {key:'frame', name: "Frame Cutout"},
  UpLeft: {key:'up-left', name: "Upper Left"},
  UpRight: {key: 'up-right', name: "Upper Right"},
  DownLeft: {key: 'down-left', name: "Lower Left"},
  DownRight: {key: 'down-right', name: "Lower Right"}
};

function getModeByKey(key){
  for (const k in OverlayMode) {
    if (OverlayMode[k].key === key)
      return OverlayMode[k]
  }
  return null
}

export default function FramerEditor() {

  // Refs
  const stageRef = useRef(null);
  const profileRef = useRef(null);
  const previewRef = useRef(null);
  const overlayRef = useRef(null);

  // Images
  const [placeholderImage] = useImage("/profile_placeholder_female.png")
  const [frameImage] = useImage("/swappable/Frame.png")
  const [blockImage] = useImage("/swappable/Solid.png")

  // States
  const [profileScale, setProfileScale] = useState(1);
  const [overlayScale, setOverlayScale] = useState(.25);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({x:0,y:0})
  const [image, setImage] = useState(null)
  const [previewImg, setPreviewImg] = useState(profilePlaceholder)
  const [overlayMode, setOverlayMode] = useState(OverlayMode.Frame)
  const [hidePreview, setHidePreview] = useState(true);


  useEffect(()=>{
    console.log("UseEffect When?");
    previewRef.src = stageRef.current?.toDataURL();
  })

  function handleProfileScale(event) {
    setProfileScale(parseFloat(event.target.value));
  }

  function handleOverlayScale(event) {
    setOverlayScale(parseFloat(event.target.value));
  }

  function handleUpload(event) {
    let uploadedFile = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        const newImage = new window.Image();
        newImage.title = uploadedFile.name;
        newImage.src = reader.result;
        setImage(newImage);
        setProfileScale(1)
      },
      false,
    );

    reader.readAsDataURL(uploadedFile);
  }

  function handleTogglePreview(event) {
    setPreviewImg(stageRef.current.toDataURL());
    console.log("Config:", stageRef.current?.config)
    setHidePreview(!hidePreview)
  }

  function handleRefreshPreview(event) {
    setPreviewImg(stageRef.current.toDataURL());
  }

  function handleMode(event) {
    let mode = event.target.value;
    let modeByKey = getModeByKey(mode)
    setOverlayMode(modeByKey);
    // handlePreview();
  }

  function handleTest(event) {
  }


  function handleSave(event) {
    const uri = stageRef.current.toDataURL();
    // we also can save uri as file
    downloadURI(uri, 'SlackProfile.png');
  }

  function handleDragEnd(event) {
    setIsDragging(false);
    setPosition({
      x: event.target.x(),
      y: event.target.y(),
    });
    // handlePreview();
  }

  return (
    <Row>
      <Col>
        <Stage width={width} height={height} ref={stageRef} className={["border border-light"]}>
          <Layer>
            <ImageWithPlaceholder image={image}
                                  scaleX={profileScale} scaleY={profileScale}
                                  x={position.x} y={position.y}
                                  draggable
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={handleDragEnd}
                                  ref={profileRef}
                                  onChange={handleRefreshPreview}
            />
          </Layer>
          <Layer listening={false}>
            <ImageOverlay ref={overlayRef}
                          frameImage={frameImage}
                          blockImage={blockImage}
                          overlayMode={overlayMode}
                          overlayScale={overlayScale}
                          fullWidth={width} fullHeight={height}
            />
          </Layer>
        </Stage>
      </Col>
      <Col>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label >Profile Image</Form.Label>
            <Form.Control type="file" onChange={handleUpload}/>
          </Form.Group>
          <Form.Group controlId="scaleInput" className="mb-3">
            <Form.Label>Profile Scale</Form.Label>
            <Form.Range
                        value={profileScale}
                        onChange={handleProfileScale}
                        max={2}
                        min={0}
                        step={0.01}
            />
          </Form.Group>
          <OverlayModeSelect controlId="overlayModeSelect" options={OverlayMode} selected={overlayMode} changeHandler={handleMode} />
          <Form.Group controlId="scaleOverlayInput" className="mb-3" hidden={overlayMode === OverlayMode.Frame}>
            <Form.Label>Overlay Scale</Form.Label>
            <Form.Range
              value={overlayScale}
              onChange={handleOverlayScale}
              max={1}
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group controlId="generatePreview" className="mb-3">
            <Button as="input" type="button" value={hidePreview ? "Show Preview" : "Hide Preview"}
                    onClick={handleTogglePreview} className={["mx-2"]}/>
            <Button as="input" type="button" value="Refresh Preview" hidden={hidePreview} onClick={handleRefreshPreview}
                    className={["mx-2"]}/>
            <Button as="input" type="button" variant={"success"} value="Save" onClick={handleSave}
                    className={["mx-2"]}/>
          </Form.Group>
        </Form>
        <div>
          <PreviewImage ref={previewRef} stageRef={stageRef}
                        height={256} width={256}
                        className={["border", "border-light"]}
                        hidden={hidePreview}
          />
        </div>

      </Col>
    </Row>
)

}