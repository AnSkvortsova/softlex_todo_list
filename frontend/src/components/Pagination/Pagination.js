import { React, useState } from 'react';
import { PAGE_SIZE } from '../../utils/constance';

export function Pagination(props) {
  const pagesCount = Math.ceil(props.totalTaskCount / PAGE_SIZE);
  const pages = [];
  const [currentPage, setCurrentPageState] = useState(1); 

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  };

  function handleBtn(evt) {
    const pageNumber = +evt.target.name
    setCurrentPageState(pageNumber);
    props.onPaginationBtn(pageNumber);
  };

  return(
    <div className='pagination'>
      {pages.map((page) => (
        <button 
          className={`pagination__page ${currentPage === page && 'pagination__page_active'}`}
          type='button'
          onClick={handleBtn}
          name={page}
          key={page}>{page}</button>
      ))}
    </div>
  )
};