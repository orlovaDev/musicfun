type Props = {
  pageSize: number
  changePageSize: (size: number) => void
}

const PAGE_SIZE_OPTIONS = [2, 4, 8, 16, 32]

export const PageSizeSelector = ({ pageSize, changePageSize }: Props) => {
  return (
    <label>
      Show
      <select value={pageSize} onChange={(e) => changePageSize(Number(e.target.value))}>
        {PAGE_SIZE_OPTIONS.map((size) => (
          <option value={size} key={size}>
            {size}
          </option>
        ))}
      </select>
      per page
    </label>
  )
}
