/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import go from 'gojs';

/**
 * The LinkLabelOnPathDraggingTool class lets the user move a label on a {@link Link} while keeping the label on the link's path.
 * This tool only works when the Link has a label marked by the "_isLinkLabel" property.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsJSM/LinkLabelOnPathDragging.html">Link Label On Path Dragging</a> sample.
 * @category Tool Extension
 */
export class LinkLabelOnPathDraggingTool extends go.Tool {
  /**
   * The label being dragged.
   */
  public label: go.GraphObject | null = null;
  private _originalFraction: number = 0.0;

  /**
   * Constructs a LinkLabelOnPathDraggingTool and sets the name for the tool.
   */
  constructor() {
    super();
    this.name = 'LinkLabelOnPathDragging';
  }

  /**
   * From the GraphObject at the mouse point, search up the visual tree until we get to
   * an object that has the "_isLinkLabel" property set to true and that is an immediate child of a Link Panel.
   * @return {GraphObject} This returns null if no such label is at the mouse down point.
   */
  public findLabel(): go.GraphObject | null {
    const diagram = this.diagram;
    const e = diagram.lastInput;
    let elt = diagram.findObjectAt(e.documentPoint, null, null);

    if (elt === null || (!(elt.part instanceof go.Link) && !((elt.part as any)['labeledLink'] instanceof go.Link))) return null;
    while (elt !== null && elt.panel !== elt.part) {
      elt = elt.panel;
    }
    if (elt === null) return null
    // If it's not marked as "_isLinkLabel", don't consider it a label:
    if (!(elt as any)['_isLinkLabel'] && !((elt.part as any)['_isLinkLabel'])) return null;
    return elt;
  }

  /**
   * This tool can only start if the mouse has moved enough so that it is not a click,
   * and if the mouse down point is on a GraphObject "label" in a Link Panel,
   * as determined by {@link #findLabel}.
   */
  public override canStart(): boolean {
    if (!super.canStart()) return false;
    const diagram = this.diagram;
    if (diagram === null) return false;
    // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
    const e = diagram.lastInput;
    if (!e.left) return false;
    if (!this.isBeyondDragSize()) return false;

    return this.findLabel() !== null;
  }

  /**
   * Start a transaction, call findLabel and remember it as the "label" property,
   * and remember the original values for the label's segment properties.
   */
  public override doActivate(): void {
    this.startTransaction('Shifted Label');
    this.label = this.findLabel();
    if (this.label !== null) {
      this._originalFraction = this.label.segmentFraction;
    }
    super.doActivate();
  }

  /**
   * Stop any ongoing transaction.
   */
  public override doDeactivate(): void {
    super.doDeactivate();
    this.stopTransaction();
  }

  /**
   * Clear any reference to a label element.
   */
  public override doStop(): void {
    this.label = null;
    super.doStop();
  }

  /**
   * Restore the label's original value for GraphObject.segment... properties.
   */
  public override doCancel(): void {
    if (this.label !== null) {
      this.label.segmentFraction = this._originalFraction;
    }
    super.doCancel();
  }

  /**
   * During the drag, call {@link #updateSegmentOffset} in order to set the segment... properties of the label.
   */
  public override doMouseMove(): void {
    if (!this.isActive) return;
    this.updateSegmentOffset();
  }

  /**
   * At the end of the drag, update the segment properties of the label and finish the tool,
   * completing a transaction.
   */
  public override doMouseUp(): void {
    if (!this.isActive) return;
    this.updateSegmentOffset();
    this.transactionResult = 'Shifted Label';
    this.stopTool();
  }

  /**
   * Save the label's {@link GraphObject#segmentFraction}
   * at the closest point to the mouse.
   */
  public updateSegmentOffset(): void {
    const lab = this.label;
    if (lab === null) return;
    // const link = lab.part;
    // if (!(link instanceof go.Link) || link.path === null) return;
    var path = null
    if (lab.part instanceof go.Link) {
      path = lab.part.path
    } else if ((lab.part as any)['labeledLink'] instanceof go.Link) {
      path = (lab.part as any)['labeledLink'].path
    }

    const last = this.diagram.lastInput.documentPoint;
    // find the fractional distance along the link path closest to this point
    // const path = link.path;
    if (path.geometry === null) return;
    const localpt = path.getLocalPoint(last);
    if (lab.part instanceof go.Link) {
      lab.segmentFraction = path.geometry.getFractionForPoint(localpt);
    } else if ((lab.part as any)['labeledLink'] instanceof go.Link) {
      (lab.part as any).segmentFraction = path.geometry.getFractionForPoint(localpt);
    }
  }
}
