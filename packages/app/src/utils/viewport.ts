/**
 * Get grid config from viewport
 * @param width : viewport width;
 * @param height : viewport height
 */
export function getGridSize(width: number, height: number) {
  const rowCount = Math.round(height / 70)
  const colCount = Math.round(width / 80)

  return {
    rowCount,
    colCount,
    row: height / rowCount,
    col: width / colCount
  }
}
