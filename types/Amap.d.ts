/* eslint-disable max-len */

declare namespace AMap {
  /* 此对象用于表示地图、覆盖物、叠加层上的各种鼠标事件返回，包含以下字段：
  高德的事件说明文档有问题； 不是 LngLat 类，而是一个普通对象;
  */
  export class MapsEvent {
    /* 发生事件时光标所在处的经纬度坐标 */
    lnglat: LngLat;

    /* 发生事件时光标所在处的像素坐标 */
    pixel: { x: number; y: number };

    /* 事件类型。 */
    type: string;

    /* 发生事件的目标对象。 */
    target: any;

    data: any;
  }
  /* 像素坐标, 确定地图上的一个像素点。 */
  export class Pixel {
    /* 构造一个像素坐标对象。 */
    constructor(x: number, y: number);

    /* 获得X方向像素坐标 */
    getX(): number;

    /* 获得Y方向像素坐标 */
    getY(): number;

    /* 当前像素坐标与传入像素坐标是否相等 */
    equals(point: Pixel): boolean;

    /* 以字符串形式返回像素坐标对象 */
    toString(): string;
  }
  /* 地物对象的像素尺寸 */
  export class Size {
    /* 构造尺寸对象。参数width: 宽度, height: 长度, 单位: 像素； */
    constructor(width: number, height: number);

    /* 获得宽度。 */
    getWidth(): number;

    /* 获得高度。 */
    getHeight(): number;

    /* 以字符串形式返回尺寸大小对象(自v1.2 新增) */
    toString(): string;
  }
  /* 经纬度坐标, 确定地图上的一个点。 */
  export class LngLat {
    /* 构造一个地理坐标对象, lng、lat分别代表经度、纬度值 */
    constructor(lng: number, lat: number, noAutofix?: boolean);
    /* 当前经纬度坐标值经度移动w, 纬度移动s, 得到新的坐标。经度向右移为正值, 纬度向上移为正值, 单位为米。(自v1.2 新增) */

    offset(w: number, s: number): LngLat;

    /* 当前经纬度和传入经纬度或者经纬度数组连线之间的地面距离, 单位为米 相关示例 */
    distance(lnglat: LngLat | LngLat[]): number;

    /* 获取经度值。(自v1.2 新增) */
    getLng(): number;

    /* 获取纬度值。(自v1.2 新增) */
    getLat(): number;

    /* 判断当前坐标对象与传入坐标对象是否相等 */
    equals(lnglat: LngLat): boolean;

    /* LngLat对象以字符串的形式返回。 */
    toString(): string;
  }
  /* 地物对象的经纬度矩形范围。 */
  export class Bounds {
    /* 矩形范围的构造函数.参数southWest、northEast分别代表地物对象西南角经纬度和东北角经纬度值。 */
    constructor(southWest: LngLat, northEast: LngLat);

    /* 指定点坐标是否在矩形范围内 相关示例 */
    contains(point: LngLat): boolean;

    /* 获取当前Bounds的中心点经纬度坐标。 */
    getCenter(): LngLat;

    /* 获取西南角坐标。 */
    getSouthWest(): LngLat;

    /* 获取东北角坐标 */
    getNorthEast(): LngLat;

    /* 以字符串形式返回地物对象的矩形范围 */
    toString(): string;
  }
  /* MapOptions */
  export interface MapOptions {
    /* 地图视口, 用于控制影响地图静态显示的属性, 如: 地图中心点“center”推荐直接使用zoom、center属性为地图指定级别和中心点(自v1.3 新增) */
    view?: View2D;

    /* 地图图层数组, 数组可以是图层 中的一个或多个, 默认为普通二维地图。当叠加多个图层时, 普通二维地图需通过实例化一个TileLayer类实现(自v1.3 新增) */
    layers?: [];

    /* 地图显示的缩放级别, 若center与level未赋值, 地图初始化默认显示用户所在城市范围 3D地图下, zoom值, 可以设置为浮点数。(在V1.3.0版本level参数调整为zoom, 3D地图修改自V1.4.0开始生效) */
    zoom?: number;

    /* 地图中心点坐标值 */
    center?: LngLat;

    /* 地图标注显示顺序, 大于110即可将底图上的默认标注显示在覆盖物(圆、折线、面)之上。 */
    labelzIndex?: number;

    /* 地图显示的缩放级别范围在PC上, 默认为[3, 18], 取值范围[3-18]；在移动设备上, 默认为[3, 19], 取值范围[3-19] */
    zooms?: [];

    /* 地图语言类型可选值: zh_cn: 中文简体, en: 英文, zh_en: 中英文对照默认为: zh_cn: 中文简体注: 由于图面内容限制, 中文、英文 、中英文地图POI可能存在不一致的情况(自v1.3 新增) */
    lang?: string;

    /* 地图默认鼠标样式。参数defaultCursor应符合CSS的cursor属性规范 */
    defaultCursor?: string;

    /* 地图显示的参考坐标系, 取值: 'EPSG3857''EPSG3395''EPSG4326'自V1.3.0移入view对象中 */
    crs?: string;

    /* 地图平移过程中是否使用动画(如调用panBy、panTo、setCenter、setZoomAndCenter等函数, 将对地图产生平移操作, 是否使用动画平移的效果), 默认为true, 即使用动画 */
    animateEnable?: boolean;

    /* 是否开启地图热点, 默认false 不打开(自v1.3 新增) */
    isHotspot?: boolean;

    /* 当前地图中默认显示的图层。默认图层可以是TileLayer.Satellite等切片地图, 也可以是通过TileLayer自定义的切片图层(自v1.3 废弃) */
    defaultLayer?: TileLayer;

    /* 地图是否可旋转, 默认false。3D视图默认为true, 2D视图默认false。(V1.3版本新增, 3D视图自V1.4.0开始支持) */
    rotateEnable?: boolean;

    /* 是否监控地图容器尺寸变化, 默认值为false */
    resizeEnable?: boolean;

    /* 是否在有矢量底图的时候自动展示室内地图, PC端默认是true, 移动端默认是false */
    showIndoorMap?: boolean;

    /* 在展示矢量图的时候自动展示室内地图图层, 当地图complete之后可以获取到该对象 */
    // indoorMap?: IndoorMap;

    /* 是否支持可以扩展最大缩放级别, 和zooms属性配合使用设置为true的时候, zooms的最大级别在PC上可以扩大到20级, 移动端还是高清19/非高清20 */
    expandZoomRange?: boolean;

    /* 地图是否可通过鼠标拖拽平移, 默认为true。此属性可被setStatus/getStatus 方法控制 */
    dragEnable?: boolean;

    /* 地图是否可缩放, 默认值为true。此属性可被setStatus/getStatus 方法控制 */
    zoomEnable?: boolean;

    /* 地图是否可通过双击鼠标放大地图, 默认为true。此属性可被setStatus/getStatus 方法控制 */
    doubleClickZoom?: boolean;

    /* 地图是否可通过键盘控制, 默认为true方向键控制地图平移, "+"和"-"可以控制地图的缩放, Ctrl+“→”顺时针旋转, Ctrl+“←”逆时针旋转。此属性可被setStatus/getStatus 方法控制 */
    keyboardEnable?: boolean;

    /* 地图是否使用缓动效果, 默认值为true。此属性可被setStatus/getStatus 方法控制 */
    jogEnable?: boolean;

    /* 地图是否可通过鼠标滚轮缩放浏览, 默认为true。此属性可被setStatus/getStatus 方法控制 */
    scrollWheel?: boolean;

    /* 地图在移动终端上是否可通过多点触控缩放浏览地图, 默认为true。关闭手势缩放地图, 请设置为false。 */
    touchZoom?: boolean;

    /* 可缺省, 当touchZoomCenter=1的时候, 手机端双指缩放的以地图中心为中心, 否则默认以双指中间点为中心 */
    touchZoomCenter?: number;

    /* 设置地图的显示样式, 目前支持两种地图样式: 第一种: 自定义地图样式, 如"amap: //styles/d6bf8c1d69cea9f5c696185ad4ac4c86"可前往地图自定义平台定制自己的个性地图样式；第二种: 官方样式模版, 如"amap: //styles/grey"。其他模版样式及自定义地图的使用说明见开发指南 */
    mapStyle?: string;

    /* 设置地图上显示的元素种类支持'bg'(地图背景)、'point'(POI点)、'road'(道路)、'building'(建筑物) */
    features?: [];

    /* 设置地图显示3D楼块效果, 移动端也可使用。推荐使用。 */
    showBuildingBlock?: boolean;

    /* 默认为‘2D’, 可选’3D’, 选择‘3D’会显示 3D 地图效果。(自V1.4.0开始支持) */
    viewMode?: string;

    /* 俯仰角度, 默认0, [0, 83], 2D地图下无效 。(自V1.4.0开始支持) */
    pitch?: number;

    /* 是否允许设置俯仰角度, 3D视图下为true, 2D视图下无效。(自V1.4.0开始支持) */
    pitchEnable?: boolean;

    /* 楼块出现和消失的时候是否显示动画过程, 3D视图有效, PC端默认true, 手机端默认false。(自V1.4.0开始支持) */
    buildingAnimation?: boolean;

    /* 调整天空颜色, 配合自定义地图, 3D视图有效, 如‘#ff0000’。(自V1.4.0开始支持) */
    skyColor?: string;

    /* 设置地图的预加载模式, 开启预加载的地图会在适当时刻提前加载周边和上一级的地图数据, 优化使用体验。该参数默认值true。 (自v1.4.4开始支持) */
    preloadMode?: boolean;
  }

  /* 地图对象类, 封装了地图的属性设置、图层变更、事件交互等接口的类。相关示例 */
  export class Map {
    /* 构造一个地图对象, 参数container中传入地图容器DIV的ID值或者DIV对象, opts地图初始化参数对象, 参数详情参看MapOptions列表。 */
    constructor(container: string | HTMLDivElement, opts: MapOptions);

    /* 唤起高德地图客户端marker页其中Object里面包含有{ id: "B000A7BD6C", POIIDname: String, 必要参数location: LngLat|position属性 必须参数} */
    poiOnAMAP(obj: any): void;

    /* 唤起高德地图客户端marker详情页其中Object里面包含有{ id: "B000A7BD6C", POIIDname: String, 必要参数location: LngLat|position属性 必须参数} */
    detailOnAMAP(obj: any): void;

    /* 获取当前地图缩放级别, 在PC上, 默认取值范围为[3, 18]；在移动设备上, 默认取值范围为[3-19]3D地图会返回浮点数, 2D视图为整数。(3D地图自V1.4.0开始支持) */
    getZoom(): number;

    /* 获取地图图层数组, 数组为一个或多个图层(自v1.3 新增) */
    getLayers(): [];

    /* 获取地图中心点经纬度坐标值。 */
    getCenter(): LngLat;

    /* 返回地图对象的容器 */
    getContainer(): HTMLDivElement;

    /* 获取地图中心点所在区域, 回调函数返回对象属性分别对应为{省, 市, 区/县} */
    getCity(
      callback: (province: string, city: string, citycode: string, district: string) => void,
    ): void;

    /* 获取当前地图视图范围, 获取当前可视区域。3D地图下返回类型为ArrayBounds, 2D地图下仍返回Bounds 。(3D自V1.4.0开始支持) */
    getBounds(): Bounds;

    /* 获取当前地图标注的显示顺序 */
    getLabelzIndex(): number;

    /* 获取Map的限制区域 */
    getLimitBounds(): Bounds;

    /* 获取底图语言类型(自v1.3 新增) */
    getLang(): string;

    /* 获取地图容器像素大小 */
    getSize(): Size;

    /* 获取地图顺时针旋转角度(自v1.3 新增) */
    getRotation(): number;

    /* 获取当前地图状态信息, 包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转(rotateEnable)、是否可双击放大地图、是否可以通过键盘控制地图旋转(keyboardEnable)等 */
    getStatus(): any;

    /* 获取地图默认鼠标指针样式 */
    getDefaultCursor(): string;

    /* 获取指定位置的地图分辨率, 单位: 米/像素。 参数point有指定值时, 返回指定点地图分辨率, point缺省时, 默认返回当前地图中心点位置的分辨率 */
    getResolution(point: LngLat): number;

    /* 获取当前地图比例尺。其值为当前地图中心点处比例尺值的倒数 */
    getScale(dpi: number): number;

    /* 设置地图显示的缩放级别, 在PC上, 参数zoom可设范围: [3, 18]；在移动端: 参数zoom可设范围: [3, 19]3D地图下, 可将zoom设置为浮点数。(3D自V1.4.0开始支持) */
    setZoom(level: number): void;

    /* 设置地图标注显示的顺序 */
    setlabelzIndex(index: number): void;

    /* 设置地图图层数组, 数组为一个或多个图层。当叠加多个图层时, 普通二维地图需通过实例化一个TileLayer类实现(自v1.3 新增) */
    setLayers(layers: []): void;

    /* 添加地图覆盖物数组, 数组为一个或多个覆盖物。 */
    add(overlayers: any[]): void;

    /* 删除地图覆盖物数组, 数组为一个或多个覆盖物。 */
    remove(overlayers: any[]): void;

    /* 返回添加的覆盖物对象, 可选类型包括marker、circle、polyline、polygon； Type可缺省, 缺省时返回所有覆盖物(marker、circle、polyline、polygon)。 返回结果不包含官方覆盖物等, 比如定位marker, 周边搜索圆等 */
    getAllOverlays(type: any): any;

    /* 设置地图显示的中心点 */
    setCenter(position: LngLat): void;

    /* 地图缩放至指定级别并以指定点为地图显示中心点 */
    setZoomAndCenter(zoomLevel: number, center: LngLat): void;

    /* 按照行政区名称或adcode来设置地图显示的中心点。行政区名称支持中国、省、市、区/县名称, 如遇重名的情况, 会按城市编码表顺序返回第一个。adcode请在城市编码表中查询。建议不要同时使用center/setCenter()和setCity(), 如一起使用程序将以setCity()作为最后结果。 相关示例 */
    setCity(city: string, callback: Function): void;

    /* 指定当前地图显示范围, 参数bounds为指定的范围 */
    setBounds(bound: Bounds): void;

    /* 设置Map的限制区域, 设定区域限制后, 传入参数为限制的Bounds。地图仅在区域内可拖拽 相关示例 */
    setLimitBounds(bound: Bounds): void;

    /* 清除限制区域 */
    clearLimitBounds(): void;

    /* 设置地图语言类型, 设置后底图重新加载(自v1.3 新增) */
    setLang(lang: string): string;

    /* 设置地图顺时针旋转角度, 旋转原点为地图容器中心点, 取值范围 [0-360](自v1.3 新增) */
    setRotation(rotation: number): number;

    /* 设置当前地图显示状态, 包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转(rotateEnable)、是否可双击放大地图、是否可以通过键盘控制地图旋转(keyboardEnable)等 相关示例 */
    setStatus(status: any): void;

    /* 设置鼠标指针默认样式, 参数cursor应符合CSS的cursor属性规范。可为CSS标注中的光标样式, 如: setCursor(“pointer”)等；或者自定义的光标样式, 如: setCursor("url('http: //http://lbs.amap.com/webapi/static/Images//0.png'), pointer") */
    setDefaultCursor(cursor: string): void;

    /* 地图放大一级显示 */
    zoomIn(): void;

    /* 地图缩小一级显示 */
    zoomOut(): void;

    /* 地图中心点平移至指定点位置 */
    panTo(positon: LngLat): void;

    /* 以像素为单位, 沿x方向和y方向移动地图, x向右为正, y向下为正 */
    panBy(x: number, y: number): void;

    /* 根据地图上添加的覆盖物分布情况, 自动缩放地图到合适的视野级别, 参数overlayList默认为当前地图上添加的所有覆盖物图层 */
    setFitView(
      overlayList?: any[] | null,
      immediately?: boolean,
      avoid?: [number, number, number, number],
      maxZoom?: number,
    ): void;

    /* 删除地图上所有的覆盖物 */
    clearMap(): void;

    /* 注销地图对象, 并清空地图容器 */
    destroy(): void;

    /* 插件加载方法。参数name中指定需要加载的插件类型, 同时加载多个插件时, 以字符串数组的形式添加。在Callback回调函数中进行地图插件的创建、插件事件的绑定等操作；插件为地图功能的扩展, 按需加载；插件写作方法, 请参考相关示例。 */
    plugin(name: string | string[], callback: Function): void;

    /* 添加控件。参数可以是插件列表中的任何插件对象, 如: ToolBar、OverView、Scale等 */
    addControl(obj: any): void;

    /* 移除地图上的指定控件 */
    removeControl(obj: any): void;

    /* 清除地图上的信息窗体。 */
    clearInfoWindow(): void;

    /* 平面地图像素坐标转换为地图经纬度坐标 相关示例 */
    pixelToLngLat(pixel: Pixel, level: number): LngLat;

    /* 地图经纬度坐标转换为平面地图像素坐标 */
    lnglatToPixel(lngLat: LngLat, level: number): Pixel;

    /* 地图容器像素坐标转为地图经纬度坐标 相关示例 */
    containerToLngLat(pixel: Pixel): LngLat;

    /* 地图经纬度坐标转为地图容器像素坐标 */
    lngLatToContainer(lnglat: LngLat): Pixel;

    /* 设置地图的显示样式, 目前支持两种地图样式: 第一种: 自定义地图样式, 如"amap: //styles/d6bf8c1d69cea9f5c696185ad4ac4c86"可前往地图自定义平台定制自己的个性地图样式；第二种: 官方样式模版, 如"amap: //styles/grey"。其他模版样式及自定义地图的使用说明见开发指南 */
    setMapStyle(style: string): void;

    /* 获取地图显示样式 */
    getMapStyle(): string;

    /* 设置地图上显示的元素种类, 支持bg(地图背景)、point(兴趣点)、road(道路)、building(建筑物) */
    setFeatures(feature: []): void;

    /* 获取地图显示元素种类 */
    getFeatures(): [];

    /* 修改底图图层(自v1.3 废弃) */
    // setDefaultLayer (layer: TileLayer): void;

    /* 设置俯仰角, 3D视图有效(自V1.4.0开始支持) */
    setPitch(number: any): void;

    /* 获取俯仰角(自V1.4.0开始支持) */
    getPitch(): number;

    on(a: string, onMarkerClick: any): any;

    off(a: string, onMarkerClick: any): any;
  }
  /* View2DOptions */
  export interface View2DOptions {
    /* 地图中心点坐标值 */
    center?: LngLat;

    /* 地图顺时针旋转角度, 取值范围 [0-360], 默认值: 0 */
    rotation?: number;

    /* 地图显示的缩放级别。若center与zoom未赋值, 地图初始化默认显示用户所在城市范围 */
    zoom?: number;

    /* 地图显示的参考坐标系, 取值: 'EPSG3857''EPSG3395''EPSG4326'默认值: 'EPSG3857' */
    crs?: string;
  }

  /* 二维地图显示视口, 用于定义二维地图静态显示属性, 如地图缩放级别“zoom”、地图中心点“center”等。 */
  export class View2D {
    /* 构造一个二维地图显示视口对象, opts二维地图视口对象初始化属性, 详见View2Doptions */
    constructor(opt: View2DOptions);
  }

  export interface TileLayerOptions {
    /* 要显示该图层的地图对象 */
    map?: Map;

    /*
     * 切片大小，取值：
        256，表示切片大小为256*256，
        128，表示切片大小为128*128，
        64，表示切片大小为64*64。默认值为256
     */
    tileSize?: number;

    /* 切片取图地址(自1.3版本起，该属性与getTileUrl属性合并)
    如：'https://abc.amap.com/tile?x=[x]&y=[y]&z=[z]'
    [x]、[y]、[z]分别替代切片的xyz。 */
    tileUrl?: string;

    /* 取图错误时的代替地址 */
    errorUrl?: string;

    /* 获取图块取图地址，该属性值为一个字符串或者一个函数
    字符串如：'https://abc.amap.com/tile?x=[x]&y=[y]&z=[z]'
    函数参数z为地图缩放级别，x,y分别为相应缩放级别下图块横向、纵向索引号，
    该属性可以用来改变取图地址，实现自定义栅格图。 */
    getTileUrl?: string | ((x: number, y: number, z: number) => void);

    /* 图层叠加的顺序值，0表示最底层。默认zIndex：1 */
    zIndex?: number;

    /* 图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明 */
    opacity?: number;

    /* 支持的缩放级别范围，默认范围[3-18]，在PC上，取值范围为[3-18]；在移动设备上，取值范围为[3-19] */
    zooms?: [];

    /* 是否在高清屏下进行清晰度适配，默认为true。
    将根据移动设备屏幕设备像素比，采用相应的技术手段，保证图层在不同设备像素比下的清晰度。 */
    detectRetina?: boolean;
  }

  /* 切片图层类，该类为基础类，不指定getTileUrl时为高德默认底图。 */
  export class TileLayer {
    /* 构造一个切片图层对象，通过TileLayerOptions设置图层属性。 */
    constructor(tileOpt: TileLayerOptions);

    /* 设置图层透明度 */
    setOpacity(alpha: number): void;

    /* 在地图上显示该图层 */
    show(): void;

    /* 隐藏图层 */
    hide(): void;

    /* 获取当前图层所有切片号。 */
    getTiles(): [];

    /* 重新加载此图层 */
    reload(): void;

    /* 设置图层的取图地址 */
    setTileUrl(): void;

    /* 获取该图层可显示的级别范围；在PC上，取值范围为[3-18]；在移动设备上，取值范围为[3-19] */
    getZooms(): [];

    /* 设置图层叠加的顺序值，默认zIndex：1 */
    setzIndex(index: number): void;

    /* 设置要显示图层的地图对象 */
    setMap(map: Map): void;

    Satellite: Satellite;

    RoadNet: RoadNet;

    Traffic: Traffic;
  }

  interface SatelliteOptions {
    /* 要显示该图层的地图对象 */
    map?: Map;

    /* 图层叠加的顺序值，0表示最底层，默认zIndex：2 */
    zIndex?: number;

    /* 图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明 */
    opacity?: number;

    /* 支持的缩放级别范围，默认范围为[3,18],取值范围[3-18] */
    zooms?: [];

    /* 是否在高清屏下进行清晰度适配，默认为false。
    将根据移动设备屏幕设备像素比，采用相应的技术手段，保证图层在不同设备像素比下的清晰度。 */
    detectRetina?: boolean;
  }

  /* 卫星图层类，继承自TileLayer。 */
  class Satellite extends TileLayer {
    /* 构造一个卫星切片图层对象，通过SatelliteOptions设置图层属性。 */
    constructor(sateOpt: SatelliteOptions);

    /* 设置图层透明度 */
    setOpacity(alpha: number): void;

    /* 在地图上显示该图层 */
    show(): void;

    /* 隐藏图层 */
    hide(): void;

    /* 获取当前图层所有切片号 */
    getTiles(): [];

    /* 重新加载此图层 */
    reload(): void;

    /* 设置图层的取图地址 */
    setTileUrl(): void;

    /* 获取该图层可显示的级别范围，默认取值范围为[3-18] */
    getZooms(): [];

    /* 设置图层叠加的顺序值，默认zIndex：2 */
    setzIndex(index: number): void;

    /* 设置要显示图层的地图对象 */
    setMap(map: Map): void;
  }

  interface RoadNetOptions {
    /* 要显示该图层的地图对象 */
    map?: Map;

    /* 图层叠加的顺序值，0表示最底层，默认zIndex：3 */
    zIndex?: number;

    /* 图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明 */
    opacity?: number;

    /* 支持的缩放级别范围，默认范围为[3-18]，取值范围[3-18]；在手机、平板等高清设备上，取值范围为[3-17] */
    zooms?: [];

    /* 是否在高清屏下进行清晰度适配，默认为true。
    将根据移动设备屏幕设备像素比，采用相应的技术手段，保证图层在不同设备像素比下的清晰度。 */
    detectRetina?: boolean;
  }

  /* 路网图层类，继承自TileLayer。 */
  class RoadNet extends TileLayer {
    /* 构造路网图层对象，通过RoadNetOptions设置图层属性。 */
    constructor(roadnetOpt: RoadNetOptions);

    /* 设置图层透明度 */
    setOpacity(alpha: number): void;

    /* 在地图上显示该图层 */
    show(): void;

    /* 隐藏图层 */
    hide(): void;

    /* 获取当前图层所有切片号 */
    getTiles(): [];

    /* 重新加载此图层 */
    reload(): void;

    /* 设置图层的取图地址 */
    setTileUrl(): void;

    /* 获取该图层可显示的级别范围，默认取值范围为[3-18]；在平板、手机等高清设备上，取值范围为[3-17] */
    getZooms(): [];

    /* 设置图层叠加的顺序值，默认zIndex：3 */
    setzIndex(index: number): void;

    /* 设置要显示图层的地图对象 */
    setMap(map: Map): void;
  }

  interface TrafficOptions {
    /* 要显示该图层的地图对象 */
    map?: Map;

    /* 图层叠加的顺序值，0表示最底层，默认zIndex：4 */
    zIndex?: number;

    /* 图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明 */
    opacity?: number;

    /* 支持的缩放级别范围，默认范围为[3-17]，取值范围[3-17]；在手机、平板等高清设备上，取值范围为[3-16] */
    zooms?: [];

    /* 是否在高清屏下进行清晰度适配，默认为true。
    将根据移动设备屏幕设备像素比，采用相应的技术手段，保证图层在不同设备像素比下的清晰度。 */
    detectRetina?: boolean;

    /* 是否设置可以自动刷新实时路况信息，默认为false */
    autoRefresh?: boolean;

    /* 设置刷新间隔时长，单位：秒
    默认180s刷新一次 */
    interval?: number;
  }

  /* 实时交通图层类，继承自TileLayer。 */
  class Traffic extends TileLayer {
    /* 构造一个实时交通图层对象。，通过TrafficOptions设置图层属性。 */
    constructor(trafficOpt: TrafficOptions);

    /* 设置图层透明度 */
    setOpacity(alpha: number): void;

    /* 在地图上显示该图层 */
    show(): void;

    /* 隐藏图层 */
    hide(): void;

    /* 获取当前图层所有切片号 */
    getTiles(): [];

    /* 重新加载此图层 */
    reload(): void;

    /* 设置图层的取图地址 */
    setTileUrl(): void;

    /* 获取该图层可显示的级别范围，默认取值范围为[3-17]；在平板、手机等高清设备上，取值范围为[3-16] */
    getZooms(): [];

    /* 设置图层叠加的顺序值，默认zIndex：4 */
    setzIndex(index: number): void;

    /* 设置要显示图层的地图对象 */
    setMap(map: Map): void;
  }

  export interface BuildingsOptions {
    /* 可见级别范围 */
    zooms?: number[];

    /* 不透明度 */
    opacity?: number;

    /* 高度比例系数，可控制3D视图下的楼块高度 */
    heightFactor?: number;

    /* 是否可见 */
    visible?: boolean;

    /* 所属的地图对象 */
    map?: Map;

    /* 层级，默认8 */
    zIndex?: number;
  }

  /* 楼块图层，单独展示矢量化的楼块图层，兼容IE9以上(不含)的浏览器 ,v1.4.6开始 */
  export class Buildings {
    /* 创建楼块图层，BuildingsOptions为初始构造属性对象 */
    constructor(opts: BuildingsOptions);

    /* 设置所属的地图对象，参数为null时从地图中移除 */
    setMap(map: any | null): void;

    /* 显示 */
    show(): void;

    /* 隐藏 */
    hide(): void;

    /* 按区域设置楼块的颜色 */
    setStyle(): void;
  }

  export interface MassMarksOptions {
    zIndex?: number;
    opacity?: number;
    zooms?: [];
    cursor?: string;
    alwaysRender?: boolean;
    style?: MassMarksStyleOptions | MassMarksStyleOptions[];
  }

  export interface MassMarksStyleOptions {
    anchor?: Pixel;
    url?: string;
    size?: Size;
    rotation?: number;
  }

  /* 此类表示海量点类，利用该类可同时在地图上展示万级别的点，目前仅适用于html5浏览器。 */
  export class MassMarks {
    constructor(data: [], opts: MassMarksOptions);

    /* 设置显示MassMark的地图对象 */
    setMap(map: Map): void;

    /* 获取Marker所在地图对象 */
    getMap(): Map;

    /* 设置MassMark的显示样式 */
    setStyle(styleObject?: MassMarksStyleOptions | MassMarksStyleOptions[]): void;

    /* 获取MassMark的显示样式，数据结构同setStyle中的属性一致 */
    getStyle(): any;

    /* 设置MassMark展现的数据集，数据集格式为：, data: Array 坐标数据集. 例：data: [{lnglat: [116.405285, 39.904989], name: i,id:1},{}, …],{}, …]} */
    setData(data: any): void;

    /* 输出MassMark的数据集，数据结构同setDatas中的数据集 */
    getData(): any;

    /* 显示海量点图层 */
    show(): void;

    /* 隐藏海量点图层 */
    hide(): void;

    /* 清除海量点 */
    clear(): void;

    on(a: string, onMarkerMouse: any): void;
  }

  export interface HeatmapOptions {
    radius?: number;
    gradient?: any;
    opacity?: [];
    zooms?: [];
  }

  /* 热力图，基于第三方heatmap.js实现，以特殊高亮的形式显示数据密集程度。根据密集程度的不同，图上会呈现不同的颜色，以直观的形式展现数据密度。API引用了heatmap.js最新版本v2.0，v2.0基于新的渲染模型，具有更高的渲染效率和更强的性能。支持chrome、firefox、safari、ie9及以上浏览器。 */
  export class Heatmap {
    /* 构造一个热力图插件对象，map为要叠加热力图的地图对象，opts属性参考HeatmapOptions列表中的说明。 */
    constructor(map: Map, opts: HeatmapOptions);

    /* 设置热力图要叠加的地图对象，也可以在Map中的layers属性中设置为默认显示的图层 */
    setMap(map: Map): void;

    /* 设置热力图属性，参考HeatmapOptions列表中的说明 */
    setOptions(opts: HeatmapOptions): void;

    /* 向热力图数据集中添加坐标点，count不填写时默认：1 */
    addDataPoint(lng: number, lat: number, count: number): void;

    /* 设置热力图展现的数据集，dataset数据集格式为：
    {
      max: number 权重的最大值,
      data: Array 坐标数据集
    }，
    其中max不填则取数据集count最大值
    例： {
      max: 100,
      data: [{lng: 116.405285, lat: 39.904989, count: 65},{}, …]
      }
    也可以通过url来加载数据，格式为
    {
      data：jsonp格式数据的服务地址URL,
      dataParser: 数据格式转换function //当jsonp返回结果和官方结构不一致的时候，用户可以传递一个函数用来进行数据格式转换；
    }
    例：
    {
      data:'http://abc.com/jsonp.js',
      dataParser:function(data){
      return doSomthing(data);//返回的对象结果应该与上面例子的data字段结构相同
      }
    } */
    setDataSet(dataset: any): void;

    /* 隐藏热力图 */
    hide(): void;

    /* 显示热力图 */
    show(): void;

    /* 获取热力图叠加地图对象 */
    getMap(): Map;

    /* 获取热力图的属性信息 */
    getOptions(): any;

    /* 输出热力图的数据集，数据结构同setDataSet中的数据集 */
    getDataSet(): any;
  }

  /* MarkerOptions */
  export interface MarkerOptions {
    /* 要显示该marker的地图对象 */
    map?: Map;

    /* 点标记在地图上显示的位置, 默认为地图中心点 */
    position?: LngLat;

    /* 点标记显示位置偏移量, 默认值为Pixel(-10, -34)。Marker指定position后, 默认以marker左上角位置为基准点, 对准所给定的position位置, 若需使marker指定位置对准在position处, 需根据marker的尺寸设置一定的偏移量。 */
    offset?: Pixel;

    /* 需在点标记中显示的图标。可以是一个本地图标地址, 或者Icon对象。有合法的content内容时, 此属性无效 */
    icon?: string | Icon;

    /* 点标记显示内容, 可以是HTML要素字符串或者HTML DOM对象。content有效时, icon属性将被覆盖 */
    content?: string | any;

    /* 鼠标点击时marker是否置顶, 默认false , 不置顶
     * (自v1.3 新增) */
    topWhenClick?: boolean;

    /* 是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * (自v1.3 新增) 默认值: false */
    bubble?: boolean;

    /* 设置点标记是否可拖拽移动, 默认为false */
    draggable?: boolean;

    /* 设置拖拽点标记时是否开启点标记离开地图的效果 */
    raiseOnDrag?: boolean;

    /* 指定鼠标悬停时的鼠标样式, 自定义cursor, IE仅支持cur/ani/ico格式, Opera不支持自定义cursor */
    cursor?: string;

    /* 点标记是否可见, 默认为true */
    visible?: boolean;

    /* 点标记的叠加顺序。地图上存在多个点标记叠加时, 通过该属性使级别较高的点标记在上层显示 默认zIndex: 100 */
    zIndex?: number;

    /* 点标记的旋转角度, 广泛用于改变车辆行驶方向 注: angle属性是使用CSS3来实现的, 支持IE9及以上版本 */
    angle?: number;

    /* 是否自动旋转。点标记在使用moveAlong动画时, 路径方向若有变化, 点标记是否自动调整角度, 默认为false。广泛用于自动调节车辆行驶方向。 IE8以下不支持旋转, autoRotation属性无效 */
    autoRotation?: boolean;

    /* 点标记的动画效果, 默认值: “AMAP_ANIMATION_NONE”
     * 可选值:
     * “AMAP_ANIMATION_NONE”, 无动画效果
     * “AMAP_ANIMATION_DROP”, 点标掉落效果
     * “AMAP_ANIMATION_BOUNCE”, 点标弹跳效果 */
    animation?: string;

    /* 点标记阴影, 不设置该属性则点标记无阴影 */
    shadow?: Icon;

    /* 鼠标滑过点标记时的文字提示, 不设置则鼠标滑过点标无文字提示 */
    title?: string;

    /* 点标记是否可点击 */
    clickable?: boolean;

    /* 设置Marker的可点击区域, 在定义的区域内可触发Marker的鼠标点击事件 */
    shape?: MarkerShape;

    /* 用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等 */
    extData?: any;

    /* 添加文本标注, content为文本标注的内容, offset为偏移量, 左上角为偏移量为(0, 0) */
    label?: {
      content?: string;
      offset?: LngLat;
      direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    };

    imageSize?: Size;

    imageOffset?: Pixel;
  }

  /* Marker类 */
  export class Marker {
    /* 构造一个点标记对象, 通过MarkerOptions设置点标记对象的属性 */
    constructor(opt: MarkerOptions);

    /* 唤起高德地图客户端标注页其中Object里面包含有{ name: String, name属性 必要参数 position:
     * LngLat 坐标点 } */
    markOnAMAP(obj: any): void;

    /* 获取Marker偏移量
     * (自v1.3 新增) */
    getOffset(): Pixel;

    /* 设置Marker偏移量
     * (自v1.3 新增) */
    setOffset(offset: Pixel): void;

    /* 设置点标记的动画效果, 默认值: “AMAP_ANIMATION_NONE”
     * 可选值:
     * “AMAP_ANIMATION_NONE”, 无动画效果
     * “AMAP_ANIMATION_DROP”, 点标掉落效果
     * “AMAP_ANIMATION_BOUNCE”, 点标弹跳效果 */
    setAnimation(animate: string): void;

    /* 获取点标记的动画效果类型 */
    getAnimation(): string;

    /* 设置点标记是支持鼠标单击事件 */
    setClickable(clickable: boolean): void;

    /* 获取点标记是否支持鼠标单击事件 */
    getClickable(): boolean;

    /* 获取点标记的位置 */
    getPosition(): LngLat;

    /* 设置点标记位置 */
    setPosition(lnglat: LngLat): void;

    /* 设置点标记的旋转角度 */
    setAngle(angle: number): void;

    /* 设置点标记文本标签内容相关示例 */
    setLabel(label: any): void;

    /* 获取点标记文本标签内容 */
    getLabel(): any;

    /* 获取点标记的旋转角度 */
    getAngle(): number;

    /* 设置点标记的叠加顺序, 默认最先添加的点标记在最底层 */
    setzIndex(index: number): void;

    /* 获取点标记的叠加顺序 */
    getzIndex(): number;

    /* 设置点标记的显示图标。 参数image可传入String、Icon两种类型的值。
     * 若为String(图片url), 表示点标记以指定图片形式显示；若为Icon, 表示点标记以Icon对象形式显示 */
    setIcon(content: string | Icon): void;

    /* 当点标记未自定义图标时, 获取Icon内容 */
    getIcon(): string | Icon;

    /* 设置点标记对象是否可拖拽移动 */
    setDraggable(draggable: boolean): void;

    /* 获取点标记对象是否可拖拽移动 */
    getDraggable(): boolean;

    /* 点标记隐藏 */
    hide(): void;

    /* 点标记显示 */
    show(): void;

    /* 设置鼠标悬停时的光标。 参数cur可为CSS标注中的光标样式, 如:
     * setCursor(“pointer”)等；或者自定义的光标样式, 如:
     * setCursor("url('http: //http://webapi.amap.com/images/0.png') , pointer")
     * 注: 当浏览器不支持css2, url值不起作用, 鼠标样式就按pointer来设置 */
    setCursor(Cursor: any): string;

    /* 设置点标记显示内容, 可以是HTML要素字符串或者HTML DOM对象 */
    setContent(html: string | HTMLDivElement): void;

    /* 获取点标记内容 */
    getContent(): string;

    /* 以指定的速度, 点标记沿指定的路径移动。参数path为路径坐标串；speed为指定速度, 单位: 千米/小时； 回调函数f为变化曲线函数, 缺省为function(k){return k}；参数circlable表明是否循环执行动画, 默认为false */
    moveAlong(path: [], speed: number, f: Function, circlable: boolean): void;

    /* 以给定速度移动点标记到指定位置。参数lnglat为指定位置, 必设；speed为指定速度, 单位: 千米/小时；回调函数f为变化曲线函数, 缺省为function(k){return k}。 */
    moveTo(lnglat: LngLat, speed: number, f: Function): void;

    /* 点标记停止动画 */
    stopMove(): void;

    /* 暂定点标记的动画效果 */
    pauseMove(): void;

    /* 重新开始点标记的动画效果 */
    resumeMove(): void;

    /* 为Marker指定目标显示地图。当参数值取null时, 地图上移除当前Marker: setMap(null) */
    setMap(map: Map): void;

    /* 获取Marker所在地图对象 */
    getMap(): Map;

    /* 鼠标滑过点标时的文字提示 */
    setTitle(title: string): void;

    /* 获取点标记的文字提示 */
    getTitle(): string;

    /* 地图上有多个marker时, 当isTop为true时, marker将显示在最前面；当为false时, marker取消置顶 */
    setTop(isTop: boolean): void;

    /* */
    getTop(): boolean;

    /* 为marker设置阴影效果 */
    setShadow(icon: Icon): void;

    /* 获取marker的阴影图标 */
    getShadow(): Icon;

    /* 设置marker的可点击区域 */
    setShape(shape: MarkerShape): void;

    /* 获取marker的可点击区域 */
    getShape(): MarkerShape;

    /* 设置用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等 */
    setExtData(ext: any): void;

    /* 获取用户自定义属性 */
    getExtData(): any;

    on(a: string, onMarkerClick: any): void;

    off(a: string, onMarkerClick: any): void;

    extData?: any;
  }
  /* MarkerShapeOptions */
  export interface MarkerShapeOptions {
    /* 可点击区域组成元素数组, 存放图形的像素坐标等信息, 该数组元素由type决定: - circle: coords格式为 [x1, y1, r], x1, y1为圆心像素坐标, r为圆半径 - poly: coords格式为 [x1, y1, x2, y2 … xn, yn], 各x, y表示多边形边界像素坐标 - rect: coords格式为 [x1, y1, x2, y2], x1, y1为矩形左上角像素坐标, x2, y2为矩形右下角像素坐标 Markshape的像素坐标是指相对于marker的左上角的像素坐标偏移量 */
    coords?: number[];

    /* 可点击区域类型, 可选值: - circle: 圆形 - poly: 多边形 - rect: 矩形 */
    type?: string;
  }

  /* MarkerShape */
  export class MarkerShape {
    /* 构造一个Marker可点击区域对象, 通过MarkerShapeOptions设置可点击区域属性 */
    constructor(opt: MarkerShapeOptions);
  }
  /* IconOptions */
  export interface IconOptions {
    /* 图标尺寸, 默认值(36, 36) */
    size?: Size;

    /* 图标取图偏移量。当image中指定了一个大图时, 可通过size和imageOffset配合, 显示图标的指定范围 */
    imageOffset?: Pixel;

    /* 图标的取图地址。默认为蓝色图钉图片 */
    image?: string;

    /* 图标所用图片大小, 根据所设置的大小拉伸或压缩图片, 等同于CSS中的background-size属性。可用于实现高清屏的高清效果 */
    imageSize?: Size;
  }

  /* MarkerShape */
  export class Icon {
    /* 构造点覆盖物图标, 通过IconOptions设置图标属性 */
    constructor(opt: IconOptions);

    /* 获取图标图片大小 */
    getImageSize(): Size;

    /* 设置图标图片大小 */
    setImageSize(size: Size): void;
  }
  /* ElasticMarkerOptions */
  export interface ElasticMarkerOptions {
    /* 多个不同样式的数组, 每个样式形如:
     *{
     * icon: {
     * img: './a, png',
     * size: [16, 16], //图标的原始大小
     * ancher: [8, 16], //锚点, 图标原始大小下锚点所处的位置, 相对左上角
     * imageOffset: [360, 340],
     * //可缺省, 当使用精灵图时可用, 标示图标在整个图片中左上角的位置
     * imageSize: [512, 512],
     * //可缺省, 当使用精灵图时可用, 整张图片的大小
     * fitZoom: 14, //最合适的级别, 在此级别下显示为原始大小
     * scaleFactor: 2, //地图放大一级的缩放比例系数
     * maxScale: 2, //最大放大比例
     * minScale: 1//最小放大比例
     * },
     * label: {
     * content: '标记1', //文本内容
     * position: 'BM', //文本位置相对于图标的基准点,
     * //BL、BM、BR、ML、MR、TL、TM、TR分别代表左下角、底部中央、右下角、
     * //左侧中央、右侧中央、左上角、顶部中央、右上角。
     * //缺省时代表相对图标的锚点位置
     * offset: [-35, 0], //相对position的偏移量
     * minZoom: 15//label的最小显示级别
     * }
     *} */
    styles?: [];

    /* 表示地图级别与styles中样式对应关系的映射, 如: {
     * 14: 0,
     * 15: 0,
     * 16: 1,
     * 17: 1,
     * 18: 1,
     * 19: 1,
     * 20: 1
     * } 表示14到15级使用styles中的第0个样式, 16-20级使用第二个样式 */
    zoomStyleMapping?: any;

    /* 要显示该标记的地图对象 */
    map?: Map;

    /* 点标记在地图上显示的位置, 默认为地图中心点 */
    position?: LngLat;

    /* 鼠标点击时marker是否置顶, 默认false , 不置顶
     * (自v1.3 新增) */
    topWhenClick?: boolean;

    /* 是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * (自v1.3 新增) 默认值: false */
    bubble?: boolean;

    /* 设置点标记是否可拖拽移动, 默认为false */
    draggable?: boolean;

    /* 指定鼠标悬停时的鼠标样式, 自定义cursor, IE仅支持cur/ani/ico格式, Opera不支持自定义cursor */
    cursor?: string;

    /* 点标记是否可见, 默认为true */
    visible?: boolean;

    /* 点标记的叠加顺序。地图上存在多个点标记叠加时, 通过该属性使级别较高的点标记在上层显示 默认zIndex: 100 */
    zIndex?: number;

    /* 点标记是否可点击 */
    clickable?: boolean;

    /* 用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等 */
    extData?: any;
  }

  /* 灵活点标记, 一种可以随着地图级别变化而改变图标和大小的点标记, 插件类。查看示例 */
  export class ElasticMarker {
    /* 构造一个灵活点标记对象, 通过ElasticMarkerOptions设置点标记对象的属性 */
    constructor(opt: ElasticMarkerOptions);

    /* 唤起高德地图客户端标注页其中Object里面包含有{ name: String, name属性 必要参数 position:
     * LngLat 坐标点 } */
    markOnAMAP(obj: any): void;

    /* 设置点标记是支持鼠标单击事件 */
    setClickable(clickable: boolean): void;

    /* 获取点标记是否支持鼠标单击事件 */
    getClickable(): boolean;

    /* 获取点标记的位置 */
    getPosition(): LngLat;

    /* 设置点标记位置 */
    setPosition(lnglat: LngLat): void;

    /* 设置点标记的叠加顺序, 默认最先添加的点标记在最底层 */
    setzIndex(index: number): void;

    /* 获取点标记的叠加顺序 */
    getzIndex(): number;

    /* 设置点标记对象是否可拖拽移动 */
    setDraggable(draggable: boolean): void;

    /* 获取点标记对象是否可拖拽移动 */
    getDraggable(): boolean;

    /* 点标记隐藏 */
    hide(): void;

    /* 点标记显示 */
    show(): void;

    /* 设置鼠标悬停时的光标。 参数cur可为CSS标注中的光标样式, 如:
     * setCursor(“pointer”)等；或者自定义的光标样式, 如:
     * setCursor("url('http: //http://webapi.amap.com/images/0.png') , pointer")
     * 注: 当浏览器不支持css2, url值不起作用, 鼠标样式就按pointer来设置 */
    setCursor(Cursor: any): string;

    /* 为Marker指定目标显示地图。当参数值取null时, 地图上移除当前Marker: setMap(null) */
    setMap(map: Map): void;

    /* 获取Marker所在地图对象 */
    getMap(): Map;

    /* 鼠标滑过点标时的文字提示 */
    setTitle(title: string): void;

    /* 获取点标记的文字提示 */
    getTitle(): string;

    /* 地图上有多个marker时, 当isTop为true时, marker将显示在最前面；当为false时, marker取消置顶 */
    setTop(isTop: boolean): void;

    /* */
    getTop(): boolean;

    /* 设置用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等 */
    setExtData(ext: any): void;

    /* 获取用户自定义属性 */
    getExtData(): any;
  }
  /* TextOptions */
  export interface TextOptions {
    /* 标记显示的文本内容 */
    text?: string;

    /* 横向位置, 'left' 'right', 'center'可选 */
    textAlign?: string;

    /* 纵向位置, 'top' 'middle', 'bottom'可选 */
    verticalAlign?: string;

    /* 要显示该标记的地图对象 */
    map?: Map;

    /* 点标记在地图上显示的位置, 默认为地图中心点 */
    position?: LngLat;

    /* 点标记显示位置偏移量, 默认值为Pixel(-10, -34)。Marker指定position后, 默认以marker左上角位置为基准点, 对准所给定的position位置, 若需使marker指定位置对准在position处, 需根据marker的尺寸设置一定的偏移量。 */
    offset?: Pixel;

    /* 鼠标点击时是否置顶, 默认false , 不置顶 */
    topWhenClick?: boolean;

    /* 是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * 默认值: false */
    bubble?: boolean;

    /* 设置点标记是否可拖拽移动, 默认为false */
    draggable?: boolean;

    /* 设置拖拽点标记时是否开启点标记离开地图的效果 */
    raiseOnDrag?: boolean;

    /* 指定鼠标悬停时的鼠标样式, 自定义cursor, IE仅支持cur/ani/ico格式, Opera不支持自定义cursor */
    cursor?: string;

    /* 点标记是否可见, 默认为true */
    visible?: boolean;

    /* 点标记的叠加顺序。地图上存在多个点标记叠加时, 通过该属性使级别较高的点标记在上层显示 默认zIndex: 100 */
    zIndex?: number;

    /* 点标记的旋转角度, 广泛用于改变车辆行驶方向 注: angle属性是使用CSS3来实现的, 支持IE9及以上版本 */
    angle?: number;

    /* 是否自动旋转。点标记在使用moveAlong动画时, 路径方向若有变化, 点标记是否自动调整角度, 默认为false。广泛用于自动调节车辆行驶方向。 IE8以下不支持旋转, autoRotation属性无效 */
    autoRotation?: boolean;

    /* 点标记的动画效果, 默认值: “AMAP_ANIMATION_NONE”
     * 可选值:
     * “AMAP_ANIMATION_NONE”, 无动画效果
     * “AMAP_ANIMATION_DROP”, 点标掉落效果
     * “AMAP_ANIMATION_BOUNCE”, 点标弹跳效果 */
    animation?: string;

    /* 点标记阴影, 不设置该属性则点标记无阴影 */
    shadow?: Icon;

    /* 鼠标滑过点标记时的文字提示, 不设置则鼠标滑过点标无文字提示 */
    title?: string;

    /* 点标记是否可点击 */
    clickable?: boolean;

    /* 用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等 */
    extData?: any;
  }

  /* 纯文本标记, 继承自Marker, 具有Marker的大部分属性、方法和事件(v1.4.2新增) */
  export class Text {
    /* 构造一个点标记对象, 通过TextOptions设置点标记对象的属性 */
    constructor(opt: TextOptions);

    /* 获取文本内容 */
    getText(): string;

    /* 修改文本内容 */
    setText(String: any): void;

    /* 设置文本样式, Object同css样式表, 如: {'background-color': 'red'} */
    setStyle(Object: any): void;

    /* 唤起高德地图客户端标注页其中Object里面包含有{ name: String, name属性 必要参数 position:
     * LngLat 坐标点 } */
    markOnAMAP(obj: any): void;

    /* 获取偏移量 */
    getOffset(): Pixel;

    /* 设置偏移量 */
    setOffset(offset: Pixel): void;

    /* 设置点标记的动画效果, 默认值: “AMAP_ANIMATION_NONE”
     * 可选值:
     * “AMAP_ANIMATION_NONE”, 无动画效果
     * “AMAP_ANIMATION_DROP”, 点标掉落效果
     * “AMAP_ANIMATION_BOUNCE”, 点标弹跳效果 */
    setAnimation(animate: string): void;

    /* 获取点标记的动画效果类型 */
    getAnimation(): string;

    /* 设置点标记是支持鼠标单击事件 */
    setClickable(clickable: boolean): void;

    /* 获取点标记是否支持鼠标单击事件 */
    getClickable(): boolean;

    /* 获取点标记的位置 */
    getPosition(): LngLat;

    /* 设置点标记位置 */
    setPosition(lnglat: LngLat): void;

    /* 设置点标记的旋转角度 */
    setAngle(angle: number): void;

    /* 获取点标记的旋转角度 */
    getAngle(): number;

    /* 设置点标记的叠加顺序, 默认最先添加的点标记在最底层 */
    setzIndex(index: number): void;

    /* 获取点标记的叠加顺序 */
    getzIndex(): number;

    /* 设置点标记对象是否可拖拽移动 */
    setDraggable(draggable: boolean): void;

    /* 获取点标记对象是否可拖拽移动 */
    getDraggable(): boolean;

    /* 点标记隐藏 */
    hide(): void;

    /* 点标记显示 */
    show(): void;

    /* 设置鼠标悬停时的光标。 参数cur可为CSS标注中的光标样式, 如:
     * setCursor(“pointer”)等；或者自定义的光标样式, 如:
     * setCursor("url('http: //http://webapi.amap.com/images/0.png') , pointer")
     * 注: 当浏览器不支持css2, url值不起作用, 鼠标样式就按pointer来设置 */
    setCursor(Cursor: any): string;

    /* 以指定的速度, 点标记沿指定的路径移动。参数path为路径坐标串；speed为指定速度, 单位: 千米/小时； 回调函数f为变化曲线函数, 缺省为function(k){return k}；参数circlable表明是否循环执行动画, 默认为false */
    moveAlong(path: [], speed: number, f: Function, circlable: boolean): void;

    /* 以给定速度移动点标记到指定位置。参数lnglat为指定位置, 必设；speed为指定速度, 单位: 千米/小时；回调函数f为变化曲线函数, 缺省为function(k){return k}。 */
    moveTo(lnglat: LngLat, speed: number, f: Function): void;

    /* 点标记停止动画 */
    stopMove(): void;

    /* 暂定点标记的动画效果 */
    pauseMove(): void;

    /* 重新开始点标记的动画效果 */
    resumeMove(): void;

    /* 为Marker指定目标显示地图。当参数值取null时, 地图上移除当前Marker: setMap(null) */
    setMap(map: Map): void;

    /* 获取Marker所在地图对象 */
    getMap(): Map;

    /* 鼠标滑过点标时的文字提示 */
    setTitle(title: string): void;

    /* 获取点标记的文字提示 */
    getTitle(): string;

    /* 地图上有多个marker时, 当isTop为true时, marker将显示在最前面；当为false时, marker取消置顶 */
    setTop(isTop: boolean): void;

    /* */
    getTop(): boolean;

    /* 设置阴影效果 */
    setShadow(icon: Icon): void;

    /* 获取阴影图标 */
    getShadow(): Icon;

    /* 设置用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等 */
    setExtData(ext: any): void;

    /* 获取用户自定义属性 */
    getExtData(): any;
  }
  /* PolylineOptions */
  export interface PolylineOptions {
    /* 要显示该polyline的地图对象 */
    map?: Map;

    /* 折线覆盖物的叠加顺序。默认叠加顺序, 先添加的线在底层, 后添加的线在上层。通过该属性可调整叠加顺序, 使级别较高的折线覆盖物在上层显示 默认zIndex: 50 */
    zIndex?: number;

    /* 是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * (自v1.3 新增) 默认值: false */
    bubble?: boolean;

    /* 指定鼠标悬停时的鼠标样式, 自定义cursor, IE仅支持cur/ani/ico格式, Opera不支持自定义cursor */
    cursor?: string;

    /* 是否绘制成大地线, 默认false相关示例 */
    geodesic?: boolean;

    /* 线条是否带描边, 默认false */
    isOutline?: boolean;

    /* 描边的宽度, 默认为1 */
    borderWeight?: number;

    /* 线条描边颜色, 此项仅在isOutline为true时有效, 默认: #000000 */
    outlineColor?: string;

    /* 折线的节点坐标数组 */
    path?: any[];

    /* 线条颜色, 使用16进制颜色代码赋值。默认值为#006600 */
    strokeColor?: string;

    /* 线条透明度, 取值范围[0, 1], 0表示完全透明, 1表示不透明。默认为0.9 */
    strokeOpacity?: number;

    /* 线条宽度, 单位: 像素 */
    strokeWeight?: number;

    /* 线样式, 实线: solid, 虚线: dashed */
    strokeStyle?: string;

    /* 勾勒形状轮廓的虚线和间隙的样式, 此属性在strokeStyle 为dashed 时有效, 此属性在ie9+浏览器有效 取值:
     * 实线: [0, 0, 0] 虚线: [10, 10] , [10, 10] 表示10个像素的实线和10个像素的空白(如此反复)组成的虚线 点画线: [10, 2, 10], [10, 2, 10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 (如此反复)组成的虚线 */
    strokeDasharray?: [];

    /* 折线拐点的绘制样式, 默认值为'miter'尖角, 其他可选值: 'round'圆角、'bevel'斜角 */
    lineJoin?: string;

    /* 折线两端线帽的绘制样式, 默认值为'butt'无头, 其他可选值: 'round'圆头、'square'方头 */
    lineCap?: string;

    /* 设置折线是否可拖拽移动, 默认为false */
    draggable?: boolean;

    /* 用户自定义属性, 支持JavaScript API任意数据类型, 如Polyline的id等 */
    extData?: any;

    /* 是否延路径显示白色方向箭头, 默认false。Canvas绘制时有效, 建议折线宽度大于6时使用；在3D视图下不支持显示方向箭头(自V1.4.0版本参数效果变更) */
    showDir?: boolean;

    center?: any;

    radius?: number;

    fillColor?: string;

    fillOpacity?: any;
  }

  /* OriginPath */
  export interface OriginPath {
    /* 经度 */
    x?: number;

    /* 纬度 */
    y?: number;

    /* 与正北方向的顺时针夹角，[ 0, 360 ] */
    ag?: number;

    /*
      轨迹点采集的时间，以s为单位
      OriginPath数组第一个元素的tm值为从1970年开始的unix的时间戳，精确到秒
      其余元素的tm值为当前采集点的时间减去第一个元素的采集时间的差值
    */
    tm?: number;

    /* 轨迹点的速度，单位 km/h，小数、整数均可 */
    sp?: number;
  }

  /* GraspedPath */
  export interface GraspedPath {
    /* 总距离 */
    distance?: number;

    /* 纬度 */
    data?: object;
  }

  /* GraspRoad 用于示例化一个轨迹纠偏服务插件 */
  export class GraspRoad {
    constructor();

    driving(path: any, GraspRoadCallback: any): void;
  }

  /* RangingTool插件 */
  export class RangingTool {
    constructor(map?: Map, opts?: Partial<RangingToolOptions>);

    /* 开启距离量测功能 */
    turnOn(): void;

    /* 关闭距离量测功能 */
    turnOff(): void;

    on(a: string, onRangingCallBack: any): void;

    off(a: string, onRangingCallBack: any): void;
  }

  /* PolygonOptions插件 */
  export class PolygonOptions {
    map?: Map;

    zIndex?: number;

    path?: any;

    bubble: boolean;

    cursor: string;

    strokeColor: string;

    strokeOpacity: string;

    strokeWeight: string;

    fillColor: string;

    fillOpacity: any;

    draggable: boolean;

    extData: any;

    strokeStyle: string;

    strokeDasharray: any;

    setPath(path: any): void;

    getPath(): void;

    setOptions(opt: PolygonOptions): void;

    getOptions(): void;

    getBounds(): void;

    getArea(): void;

    hide(): void;

    show(): void;

    setMap(map: Map): void;

    setExtData(ext: any): void;

    getExtData(): void;

    contains(point: LngLat): void;
  }

  /* MouseTool插件 */
  export class MouseTool {
    constructor(map?: Map);

    /* 开启距离量测功能 */
    marker(options: MarkerOptions): void;

    /* 关闭距离量测功能 */
    polyline(options: PolylineOptions): void;

    polygon(options: PolygonOptions): void;

    rectangle(options: PolygonOptions): void;
  }

  /* CircleEditor插件 */
  export class CircleEditor {
    constructor(map?: Map, circle?: Circle);

    open(): void;

    close(): void;

    on(a: string, onMarkerClick: any): any;

    off(a: string, onMarkerClick: any): any;
  }

  export class CircleOptions {
    map?: Map;

    zIndex?: number;

    center?: LngLat;

    bubble?: boolean;

    cursor?: string;

    radius?: number;

    strokeColor?: string;

    strokeOpacity?: any;

    strokeWeight?: number;

    fillColor?: string;

    fillOpacity?: any;

    strokeStyle?: string;

    extData?: any;

    strokeDasharray?: [];
  }

  /* PolyEditor */
  export class PolyEditor {
    constructor(map?: Map, Object?: any);

    open(): void;

    close(): void;

    on(a: string, onMarkerClick: any): any;

    off(a: string, onMarkerClick: any): any;
  }

  /* Polygon */
  export class Polygon {
    constructor(opt: PolylineOptions);

    setPath(path: any[]): void;

    getPath(): any[];

    setOptions(opt: PolylineOptions): void;

    getOptions(): any;

    getLength(): number;

    getBounds(): Bounds;

    hide(): void;

    show(): void;

    setMap(map: Map): void;

    setExtData(ext: any): void;

    getExtData(): void;
  }

  /* Circle */
  export class Circle {
    constructor(opt: CircleOptions);

    setCenter(lnglat: LngLat): void;

    getCenter(): LngLat;

    getBounds(): Bounds;

    setRadius(radius: number): void;

    getRadius(): number;

    setOptions(circleopt: CircleOptions): void;

    getOptions(): object;

    hide(): void;

    show(): void;

    setMap(map: Map): void;

    setExtData(ext: any): void;

    getExtData(): any;

    contains(point: LngLat): boolean;
  }

  export interface RangingToolOptions {
    /* 设置量测起始点标记属性对象，包括点标记样式、大小等 */
    startMarkerOptions: MarkerOptions;
    /* 设置量测中间点标记属性对象，包括点标记样式、大小等 */
    midMarkerOptions: MarkerOptions;
    /* 设置量测结束点标记属性对象，包括点标记样式、大小等 */
    endMarkerOptions: MarkerOptions;
    /* 设置距离量测线的属性对象，包括线样式、颜色等， */
    lineOptions: PolylineOptions;
    /* 设置距离量测过程中临时量测线的属性对象，包括线样式、颜色等， */
    tmpLineOptions: PolylineOptions;
    /* 设置量测起始点标签的文字内容，默认为“起点” */
    startLabelText: string;
    /* 设置量测中间点处标签的文字内容，默认为当前量测结果值 */
    midLabelText: string;
    /* 设置量测结束点处标签的文字内容，默认为当前量测结果值 */
    endLabelText: string;
    /* 设置量测起始点标签的偏移量。默认值：Pixel(-6, 6) */
    startLabelOffset: Pixel;
    /* 设置量测中间点标签的偏移量。默认值：Pixel(-6, 6) */
    midLabelOffset: Pixel;
    /* 设置量测结束点标签的偏移量。默认值：Pixel(-6, 6) */
    endLabelOffset: Pixel;
  }

  /* Polyline类 */
  export class Polyline {
    /* 构造折线对象, 通过PolylineOptions指定折线样式 */
    constructor(opt: PolylineOptions);

    /* 设置组成该折线的节点数组 */
    setPath(path: AMap.LngLat[]): void;

    /* 获取折线路径的节点数组。其中lat和lng是经纬度参数。 */
    getPath(): [];

    /* 修改折线属性(包括路径的节点、线样式、是否绘制大地线等。属性详情参看PolylineOptions列表) */
    setOptions(opt: PolylineOptions): void;

    /* 获取线的属性 */
    getOptions(): any;

    /* 获取折线的总长度(单位: 米) */
    getLength(): number;

    /* 获取当前折线的矩形范围对象 */
    getBounds(): Bounds;

    /* 地图上隐藏指定折线 */
    hide(): void;

    /* 地图上显示指定折线 */
    show(): void;

    /* 设置折线所在的地图。参数map即为目标地图, 参数为null时, 在地图上移除当前折线 */
    setMap(map: Map): void;

    /* 设置用户自定义属性, 支持JavaScript API任意数据类型, 如Polyline的id等 */
    setExtData(ext: any): void;

    /* 获取用户自定义属性 */
    getExtData(): any;
  }

  /* 组合了旋转、倾斜、复位、缩放在内的地图控件，自V1.4.0版本新增。 */
  export class ControlBar {
    constructor(opt: ControlBarOptions);
  }

  export interface ControlBarOptions {
    /* 控制显示位置，如{top:’10px’,right:’10px’} */
    position: Record<string, any>;
    /* 是否显示缩放按钮。移动端默认为false，PC端为默认为true */
    showZoomBar: boolean;
    /* 是否显示倾斜、旋转按钮。移动端默认为false，PC端为默认为true */
    showControlButton: boolean;
  }

  /* 地图类型切换插件，用于切换设定好的几个常用地图图层。 */
  export class MapType {
    constructor(opt?: MaptypeOptions);

    /* 显示地图类型切换控件 */
    show(): void;

    /* 隐藏地图类型切换控件 */
    hide(): void;
  }

  export interface MaptypeOptions {
    /* 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0 */
    defaultType: 1 | 0;
    /* 叠加实时交通图层 默认值：false */
    showTraffic: boolean;
    /* 叠加路网图层 默认值：false */
    showRoad: boolean;
  }

  /* 地图类型切换插件，用于切换设定好的几个常用地图图层。 */
  export class Scale {
    /* 事件 */
    event: {
      /* 显示比例尺插件时触发的事件 */
      show: 'show';
      /* 隐藏比例尺插件时触发的事件 */
      hide: 'hide';
    };

    /* 显示比例尺 */
    show(): void;

    /* 隐藏比例尺 */
    hide(): void;
    /* 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10) */

    offset(): Pixel;

    /*
     * 控件停靠位置
     * LT:左上角;
     * RT:右上角;
     * LB:左下角;
     * RB:右下角;
     * 默认位置：LB
     */
    position(): string;
  }

  export class ToolBar {
    /* 获取工具条相对于地图容器左上角的偏移量 */
    getOffset(): Pixel;

    /* 设置工具条相对于地图容器左上角的偏移量 */
    setOffset(offset: Pixel): void;

    /* 隐藏缩放级别等级条 */
    hideRuler(): void;

    /* 显示缩放级别等级条 */
    showRuler(): void;

    /* 隐藏方向键盘 */
    hideDirection(): void;

    /* 显示方向键盘 */
    showDirection(): void;

    /* 隐藏定位小部件 */
    hideLocation(): void;

    /* 显示定位小部件 */
    showLocation(): void;

    /* 进行位置定位，浏览器须支持html5，且用户须同意共享位置信息。结果位置信息通过location事件函数获取 */
    doLocation(): void;

    /* 获取上次定位的结果(lng、lat)。执行该功能的前须进行位置定位：doLocation，且定位事件已经执行完毕 */
    getLocation(): LngLat;

    /* 隐藏工具条 */
    hide(): void;

    /* 显示工具条 */
    show(): void;

    on(
      eventName: 'show' | 'hide' | 'location' | 'zoomchanged',
      handler: (e: MapsEvent) => void,
      context?: any,
    ): void;

    off(
      eventName: 'show' | 'hide' | 'location' | 'zoomchanged',
      handler: (e: MapsEvent) => void,
      context?: any,
    ): void;
  }

  export interface ToolbarOptions {
    /* 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10) */
    offset: Pixel;
    /*
     * 控件停靠位置
     * LT:左上角;
     * RT:右上角;
     * LB:左下角;
     * RB:右下角;
     * 默认位置：LT
     */
    position: string;
    /* 标尺键盘是否可见，默认为true */
    ruler: boolean;
    /* 定位失败后，是否开启IP定位，默认为false */
    noIpLocate: boolean;
    /* 是否显示定位按钮，默认为false */
    locate: boolean;
    /* 是否使用精简模式，默认为false */
    liteStyle: boolean;
    /* 方向键盘是否可见，默认为true */
    direction: boolean;
    /* 是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，仅在支持HTML5的浏览器中有效，默认为false */
    autoPosition: boolean;
    /* 自定义定位图标，值为Marker对象 */
    locationMarker: Marker;
    /* 是否使用高德定位sdk用来辅助优化定位效果，默认：false */
    useNative: boolean;
  }

  export class InfoWindow {
    constructor(opt: InfoWindowOptions);

    open(map: Map, pos: AMap.LngLat): void;

    close(): void;

    getIsOpen(): boolean;

    setContent(content: string | Element): void;

    getContent(): string;

    setPosition(lnglat: LngLat): void;

    getPosition(): LngLat;

    getAnchor(): string;

    setAnchor(
      anchor:
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'middle-left'
        | 'center'
        | 'middle-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right',
    ): void;

    setSize(size: Size): void;

    getSize(): Size;

    on(
      eventName: 'change' | 'open' | 'close',
      handler: (e: MapsEvent) => void,
      context?: any,
    ): void;

    off(
      eventName: 'change' | 'open' | 'close',
      handler: (e: MapsEvent) => void,
      context?: any,
    ): void;
  }

  export interface InfoWindowOptions {
    isCustom?: boolean;
    autoMove?: boolean;
    closeWhenClickMap?: boolean;
    content?: string | Element;
    size?: Size;
    anchor?: string;
    offset?: Pixel;
    position?: LngLat;
    showShadow?: boolean;
  }
}

/* eslint-enable */
