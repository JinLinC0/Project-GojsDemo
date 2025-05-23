/*
 *  Copyright (C) 1998-2024 by Northwoods Software Corporation. All Rights Reserved.
 */

/*
 * This is an extension and not part of the main GoJS library.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

import * as go from 'gojs';

/**
 * The PortShiftingTool class lets a user move a port on a {@link go.Node}.
 *
 * This tool only works when the Node has a port (any GraphObject) marked with
 * a non-null and non-empty portId that is positioned in a Spot Panel,
 * and the user holds down the Shift key.
 * It works by modifying that port's {@link go.GraphObject.alignment} property.
 *
 * If you want to experiment with this extension, try the <a href="../../samples/PortShifting.html">Port Shifting</a> sample.
 * @category Tool Extension
 */
export class PortShiftingTool extends go.Tool {
  /**
   * The port being shifted.
   */
  port: go.GraphObject | null;
  private _originalAlignment: go.Spot;

  /**
   * Constructs a PortShiftingTool and sets the name for the tool.
   */
  constructor(init?: Partial<PortShiftingTool>) {
    super();
    this.name = 'PortShifting';
    this.port = null;
    this._originalAlignment = go.Spot.Default;
    if (init) Object.assign(this, init);
  }

  /**
   * This tool can only start if the mouse has moved enough so that it is not a click,
   * and if the mouse down point is on a GraphObject "port" in a Spot Panel,
   * as determined by {@link findPort}.
   */
  override canStart(): boolean {
    const diagram = this.diagram;
    if (!super.canStart()) return false;
    // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
    const e = diagram.lastInput;
    if (!e.left || !e.shift) return false;
    if (!this.isBeyondDragSize()) return false;

    return this.findPort() !== null;
  }

  /**
   * From the {@link go.GraphObject} at the mouse point, search up the visual tree until we get to
   * an object that has the {@link go.GraphObject.portId} property set to a non-empty string, that is in a Spot Panel,
   * and that is not the main element of the panel (typically the first element).
   * @returns This returns null if no such port is at the mouse down point.
   */
  findPort(): go.GraphObject | null {
    const diagram = this.diagram;
    const e = diagram.firstInput;
    let elt = diagram.findObjectAt(e.documentPoint, null, null);
    if (elt === null || !(elt.part instanceof go.Node)) return null;

    while (elt !== null && elt.panel !== null) {
      if (elt.panel.type === go.Panel.Spot &&
          elt.panel.findMainElement() !== elt &&
          elt.portId !== null &&
          elt.portId !== '') return elt;
      elt = elt.panel;
    }
    return null;
  }

  /**
   * Start a transaction, call {@link findPort} and remember it as the "port" property,
   * and remember the original value for the port's {@link go.GraphObject.alignment} property.
   */
  override doActivate(): void {
    this.startTransaction('Shifted Label');
    this.port = this.findPort();
    if (this.port !== null) {
      this._originalAlignment = this.port.alignment.copy();
    }
    super.doActivate();
  }

  /**
   * Stop any ongoing transaction.
   */
  override doDeactivate(): void {
    super.doDeactivate();
    this.stopTransaction();
  }

  /**
   * Clear any reference to a port element.
   */
  override doStop(): void {
    this.port = null;
    super.doStop();
  }

  /**
   * Restore the port's original value for GraphObject.alignment.
   */
  override doCancel(): void {
    if (this.port !== null) {
      this.port.alignment = this._originalAlignment;
    }
    super.doCancel();
  }

  /**
   * During the drag, call {@link updateAlignment} in order to set the {@link go.GraphObject.alignment} of the port.
   */
  override doMouseMove(): void {
    if (!this.isActive) return;
    this.updateAlignment();
  }

  /**
   * At the end of the drag, update the alignment of the port and finish the tool,
   * completing a transaction.
   */
  override doMouseUp(): void {
    if (!this.isActive) return;
    this.updateAlignment();
    this.transactionResult = 'Shifted Label';
    this.stopTool();
  }

  /**
   * Save the port's {@link go.GraphObject.alignment} as a fractional Spot in the Spot Panel
   * that the port is in. Thus if the main element changes size, the relative positions
   * of the ports will be maintained. But that does assume that the port must remain
   * inside the main element -- it cannot wander away from the node.
   * This does not modify the port's {@link go.GraphObject.alignmentFocus} property.
   */

  
  // updateAlignment(): void {
  //   if (this.port === null || this.port.panel === null) return;
  //   const last = this.diagram.lastInput.documentPoint;
  //   const main = this.port.panel.findMainElement();
  //   if (main === null) return;
  //   const tl = main.getDocumentPoint(go.Spot.TopLeft);
  //   const br = main.getDocumentPoint(go.Spot.BottomRight);
  //   const x = Math.max(0, Math.min((last.x - tl.x) / (br.x - tl.x), 1));
  //   const y = Math.max(0, Math.min((last.y - tl.y) / (br.y - tl.y), 1));
  //   this.port.alignment = new go.Spot(x, y);
  // }

  // 修改updateAlignment函数，使端口可以在节点旋转后进行正常的移动
  updateAlignment(): void {
    if (this.port === null || this.port.panel === null) return;
    // 获取最后输入的文档点
    const last = this.diagram.lastInput.documentPoint;

    const main = this.port.panel.findMainElement();
    if (main === null) return;

    // 将最后输入的点转换为局部坐标系中的点
    const localPoint = main.getLocalPoint(last);
    const tl = new go.Point(0, 0);
    const br = new go.Point(main.actualBounds.width, main.actualBounds.height);
  
    const x = Math.max(0, Math.min((localPoint.x - tl.x) / (br.x - tl.x), 1));
    const y = Math.max(0, Math.min((localPoint.y - tl.y) / (br.y - tl.y), 1));
    this.port.alignment = new go.Spot(x, y);
  }
}
