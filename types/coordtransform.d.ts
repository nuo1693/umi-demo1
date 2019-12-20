declare module 'coordtransform' {
  type Lng = number;
  type Lat = number;
  type LngLat = [Lng, Lat];
  /**
   * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
   * 即 百度 转 谷歌、高德
   * @param lng
   * @param lat
   * @returns {LngLat}
   */
  export function bd09togcj02(lng: Lng, lat: Lat): LngLat;

  /**
   * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
   * 即 百度 转 谷歌、高德
   * @param lng
   * @param lat
   * @returns {LngLat}
   */
  export function gcj02tobd09(lng: Lng, lat: Lat): LngLat;

  /**
   * WGS84转GCj02
   * @param lng
   * @param lat
   * @returns {LngLat}
   */
  export function wgs84togcj02(lng: Lng, lat: Lat): LngLat;

  /**
   * GCJ02 转换为 WGS84
   * @param lng
   * @param lat
   * @returns {LngLat}
   */
  export function gcj02towgs84(lng: Lng, lat: Lat): LngLat;
}
