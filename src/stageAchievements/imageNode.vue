<template>
    <div class="common-layout">
        <!--左侧元素区域-->
        <div id="PaletteDiv" class="layout-aside">
            <div class="panel-section" style="height: 40%; overflow: auto">
                <span class="section-title">基本几何图形</span>
                <div class="baseBlockClass">
                    <div id="rectangle" class="elementClass" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="矩形" placement="top-start">
                            <img src="/src/assets/base/rectangle.svg" style="width: 80%; height: 80%;" id="rectangle" />
                        </el-tooltip>
                    </div>
                    <div id="RoundedRectangle" class="elementClass" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="圆角矩形" placement="top-start">
                            <img src="/src/assets/base/RoundedRectangle.svg" style="width: 80%; height: 80%;"
                                id="RoundedRectangle" />
                        </el-tooltip>
                    </div>
                    <div id="Square" class="elementClass" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="正方形" placement="top-start">
                            <img src="/src/assets/base/Square.svg" style="width: 80%; height: 80%;" id="Square" />
                        </el-tooltip>
                    </div>
                    <div id="rotundity" class="elementClass" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="圆形" placement="top-start">
                            <img src="/src/assets/base/rotundity.svg" style="width: 80%; height: 80%;" id="rotundity" />
                        </el-tooltip>
                    </div>
                    <div id="triangle" class="elementClass" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="三角形" placement="top-start">
                            <img src="/src/assets/base/triangle.svg" style="width: 80%; height: 80%;" id="triangle" />
                        </el-tooltip>
                    </div>
                    <div id="rhombus" class="elementClass" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="菱形" placement="top-start">
                            <img src="/src/assets/base/rhombus.svg" style="width: 80%; height: 80%;" id="rhombus" />
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="panel-section" style="height: 40%; overflow: auto;">
                <span class="section-title">SVG几何图形</span>
                <div class="svgBlockClass">
                    <div id="lockHopperGeometry" class="svg_class" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="锥体1" placement="top-start">
                            <img src="/src/assets/svg/lockHopper.svg" style="width: 80%; height: 80%;"
                                id="lockHopperGeometry">
                        </el-tooltip>
                    </div>
                    <div id="troughGeometry" class="svg_class" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="锥体2" placement="top-start">
                            <img src="/src/assets/svg/trough.svg" style="width: 80%; height: 70%;"
                                id="troughGeometry" />
                        </el-tooltip>
                    </div>
                    <div id="cylinderGeometry" class="svg_class" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="柱体" placement="top-start">
                            <img src="/src/assets/svg/cylinder.svg" style="width: 80%; height: 60%;"
                                id="cylinderGeometry" />
                        </el-tooltip>
                    </div>
                    <div id="pipGeometry" class="svg_class" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="管道" placement="top-start">
                            <img src="/src/assets/svg/pip.svg" style="width: 80%; height: 80%;" id="pipGeometry" />
                        </el-tooltip>
                    </div>
                    <div id="pentagonGeometry" class="svg_class" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="五边形" placement="top-start">
                            <img src="/src/assets/svg/pentagon.svg" style="width: 80%; height: 80%;" id="pentagonGeometry" />
                        </el-tooltip>
                    </div>
                    <div id="sixLineGeometry" class="svg_class" draggable="true" @dragstart="dragstart">
                        <el-tooltip class="box-item" effect="dark" content="六边形" placement="top-start">
                            <img src="/src/assets/svg/sixLine.svg" style="width: 80%; height: 80%;"
                                id="sixLineGeometry" />
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="panel-section"
                style="height: 20%; display: flex; flex-direction: column; justify-content: center;">
                <span class="section-title">元素操作按钮</span>
                <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-around;">
                    <el-button @click="toggleEditMode">切换编辑/预览模式</el-button>
                    <el-button @click="exportData">导出数据</el-button>
                </div>
            </div>
        </div>
        <!--画布区域-->
        <div id="diagramDiv" class="layout-main" @dragover="event => event.preventDefault()"
            @dragenter="event => event.preventDefault()" @drop="drop">
        </div>
    </div>

    <el-dialog v-model="dialogVisible" title="给当前节点添加连线端口" style="width: 675px; height: 200px; position: relative;">
        <div>
            <div v-if="changeModel"
                style="display: flex; justify-items: center; align-items: center; margin-top: 5px; margin-bottom: 2px;">
                <span>节点连接线端口的添加：</span>
                <div style="margin-left: 10px;">
                    <el-button @click="addPort('top')" style="margin-right: 8px;">添加上端口</el-button>
                    <el-button @click="addPort('bottom')" style="margin-right: 8px;">添加下端口</el-button>
                    <el-button @click="addPort('left')" style="margin-right: 8px;">添加左端口</el-button>
                    <el-button @click="addPort('right')" style="margin-right: 8px;">添加右端口</el-button>
                </div>
            </div>
            <span style="font-size: smaller; color: gray;">Tips：创建完端口后，可以通过Shift+鼠标左键，来移动端口的位置</span>
            <el-button style="right: 10px; position: absolute; right: 30px; bottom: 20px;"
                @click="dialogVisible = false">关闭</el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import go from 'gojs';
import { onMounted, ref } from 'vue';
import { PortShiftingTool } from './extensions/PortShiftingTool';
import { ResizeMultipleTool } from './extensions/ResizeMultipleTool';
import { ElMessage } from 'element-plus';
import { GuidedDraggingTool } from './extensions/GuidedDraggingTool';
import { LinkLabelOnPathDraggingTool } from './extensions/LinkLabelOnPathDraggingTool';
import { NodeLabelDraggingTool } from './extensions/NodeLabelDraggingTool';
import { RotateMultipleTool } from './extensions/RotateMultipleTool';

const $ = go.GraphObject.make;
var myDiagram: any;
const dialogVisible = ref(false)
const pipeDialogVisible = ref(false)
const changeModel = ref(true)

// 计算偏移量变量
const dragStartOffsetX = ref()
const dragStartOffsetY = ref()

// 端口模板
const portPanel = $(go.Panel,
    {
        portId: "Top",
        fromSpot: go.Spot.Top,
        toSpot: go.Spot.Top,
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
        alignment: go.Spot.Top,
        visible: true,
        contextMenu:
            $("ContextMenu",
                $("ContextMenuButton",
                    $(go.TextBlock, "Remove Port", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                    {
                        click: (obj: any) => removePort(obj.part.adornedObject),
                        "ButtonBorder.fill": "white",
                        "_buttonFillOver": "skyblue"
                    }
                )
            ),
    },
    new go.Binding('portId', 'portId'),
    new go.Binding('alignment', 'portKey', (portKey: string) => {
        switch (portKey) {
            case "top": return go.Spot.Top;
            case "bottom": return go.Spot.Bottom;
            case "left": return go.Spot.Left;
            case "right": return go.Spot.Right;
            default: return go.Spot.Top;
        }
    }),
    new go.Binding('fromSpot', 'portKey', (portKey: string) => {
        switch (portKey) {
            case "top": return go.Spot.Top;
            case "bottom": return go.Spot.Bottom;
            case "left": return go.Spot.Left;
            case "right": return go.Spot.Right;
            default: return go.Spot.Top;
        }
    }),
    new go.Binding('toSpot', 'portKey', (portKey: string) => {
        switch (portKey) {
            case "top": return go.Spot.Top;
            case "bottom": return go.Spot.Bottom;
            case "left": return go.Spot.Left;
            case "right": return go.Spot.Right;
            default: return go.Spot.Top;
        }
    }),
    $(go.Shape, 'Rectangle',
        {
            strokeWidth: 1,
            desiredSize: new go.Size(6, 6),
        },
        new go.Binding('visible', 'visible'),
    )
)

// svg元素Geometry字符串
var lockHopperGeometry = go.Geometry.parse("XFM 0 95.11 L 0 25.37 C 28.47 0 71.53 0 100 25.37 L 100 95.11 L 50 125 Z M 0 25.37 M 0 95.11");
var troughGeometry = go.Geometry.parse("XFM 0 0 L 90 0 L 90 73.33 L 45 110 L 0 73.33 Z");
var cylinderGeometry = go.Geometry.parse("XFM 0 15 C 0 6.72 15.67 0 35 0 C 54.33 0 70 6.72 70 15 L 70 95 C 70 103.28 54.33 110 35 110 C 15.67 110 0 103.28 0 95 Z");
var pipGeometry = go.Geometry.parse("XFM 5.25 30 L 78.05 30 C 83.85 30 88.55 23.28 88.55 15 C 88.55 6.72 83.85 0 78.05 0 L 5.25 0 C -0.55 0 -5.25 6.72 -5.25 15 C -5.25 23.28 -0.55 30 5.25 30 Z M 5.25 0 M 78.05 0");
var pentagonGeometry = go.Geometry.parse("XFM 50 0 L 100 50 L 80 100 L 20 100 L 0 50 Z");
var sixLineGeometry = go.Geometry.parse("XFM 0 50 L 43.3 0 L 86.6 50 L 86.6 150 L 43.3 200 L 0 150 Z");

function initDiagram() {
    myDiagram = $(go.Diagram, "diagramDiv", {
        "undoManager.isEnabled": true,
        'grid.visible': false,  // 画布上面是否出现网格
        "grid.gridCellSize": new go.Size(5, 5),  // 设置背景网格的大小
        "toolManager.mouseWheelBehavior": go.WheelMode.Zoom,
        contentAlignment: go.Spot.Center, // 元素位置移动后始终处于在画布正中间
        resizingTool: new ResizeMultipleTool(),  // 自定义ResizeMultipleTool()方法来设置元素大小的缩放
        draggingTool: new GuidedDraggingTool(),  // 使用节点对齐辅助
        // 设置辅助对齐的线条的样式
        "draggingTool.horizontalGuidelineColor": "blue",  // 水平两侧的辅助线条为蓝色
        "draggingTool.verticalGuidelineColor": "blue",    // 垂直两侧的辅助线条为蓝色
        "draggingTool.centerGuidelineColor": "green",     // 节点中心的水平和垂直对齐的辅助线条为绿色
        "draggingTool.guidelineWidth": 1,    // 设置辅助对齐的线条的粗细
        // 旋转节点
        rotatingTool: new RotateMultipleTool(),
    });

    myDiagram.toolManager.mouseMoveTools.insertAt(0, new PortShiftingTool());  // 设置端口移动
    myDiagram.toolManager.mouseMoveTools.insertAt(0, new LinkLabelOnPathDraggingTool());  // 设置连接上的文本只能沿着连接移动
    myDiagram.toolManager.mouseMoveTools.insertAt(0, new NodeLabelDraggingTool());  // 设置节点上的文本可以移动

    myDiagram.nodeTemplate =
        $(go.Node, "Spot",
            {
                resizable: true,
                rotatable: true
            },
            new go.Binding("location", "loc"),  // 进行元素位置信息的绑定
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            // 端口模板
            new go.Binding('itemArray', 'portArray'), {
            itemTemplate: portPanel,
        },
            $(go.Panel, 'Spot',
                $(go.Panel, 'Spot',
                    $(go.Shape, "RoundedRectangle",
                        {
                            fill: "white",
                            stroke: "black",
                            strokeWidth: 2.0
                        },
                        new go.Binding("fill", "color"),
                        new go.Binding("figure", "figure"),
                    ),
                    $(go.TextBlock,
                        {
                            margin: 10,
                            textAlign: 'center',
                            font: 'bold 14px Segoe UI,sans-serif',
                            stroke: '#484848',
                            editable: true,
                            _isNodeLabel: true,
                            cursor: "move"
                        },
                        new go.Binding('text', 'key').makeTwoWay(),
                    ),
                    {
                        toolTip:  // 定义节点工具提示
                            $("ToolTip",
                                $(go.TextBlock, { margin: 4 },
                                    new go.Binding("text", "key"))  // 绑定节点的颜色信息
                            )
                    },
                    {
                        contextMenu:   // 为每个节点定义上下文菜单
                            $("ContextMenu",
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Cut", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                    {
                                        click: (e: any) => e.diagram.commandHandler.cutSelection(),
                                        "ButtonBorder.fill": "white",
                                        "_buttonFillOver": "skyblue",
                                    }
                                ),
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Copy", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                    {
                                        click: (e: any) => e.diagram.commandHandler.copySelection(),
                                        "ButtonBorder.fill": "white",
                                        "_buttonFillOver": "skyblue",
                                    }
                                ),
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                    {
                                        click: () => changeColor(myDiagram, "#eaffd0"),
                                        "ButtonBorder.fill": "#eaffd0",
                                        "_buttonFillOver": "skyblue",
                                    }
                                ),
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                    {
                                        click: () => changeColor(myDiagram, "#f38181"),
                                        "ButtonBorder.fill": "#f38181",
                                        "_buttonFillOver": "skyblue",
                                    }
                                ),
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                    {
                                        click: () => changeColor(myDiagram, "#95e1d3"),
                                        "ButtonBorder.fill": "#95e1d3",
                                        "_buttonFillOver": "skyblue",
                                    }
                                ),
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                    {
                                        click: () => changeColor(myDiagram, "#fce38a"),
                                        "ButtonBorder.fill": "#fce38a",
                                        "_buttonFillOver": "skyblue",
                                    }
                                ),
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                    {
                                        click: () => changeColor(myDiagram, "#ba55d4"),
                                        "ButtonBorder.fill": "#ba55d4",
                                        "_buttonFillOver": "skyblue",
                                    }
                                ),
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                    {
                                        click: () => changeColor(myDiagram, "#d9a521"),
                                        "ButtonBorder.fill": "#d9a521",
                                        "_buttonFillOver": "skyblue",
                                    }
                                )
                            )
                    },
                    {
                        doubleClick: function () {   // 在节点中鼠标左键双击打开添加节点端口弹出框
                            dialogVisible.value = true;
                        }
                    }
                )
            ),
        ),

        // SVG图片节点模板
        myDiagram.nodeTemplateMap.add('svgNode',
            $(go.Node, "Spot",
                {
                    resizable: true,
                    rotatable: true
                },
                new go.Binding("location", "loc"),
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),  // 进行元素位置信息的绑定
                new go.Binding('itemArray', 'portArray'), {
                itemTemplate: portPanel,
            },
                $(go.Panel, 'Spot',
                    $(go.Panel, 'Spot',
                        $(go.Shape, "RoundedRectangle",
                            {
                                stroke: "black",
                                fill: "white",
                                strokeWidth: 2.0
                            },
                            new go.Binding("fill", "color"),
                            new go.Binding('geometry', 'geometry').makeTwoWay(),
                        ),
                        $(go.TextBlock,
                            {
                                margin: 10,
                                textAlign: 'center',
                                font: 'bold 14px Segoe UI,sans-serif',
                                stroke: '#484848',
                                editable: true,
                                _isNodeLabel: true,
                                cursor: "move",
                            },
                            new go.Binding('text', 'key').makeTwoWay(),
                        ),
                        {
                            toolTip:  // 定义节点工具提示
                                $("ToolTip",
                                    $(go.TextBlock, { margin: 4 },
                                        new go.Binding("text", "key"))  // 绑定节点的颜色信息
                                )
                        },
                        {
                            contextMenu:   // 为每个节点定义上下文菜单
                                $("ContextMenu",
                                    $("ContextMenuButton",
                                        $(go.TextBlock, "Cut", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                        {
                                            click: (e: any) => e.diagram.commandHandler.cutSelection(),
                                            "ButtonBorder.fill": "white",
                                            "_buttonFillOver": "skyblue",
                                        }
                                    ),
                                    $("ContextMenuButton",
                                        $(go.TextBlock, "Copy", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                        {
                                            click: (e: any) => e.diagram.commandHandler.copySelection(),
                                            "ButtonBorder.fill": "white",
                                            "_buttonFillOver": "skyblue",
                                        }
                                    ),
                                    $("ContextMenuButton",
                                        $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                        {
                                            click: () => changeColor(myDiagram, "#eaffd0"),
                                            "ButtonBorder.fill": "#eaffd0",
                                            "_buttonFillOver": "skyblue",
                                        }
                                    ),
                                    $("ContextMenuButton",
                                        $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                        {
                                            click: () => changeColor(myDiagram, "#f38181"),
                                            "ButtonBorder.fill": "#f38181",
                                            "_buttonFillOver": "skyblue",
                                        }
                                    ),
                                    $("ContextMenuButton",
                                        $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                        {
                                            click: () => changeColor(myDiagram, "#95e1d3"),
                                            "ButtonBorder.fill": "#95e1d3",
                                            "_buttonFillOver": "skyblue",
                                        }
                                    ),
                                    $("ContextMenuButton",
                                        $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                        {
                                            click: () => changeColor(myDiagram, "#fce38a"),
                                            "ButtonBorder.fill": "#fce38a",
                                            "_buttonFillOver": "skyblue",
                                        }
                                    ),
                                    $("ContextMenuButton",
                                        $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                        {
                                            click: () => changeColor(myDiagram, "#ba55d4"),
                                            "ButtonBorder.fill": "#ba55d4",
                                            "_buttonFillOver": "skyblue",
                                        }
                                    ),
                                    $("ContextMenuButton",
                                        $(go.TextBlock, "Set Color", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                                        {
                                            click: () => changeColor(myDiagram, "#d9a521"),
                                            "ButtonBorder.fill": "#d9a521",
                                            "_buttonFillOver": "skyblue",
                                        }
                                    )
                                )
                        },
                        {
                            doubleClick: function () {   // 在节点中鼠标左键双击打开添加节点端口弹出框
                                dialogVisible.value = true;
                            }
                        }
                    )
                ),
            )
        );

    // 节点间的连线模板
    myDiagram.linkTemplate =
        $(go.Link,
            {
                routing: go.Routing.Orthogonal,
                curve: go.Curve.JumpGap,
                corner: 10,
                adjusting: go.LinkAdjusting.End,
                reshapable: true,  // 设置连接线的形态是否可以被修改
                resegmentable: true,  // 设置连接线可以分段的编辑
                selectable: true,
                toEndSegmentLength: 20
            },
            $(go.Shape,  // 链接线的样式
                {
                    strokeWidth: 1.5
                }
            ),
            $(go.Shape,  // 箭头的样式
                {
                    toArrow: "standard",
                    stroke: null
                }
            ),
            {
                doubleClick: function () {   // 在节点中鼠标左键双击打开添加管道弹出框
                    pipeDialogVisible.value = true;
                }
            },
        );

    // 画布提示工具函数
    function diagramInfo(model: any) {
        return "Model:\n" + model.nodeDataArray.length + " nodes, " + model.linkDataArray.length + " links";
    };

    // 当未覆盖任何节点时，提供图表背景的工具提示
    myDiagram.toolTip =
        $("ToolTip",
            $(go.TextBlock, { margin: 4 },
                new go.Binding("text", "", diagramInfo)) // 绑定函数转换器显示相关的信息
        );

    myDiagram.contextMenu =
        $("ContextMenu",
            // 创建新节点上下文按钮
            $("ContextMenuButton",
                $(go.TextBlock, "New Node", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                {
                    click: function (e: any) {
                        e.diagram.commit(function (d: any) {
                            var data = {
                                key: "new node",
                                color: 'aqua',
                                portArray: [],
                                markArray: [],
                                category: ""
                            };
                            d.model.addNodeData(data);
                            var part = d.findPartForData(data);
                            // 在ContextMenuTool中设置保存mouseDownPoint的位置
                            // 节点创建的位置就是鼠标右键的位置
                            if (part) {
                                part.location = d.toolManager.contextMenuTool.mouseDownPoint;
                            }
                        }, 'new node');
                    },
                    "ButtonBorder.fill": "white",
                    "_buttonFillOver": "skyblue",
                }
            ),
            $("ContextMenuButton",
                $(go.TextBlock, "Paste", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                {
                    click: (e: any) => e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint),
                    "ButtonBorder.fill": "white",
                    "_buttonFillOver": "skyblue",
                }
            ),
            // 撤销按钮
            $("ContextMenuButton",
                $(go.TextBlock, "Undo", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                {
                    click: function (e: any) { e.diagram.commandHandler.undo(); },
                    "ButtonBorder.fill": "white",
                    "_buttonFillOver": "skyblue",
                },
                new go.Binding("visible", "", function (o: any) {  // 根据是否有可撤销的操作来决定是否可见
                    if (o && o.diagram) {
                        return o.diagram.commandHandler.canUndo();  // 可以撤销返回true，否则返回false
                    }
                    return false;
                }).ofObject()),
            // 重做按钮
            $("ContextMenuButton",
                $(go.TextBlock, "Redo", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                {
                    click: function (e: any) { e.diagram.commandHandler.redo(); },
                    "ButtonBorder.fill": "white",
                    "_buttonFillOver": "skyblue",
                },
                new go.Binding("visible", "", function (o: any) {   // 根据是否有可重做的操作来决定是否可见
                    if (o && o.diagram) {
                        return o.diagram.commandHandler.canRedo();  // 可以重做返回true，否则返回false
                    }
                    return false;
                }).ofObject()),
        );

    // 如果以信息面板端口为终点/起点的连接线，使用infoPanelLink类型的连接线
    myDiagram.addDiagramListener("LinkDrawn", function (e: any) {
        var link = e.subject;
        var fromNode = link.fromNode;
        var toNode = link.toNode;
        // 检查连接的起点或终点是否是信息面板
        if ((fromNode && fromNode.category === "infoPanel") || (toNode && toNode.category === "infoPanel")) {
            // 设置连接的类别为 infoPanelLink
            myDiagram.model.set(link.data, "LinkCategory", "infoPanelLink");
        }
    });
    // 节点数组
    const nodeDataArray = <any>[];
    // 连线数组
    const linkDataArray = <any>[];

    myDiagram.model =
        $(go.GraphLinksModel,
            {
                linkFromPortIdProperty: "fromPort",
                linkToPortIdProperty: "toPort",
                linkLabelKeysProperty: "labelKeys",
                nodeDataArray: nodeDataArray,
                linkDataArray: linkDataArray
            }
        );

    myDiagram.model.linkCategoryProperty = "LinkCategory";
}

// 导出画布中的节点和连线数据
// 导出画布中的节点和连线数据为JSON文件
function exportData() {
    // 获取图表数据
    const diagramData = myDiagram.model.toJson();
    try {
        // 创建JSON字符串
        const dataStr = JSON.stringify(JSON.parse(diagramData), null, 2); // 使用2个空格缩进美化输出
        // 创建Blob对象
        const blob = new Blob([dataStr], { type: 'application/json' });
        // 创建下载链接
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram-data.json'; // 设置下载文件名
        // 触发点击事件下载文件
        document.body.appendChild(a);
        a.click();
        // 清理
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    } catch (error) {
        console.error("Error exporting data:", error);
    }
}

// 获取拖动开始时的偏移量
function dragstart(event: any) {
    const target = event.target;
    dragStartOffsetX.value = event.offsetX - target.clientWidth / 2;
    dragStartOffsetY.value = event.offsetY - target.clientHeight / 2;

    // 设置拖动数据  基本图形
    if (target.id === "rectangle") {   // 矩形
        event.dataTransfer.setData("node-type", "rectangle");
    } else if (target.id === "RoundedRectangle") {   // 圆角矩形
        event.dataTransfer.setData("node-type", "RoundedRectangle");
    } else if (target.id === "Square") {   // 正方形形
        event.dataTransfer.setData("node-type", "Square");
    } else if (target.id === "rotundity") {   // 圆形
        event.dataTransfer.setData("node-type", "rotundity");
    } else if (target.id === "triangle") {    // 三角形
        event.dataTransfer.setData("node-type", "triangle");
    } else if (target.id === "rhombus") {    // 菱形
        event.dataTransfer.setData("node-type", "rhombus");
    }

    // 设置拖动数据  SVG图形
    if (target.id === "lockHopperGeometry") {
        event.dataTransfer.setData("node-type", "lockHopperGeometry");
    } else if (target.id === "troughGeometry") {
        event.dataTransfer.setData("node-type", "troughGeometry");
    } else if (target.id === "cylinderGeometry") {
        event.dataTransfer.setData("node-type", "cylinderGeometry");
    } else if (target.id === "pipGeometry") {
        event.dataTransfer.setData("node-type", "pipGeometry");
    } else if (target.id === "pentagonGeometry") {
        event.dataTransfer.setData("node-type", "pentagonGeometry");
    } else if (target.id === "sixLineGeometry") {
        event.dataTransfer.setData("node-type", "sixLineGeometry");
    }
}

// html元素拖动到画布中
function drop(event: any) {
    event.preventDefault();  // 不要执行浏览器的默认操作，执行下面自定义的函数方法
    const target = event.target;  // 指向事件触发的原始元素
    // 获取像素比率
    const pixelRatio = myDiagram.computePixelRatio();
    if (!(target instanceof HTMLCanvasElement)) return;
    // 获取目标元素的边界框
    const bbox = target.getBoundingClientRect();
    let bbw = bbox.width;
    if (bbw === 0) bbw = 0.001;
    let bbh = bbox.height;
    if (bbh === 0) bbh = 0.001;
    // 计算鼠标在画布上的位置
    const mx = event.clientX - bbox.left * (target.width / pixelRatio / bbw);
    const my = event.clientY - bbox.top * (target.height / pixelRatio / bbh);
    const point = myDiagram.transformViewToDoc(new go.Point(mx - dragStartOffsetX.value, my - dragStartOffsetY.value));
    // 开始一个新的事务
    myDiagram.startTransaction('new node');
    // 获取拖动数据
    let nodeType = event.dataTransfer.getData("node-type");
    let category = "";
    let color = '';
    let key = "";
    let size = '';
    let figure = '';
    if (nodeType === "rectangle") {  // 矩形
        key = '请输入内容';
        size = '150 75';
        category = "请输入内容";
        figure = 'Rectangle';
        color = 'white';
    }
    if (nodeType === "RoundedRectangle") {  // 圆角矩形
        key = '请输入内容';
        size = '150 75';
        category = "请输入内容";
        figure = 'RoundedRectangle';
        color = 'white';
    }
    if (nodeType === "Square") {  // 正方形
        key = '请输入内容';
        size = '75 75';
        category = "请输入内容";
        figure = 'Square';
        color = 'white';
    }
    if (nodeType === "rotundity") {  // 圆形
        key = '请输入内容';
        size = '75 75';
        category = "请输入内容";
        figure = 'Ellipse';
        color = 'white';
    }
    if (nodeType === "triangle") {  // 三角形
        key = '请输入内容';
        size = '100 100';
        category = "请输入内容";
        figure = 'Triangle';
        color = 'white';
    }
    if (nodeType === "rhombus") {  // 菱形
        key = '请输入内容';
        size = '150 75';
        category = "请输入内容";
        figure = 'Diamond';
        color = 'white';
    }
    // SVG图形
    if (nodeType === "lockHopperGeometry") {
        const newData = {
            key: "请输入内容",
            size: '100 135',
            loc: new go.Point(point.x, point.y),
            portArray: [],
            category: "svgNode",  // 关键：确保category正确
            geometry: lockHopperGeometry  // 提供几何图形数据
        };
        myDiagram.model.addNodeData(newData);
    }
    if (nodeType === "troughGeometry") {
        const newData = {
            key: "请输入内容",
            size: '100 135',
            loc: new go.Point(point.x, point.y),
            portArray: [],
            category: "svgNode",  // 关键：确保category正确
            geometry: troughGeometry  // 提供几何图形数据
        };
        myDiagram.model.addNodeData(newData);
    }
    if (nodeType === "cylinderGeometry") {
        const newData = {
            key: "请输入内容",
            size: '80 130',
            loc: new go.Point(point.x, point.y),
            portArray: [],
            category: "svgNode",  // 关键：确保category正确
            geometry: cylinderGeometry  // 提供几何图形数据
        };
        myDiagram.model.addNodeData(newData);
    }
    if (nodeType === "pipGeometry") {
        const newData = {
            key: "请输入内容",
            size: '200 100',
            loc: new go.Point(point.x, point.y),
            portArray: [],
            category: "svgNode",  // 关键：确保category正确
            geometry: pipGeometry  // 提供几何图形数据
        };
        myDiagram.model.addNodeData(newData);
    }
    if (nodeType === "pentagonGeometry") {
        const newData = {
            key: "请输入内容",
            size: '100 100',
            loc: new go.Point(point.x, point.y),
            portArray: [],
            category: "svgNode",  // 关键：确保category正确
            geometry: pentagonGeometry  // 提供几何图形数据
        };
        myDiagram.model.addNodeData(newData);
    }
    if (nodeType === "sixLineGeometry") {
        const newData = {
            key: "请输入内容",
            size: '100 100',
            loc: new go.Point(point.x, point.y),
            portArray: [],
            category: "svgNode",  // 关键：确保category正确
            geometry: sixLineGeometry  // 提供几何图形数据
        };
        myDiagram.model.addNodeData(newData);
    }
    const newData = {
        key: key,
        color: color,
        size: size,
        figure: figure,
        loc: new go.Point(point.x, point.y),
        portArray: [],
        category: category
    };
    myDiagram.model.addNodeData(newData);
    myDiagram.commitTransaction('new node');
}

// 添加端口
function addPort(side: string) {
    myDiagram.startTransaction('addPort');
    myDiagram.selection.each((node: any) => {
        // 跳过任何被选定的连接
        if (!(node instanceof go.Node)) return;
        // 计算下一个可用的索引
        let i = 0;
        // 从小到大遍历索引i，获取一个可以使用的索引（没有被占用）
        while (node.findPort(side + i.toString()) !== node) i++;
        // 为新端口设置name，传入的side字符串加上可用的索引
        const name = side + i.toString();
        // 创建一个新的端口数据对象
        const newportdata = {
            portId: name,
            portKey: side
        };
        // 获取要修改的端口数据的数组，索引的属性为portArray
        const arr = node.data.portArray;
        if (arr) {
            // 其添加到端口数据数组中
            myDiagram.model.insertArrayItem(arr, -1, newportdata);
        }
    });
    myDiagram.commitTransaction('addPort');
}

// 删除端口
function removePort(port: any) {
    myDiagram.startTransaction('removePort');
    // console.log(port.portId);  // 如top0
    const pid = port.portId;
    const arr = port.panel.itemArray;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].portId === pid) {
            myDiagram.model.removeArrayItem(arr, i);  // 删除数组中的项
            break;
        }
    }
    myDiagram.commitTransaction('removePort');
}

// 设置一开始画布为编辑模式
const isEditMode = ref(true)

// 切换编辑和预览模式
function toggleEditMode() {
    myDiagram.startTransaction("changeModel");
    isEditMode.value = !isEditMode.value;
    if (isEditMode.value) {
        ElMessage('编辑模式')
    } else {
        ElMessage({
            message: '预览模式',
            type: 'success',
        })
    }
    if (myDiagram) {
        myDiagram.isReadOnly = !isEditMode.value;
        myDiagram.allowEdit = isEditMode.value;

        // 隐藏所有的节点端口
        myDiagram.nodes.each((node: any) => {
            node.ports.each((port: any) => {
                myDiagram.model.setDataProperty(port.data, 'visible', isEditMode.value);
            });
        });
    }
    myDiagram.commitTransaction("changeModel");
}

// 设置节点颜色
function changeColor(diagram: any, color: string) {
    diagram.startTransaction('change color');
    diagram.selection.each((node: any) => {
        if (node instanceof go.Node) {
            var data = node.data;
            diagram.model.setDataProperty(data, 'color', color);
        }
    });
    diagram.commitTransaction('change color');
}

onMounted(() => {
    initDiagram()
});
</script>

<style>
.common-layout {
    display: flex;
    height: 100%;
}

.layout-aside {
    display: flex;
    flex-direction: column;
    width: 15%;
    /* 或其他您希望的宽度 */
    height: 100%;
    border-right: 1px solid #eee;
    background: #f5f5f5;
}

.panel-section {
    padding: 10px;
    box-sizing: border-box;
}

.section-title {
    display: block;
    text-align: center;
    font-weight: bold;
    margin-bottom: 8px;
}

.baseBlockClass,
.svgBlockClass {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

.elementClass,
.svg_class {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;
    aspect-ratio: 1/1;
    background: white;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.layout-main {
    flex-grow: 1;
    height: 100%;
    background: white;
}

.layout-main {
    width: 85%;
    height: 100%;
}

.baseBlockClass {
    width: 100%;
    height: 30%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.svgBlockClass {
    width: 100%;
    height: 30%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.elementClass {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
    text-align: center;
    background-color: #f7f4f4;
}

.svg_class {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #f7f4f4;
}
</style>
