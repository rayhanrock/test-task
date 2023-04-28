import React from 'react';
import { useState, useEffect } from 'react';
import {
  CTable,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CContainer,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const mainDB = JSON.parse(localStorage.getItem('db'));
    if (mainDB != null) {
      setList(mainDB);
    }
  }, []);
  return list.length == 0 ? (
    <h2 className='header'>No data found</h2>
  ) : (
    <CContainer>
      <h2 className='header'>Submitted List</h2>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>Name</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Selectors</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Agreement</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {list.map((list, id) => (
            <CTableRow key={id}>
              <CTableHeaderCell scope='row'>{list.name}</CTableHeaderCell>
              <CTableDataCell>{list.options.join(', ')}</CTableDataCell>
              <CTableDataCell>{list.agree ? 'true' : 'false'}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};

export default List;
