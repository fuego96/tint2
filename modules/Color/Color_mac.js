module.exports = (function() {
  if(global.__TINT.Color) {
    return global.__TINT.Color;
  }
  var $ = process.bridge.objc;
  var TinyColor = require('Color_base');

  /**
   * @class Color
   * @description Creates a new color, this is mainly a convenience class used to convert back to RGBA, most
   *              color properties in Tint accept css-type values such as "rgba(red,blue,green,alpha)" or 
   *              named colors such as "red" or "blue".
   * @see ColorPanel
   * @see ColorWell
   */
  /**
   * @new
   * @memberof Color
   * @description Creates a color object with the specified type and components.
   * @param {string} value A string representing the color (css type values)
   */
  function Color(type) {
    if(type instanceof Color) {
      this.native = type.native;
    } else if(type.type === '@') {
      this.native = type;
    } else {
      var rgba = (new TinyColor(type)).toRgb();
      if(rgba.r > 1) {
        rgba.r = rgba.r / 255;
      }
      if(rgba.g > 1) {
        rgba.g = rgba.g / 255;
      }
      if(rgba.b > 1) {
        rgba.b = rgba.b / 255;
      }
      if(rgba.a > 1) {
        rgba.a = rgba.a / 255;
      }
      this.native = $.NSColor('colorWithRed',rgba.r,'green',rgba.g,'blue',rgba.b,'alpha',rgba.a);
    }
  }

  /**
   * @member red
   * @type {number}
   * @memberof Color
   * @description Gets the amount of red in the color.
   */
  Object.defineProperty(Color.prototype, 'red', { get:function() { return this.native('redComponent'); }});
  /**
   * @member blue
   * @type {number}
   * @memberof Color
   * @description Gets the amount of blue in the color.
   */
  Object.defineProperty(Color.prototype, 'blue', { get:function() { return this.native('blueComponent'); }});
  /**
   * @member green
   * @type {number}
   * @memberof Color
   * @description Gets the amount of green in the color.
   */
  Object.defineProperty(Color.prototype, 'green', { get:function() { return this.native('greenComponent'); }});
  /**
   * @member alpha
   * @type {number}
   * @memberof Color
   * @description Gets the amount of translucency in the color.
   */
  Object.defineProperty(Color.prototype, 'alpha', { get:function() { return this.native('alphaComponent'); }});

  global.__TINT.Color = Color;
  return Color;
})();
