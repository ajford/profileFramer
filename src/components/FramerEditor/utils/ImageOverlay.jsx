import React from 'react';
import {Image} from "react-konva";
import {OverlayMode} from "../index";

export default function ImageOverlay(
  {blockImage, frameImage, overlayMode, overlayScale, ...props}
) {

  const radiusFactor = 0.2
  let x=0, y=0, image=frameImage, width=props.fullWidth, height=props.fullHeight, radius=[0,0,0,0];

  switch(overlayMode) {
    case OverlayMode.UpLeft:
      image=blockImage;
      width=props.fullWidth*overlayScale;
      height=props.fullHeight*overlayScale;
      radius=[0,0,width*radiusFactor,0]
      break;
    case OverlayMode.UpRight:
      image=blockImage;
      width=props.fullWidth*overlayScale;
      height=props.fullHeight*overlayScale;
      x=props.fullWidth-width;
      radius=[0,0,0,width*radiusFactor]
      break;
    case OverlayMode.DownLeft:
      image=blockImage;
      width=props.fullWidth*overlayScale;
      height=props.fullHeight*overlayScale;
      y=props.fullHeight-height;
      radius=[0, width*radiusFactor,0,0]
      break;
    case OverlayMode.DownRight:
      image=blockImage;
      width=props.fullWidth*overlayScale;
      height=props.fullHeight*overlayScale;
      x=props.fullWidth-width;
      y=props.fullHeight-height;
      radius=[width*radiusFactor,0,0,0]
      break;
    default:
      image=frameImage;
      width=props.fullWidth;
      height=props.fullHeight;
      x=0;
      y=0;
      radius=[0,0,0,0]
      break;
  }

  return (
    <Image image={image}
           width={width} height={height}
           x={x} y={y}
           cornerRadius={radius}
    />
  )
}
