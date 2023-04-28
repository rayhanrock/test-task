import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CContainer,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CFormCheck,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [optionList, setOptionList] = useState([]);
  const [selectedOptionList, setselectedOptionList] = useState([]);
  const [defaultptionList, setdefaultptionList] = useState([]);
  const [ckname, setckname] = useState('');

  const getData = React.useCallback(async () => {
    axios
      .get('/data/menu.json')
      .then((res) => {
        setOptionList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getCookie = React.useCallback(async () => {
    const ckname = localStorage.getItem('name');
    const ckselectedOptionList = JSON.parse(localStorage.getItem('option'));
    if (ckname != null) {
      setckname(ckname);
    }
    if (ckselectedOptionList != null) {
      setdefaultptionList(ckselectedOptionList);
    }
  }, []);

  useEffect(() => {
    getCookie();
    getData();
  }, []);

  const handleSelect = (e) => {
    let optionList = [];

    e.map((val, i) => {
      optionList.push(val);
    });

    setselectedOptionList(optionList);
    setdefaultptionList(optionList);
  };

  let options = [];
  options = optionList;
  let defoptions = [];
  defoptions = defaultptionList;
  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const name = event.target.name.value;
    const agreement = event.target.box.checked;
    if (isEmptyOrSpaces(name)) {
      toast.error("Name can't be empty.");
    } else if (selectedOptionList.length == 0) {
      toast.error('Select at least one item');
    } else if (!agreement) {
      toast.error('Please accept agreement first ');
    } else {
      console.log(name, agreement, selectedOptionList);
      localStorage.setItem('name', name);
      localStorage.setItem('option', JSON.stringify(selectedOptionList));
      toast.success('Form Submitted !');

      let value = [];

      selectedOptionList.map((val, i) => {
        value.push(val.label);
      });

      const newObj = {
        name: name,
        options: value,
        agree: true,
      };

      const mainDB = JSON.parse(localStorage.getItem('db'));
      if (mainDB != null) {
        mainDB.push(newObj);
        localStorage.setItem('db', JSON.stringify(mainDB));
      } else {
        localStorage.setItem('db', JSON.stringify([newObj]));
      }
    }
  };

  const clearCoockie = () => {
    localStorage.clear();
    setckname('');
    setdefaultptionList([]);
    getCookie();
  };

  return (
    <div className='App'>
      <CContainer style={{ marginTop: '2rem' }}>
        <CCard>
          <CCardHeader
            component='h5'
            style={{ padding: '1rem' }}>
            Please enter your name and pick the Sectors you are currently
            involved in.
          </CCardHeader>
          <CCardBody>
            <CForm
              className='row g-3'
              onSubmit={handleSubmit}>
              <CCol xs={12}>
                <CFormLabel htmlFor='name'>Name</CFormLabel>
                <CFormInput
                  defaultValue={ckname}
                  placeholder='enter your name'
                  name='name'
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor='sectors'>Sectors</CFormLabel>

                <Select
                  value={defoptions}
                  onChange={(e) => handleSelect(e)}
                  options={options}
                  isMulti
                />
              </CCol>

              <CCol xs={12}>
                <CFormCheck
                  name='box'
                  type='checkbox'
                  label='Agree to terms'
                />
              </CCol>
              <CCol xs={12}>
                <CButton
                  color='secondary'
                  type='submit'>
                  Save
                </CButton>
                <CButton
                  style={{ marginLeft: '1rem' }}
                  color='secondary'
                  onClick={clearCoockie}>
                  Clear session
                </CButton>
                <CButton
                  style={{ marginLeft: '1rem' }}
                  color='secondary'
                  to={'/list'}
                  component={Link}>
                  List View
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CContainer>
      <ToastContainer />
    </div>
  );
}

export default Home;
