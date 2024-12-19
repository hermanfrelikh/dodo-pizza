import ReactPaginate from 'react-paginate';

import styles from "./Pagination.module.scss"

type PaginationProps = {
  setCurrentPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({setCurrentPage})=> {
    return(
        <>
        <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => setCurrentPage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
        </>
    )
}
export default Pagination