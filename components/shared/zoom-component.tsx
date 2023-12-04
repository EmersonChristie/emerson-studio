import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ZoomComponentProps {
  children: React.ReactNode;
}

const ZoomComponent: React.FC<ZoomComponentProps> = ({ children }) => {
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <TransformComponent>{children}</TransformComponent>
          {/* Zoom controls */}
          {/* <div className="controls">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>Reset</button>
          </div> */}
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};

export default ZoomComponent;
