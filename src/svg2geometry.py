"""
讲svg图片转成geometry字符串的脚本
1. 没有stroke属性的元素不会被转换。防止有些背景占位元素被转换。
2. 元素内的只有 fill stroke 和 特定元素会被识别。
    path: d
    rect: x y width height
    ellipse: cx cy rx ry
    line: x1 y1 x2 y2
    circle: cx cy r
    polyline: points
"""

import re
import xml.etree.ElementTree as ET

PATH = "{http://www.w3.org/2000/svg}path"
RECT = "{http://www.w3.org/2000/svg}rect"
ELLIPSE = "{http://www.w3.org/2000/svg}ellipse"
LINE = "{http://www.w3.org/2000/svg}line"
CIRCLE = "{http://www.w3.org/2000/svg}circle"
POLYLINE = "{http://www.w3.org/2000/svg}polyline"
POLYGON = "{http://www.w3.org/2000/svg}polygon"


# 读取svg文件.
def read_svg_file(svg_file_path) -> ET.ElementTree:
    tree = ET.parse(svg_file_path)
    return tree

# 判断元素是否有描边.
def element_has_stroke(element: ET.Element) -> bool:
    """
    判断元素是否有描边
    :param element: 元素
    :return: 是否有描边
    """
    try:
        stroke = element.attrib["stroke"]
        if isinstance(stroke, str) and stroke != "none":
            return True
    except KeyError:
        return False
    return False


# 将path标签转换为geometry.
def convert_path_tag_to_geometry(path: ET.Element):
    geometry = ""
    prefix = ""
    # 获取path元素的stroke属性，即描边颜色
    if not element_has_stroke(path):
        return None

    # 获取path元素的fill属性，即填充颜色
    fill = path.attrib["fill"]
    if isinstance(fill, str) and fill != "none":
        prefix = "F"
    else:
        prefix = ""
    # 获取d属性，即路径数据
    d = path.attrib["d"]
    if isinstance(d, str):
        geometry = "X" + prefix + d

    return geometry


def convert_rect_tag_to_geometry(rect: ET.Element):
    prefix = ""

    # 获取rect元素的stroke属性，即描边颜色
    # 不存在描边则直接返回
    if not element_has_stroke(rect):
        return None

    # 获取rect元素的fill属性，即填充颜色
    fill = rect.attrib["fill"]
    if isinstance(fill, str) and fill != "none":
        prefix = "F"
    else:
        prefix = ""

    # 获取rect元素的x、y、width、height属性，即矩形的位置和大小
    x = rect.attrib["x"]
    y = rect.attrib["y"]
    width = rect.attrib["width"]
    height = rect.attrib["height"]
    if isinstance(x, str):
        rect_right = float(x) + float(width)
        rect_bottom = float(y) + float(height)
        geometry = "X"+ prefix+ "M"+ x+ " "+ y+ " "+ "H "+ str(rect_right)+ " "+ "V "+ str(rect_bottom)+ " "+ "H "+ x+ " z"

    return geometry


def convert_ellipse_tag_to_geometry(ellipse: ET.Element):
    geometry = ''
    prefix = ""

    if not element_has_stroke(ellipse):
        return None
    # 获取ellipse元素的fill属性，即填充颜色
    fill = ellipse.attrib["fill"]
    if isinstance(fill, str) and fill != "none":
        prefix = "F"
    else:
        prefix = ""

    # 获取ellipse元素的cx、cy、rx、ry属性，即椭圆的位置和大小
    cx = ellipse.attrib["cx"]
    cy = ellipse.attrib["cy"]
    rx = ellipse.attrib["rx"]
    ry = ellipse.attrib["ry"]
    if (
        isinstance(cx, str)
        and isinstance(cy, str)
        and isinstance(rx, str)
        and isinstance(ry, str)
    ):
        start = str(int(cx) + int(rx))
        geometry = "X"+ prefix+ "M "+ start+ " "+ cy+ " "+ "B0 360 "+ cx+ " "+ cy+ " "+ rx+ " "+ ry

    return geometry


def convert_line_tag_to_geometry(line: ET.Element):
    geometry = ""
    prefix = ""

    if not element_has_stroke(line):
        return None

    # 获取line元素的x1、y1、x2、y2属性，即线段的位置
    x1 = line.attrib["x1"]
    y1 = line.attrib["y1"]
    x2 = line.attrib["x2"]
    y2 = line.attrib["y2"]
    if (
        isinstance(x1, str)
        and isinstance(y1, str)
        and isinstance(x2, str)
        and isinstance(y2, str)
    ):
        geometry = "X" + prefix + "M " + x1 + " " + y1 + " " + "L " + x2 + " " + y2
    return geometry


def convert_circle_to_geometry(circle: ET.Element):
    geometry = ""
    prefix = ""

    if not element_has_stroke(circle):
        return None

    # 获取circle元素的fill属性，即填充颜色
    fill = circle.attrib["fill"]
    if isinstance(fill, str) and fill != "none":
        prefix = "F"
    else:
        prefix = ""

    # 获取circle元素的cx、cy、r属性，即圆的位置和大小
    cx = circle.attrib["cx"]
    cy = circle.attrib["cy"]
    r = circle.attrib["r"]
    if isinstance(cx, str) and isinstance(cy, str) and isinstance(r, str):
        # 画圆时要先移动到圆的起始点，然后画一个圆弧。起始点为圆的右侧切点。 如 圆心 6 6 半径 3  则先移动到 9 6 然后画一个圆弧。
        geometry = "X"+ prefix+ "M"+ str(int(cx) + int(r))+ " "+ cy+ "B 0 360 "+ cx+ " "+ cy+ " "+ r+ " "+ r
    return geometry


def convert_polyline_to_geometry(polyline: ET.Element):
    geometry = ""
    prefix = ""

    if not element_has_stroke(polyline):
        return None

    # 获取polyline元素的fill属性，即填充颜色
    fill = polyline.attrib["fill"]
    if isinstance(fill, str) and fill != "none":
        prefix = "F"
    else:
        prefix = ""

    # 获取polyline元素的points属性，即折线的点
    points = polyline.attrib["points"]
    if isinstance(points, str):
        points_list = re.split(r" |,", points)
        if len(points_list) > 0:
            geometry = "XM"+ prefix+ " "+ " ".join(points_list[:2])+ "L"+ " ".join(points_list[2:])
    return geometry


def convert_polygon_to_geometry(polygon: ET.Element):
    geometry = ""
    prefix = ""

    if not element_has_stroke(polygon):
        return None

    # 获取polyline元素的fill属性，即填充颜色
    fill = polygon.attrib["fill"]
    if isinstance(fill, str) and fill != "none":
        prefix = "F"
    else:
        prefix = ""

    # 获取polyline元素的points属性，即折线的点
    points = polygon.attrib["points"]
    if isinstance(points, str):
        points_list = re.split(r" |,", points)
        if len(points_list) > 0:
            geometry = "XM"+ prefix+ " "+ " ".join(points_list[:2])+ "L"+ " ".join(points_list[2:])+ "z"
    return geometry


def convert_svg_to_geometry(svg_file_path):
    geometry_list = []
    svg_tree = read_svg_file(svg_file_path)

    handle_svg_element_map = {
        PATH: convert_path_tag_to_geometry,
        RECT: convert_rect_tag_to_geometry,
        ELLIPSE: convert_ellipse_tag_to_geometry,
        LINE: convert_line_tag_to_geometry,
        CIRCLE: convert_circle_to_geometry,
        POLYLINE: convert_polygon_to_geometry,
        POLYGON: convert_polygon_to_geometry,
    }

    for element in svg_tree.iter():
        if element.tag in handle_svg_element_map:
            geometry = handle_svg_element_map[element.tag](element)
            if geometry is not None:
                geometry_list.append(geometry)

    return " ".join(geometry_list)




if __name__ == "__main__":
    svg_file_path = "pid_node/闪蒸罐.svg"
    res = convert_svg_to_geometry(svg_file_path)
    print(res)
