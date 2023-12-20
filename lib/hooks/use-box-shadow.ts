import { useState, useEffect } from "react";
import BezierEasing from "bezier-easing";

interface BoxShadowOptions {
  angle?: number;
  length?: number;
  finalBlur?: number;
  spread?: number;
  finalTransparency?: number;
}

/**
 * Returns a string of layered box shadows based on user input
 * @param {number} numShadowLayers - The number of layers for the shadow
 * @param {BoxShadowOptions} options - Optional parameters for angle, blur, spread, and transparency
 */
const getBoxShadows = (
  numShadowLayers: number,
  options: BoxShadowOptions = {},
): string => {
  const {
    angle = 40,
    length = 150,
    finalBlur = 100,
    spread = 0,
    finalTransparency = 0.1,
  } = options;

  const angleToRadians = (angle: number): number => {
    return angle * (Math.PI / 180);
  };

  const rgba = (r: number, g: number, b: number, a: number): string =>
    `rgba(${r}, ${g}, ${b}, ${a})`;

  const shadow = (
    left: number,
    top: number,
    blur: number,
    spread: number,
    color: string,
  ): string => `${left}px ${top}px ${blur}px ${spread}px ${color}`;

  const alphaEasing = BezierEasing(0.1, 0.5, 0.9, 0.5);
  const offsetEasing = BezierEasing(0.7, 0.1, 0.9, 0.3);
  const blurEasing = BezierEasing(0.7, 0.1, 0.9, 0.3);

  const easedValues = Array.from({ length: numShadowLayers }, (_, i) => {
    const fraction = (i + 1) / numShadowLayers;
    return {
      alpha: alphaEasing(fraction),
      offset: offsetEasing(fraction),
      blur: blurEasing(fraction),
    };
  });

  const boxShadowValues = easedValues.map(({ alpha, offset, blur }) => {
    const yOffset = offset * Math.cos(angleToRadians(angle)) * length;
    const xOffset = offset * Math.sin(angleToRadians(angle)) * length;

    return [
      xOffset,
      yOffset,
      blur * finalBlur,
      spread,
      alpha * finalTransparency,
    ];
  });

  const shadowString = boxShadowValues
    .map(([leftOffset, topOffset, blur, spread, alpha]) =>
      shadow(leftOffset, topOffset, blur, spread, rgba(0, 0, 0, alpha)),
    )
    .join(",\n");

  return shadowString;
};

/**
 * A function with predefined options for artwork dropshadow
 * @param {number} layers - Number of shadow layers
 * @returns {string} - The string version of the box shadow CSS
 */
const generateArtShadows = (layers: number): string => {
  const opts = {
    longShadow: {
      angle: 40,
      length: 175,
      finalBlur: 75,
      finalTransparency: 0.17,
    },
    shortShadow: {
      angle: 35,
      length: 125,
      finalBlur: 50,
      finalTransparency: 0.13,
    },
    upperShadow: {
      angle: -62,
      length: -100,
      finalBlur: 75,
      finalTransparency: 0.13,
    },
  };

  const shadows =
    getBoxShadows(layers, opts.longShadow) +
    ",\n" +
    getBoxShadows(layers, opts.shortShadow) +
    ",\n" +
    getBoxShadows(layers, opts.upperShadow);

  return shadows;
};

// You can keep the getBoxShadows and generateArtShadows functions
// as-is, or with any optimizations you see fit

/**
 * Custom React hook to generate realistic layered box shadows
 * @param {Number} numShadowLayers - the number of layers for the shadow
 * @param {Object} [options] - optional parameters for angle, blur, spread, and transparency
 * @returns {String} - The string version of the box shadow CSS
 */
const useShadow = (numShadowLayers: number, options: any) => {
  const [shadow, setShadow] = useState("");

  useEffect(() => {
    // You can choose to use either getBoxShadows or generateArtShadows function
    // based on your preference
    const newShadow = getBoxShadows(numShadowLayers, options);
    setShadow(newShadow);
  }, [numShadowLayers, options]);

  return shadow;
};

export default useShadow;
