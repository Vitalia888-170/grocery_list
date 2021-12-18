import { useCallback, useEffect, useState } from 'react';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';
import { ProductsList } from './components/ProductsList';
import { Field } from './components/Field';
import './App.css';
import { iconGenerator } from './mealsIcons/mealsIconGenerator';
import { SpeechTransformer } from './components/SpeechTransformer';


const getLocalStorage = () => {
  let storageList = localStorage.getItem('list');
  if (storageList) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}

const App = () => {
  const [list, setList] = useState(getLocalStorage());
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  const handleSubmit = () => {
    if (!value) {
      return showAlert(true, 'You can`t submit empty field', 'danger');
    } else if (value && isEditing === true) {
      setList(list.map((item) => {
        if (item.id === editID) {
          return { ...item, name: value }
        }
        return item;
      }))
      setValue('');
      setIsEditing(false);
      setEditID(0);
      showAlert(true, 'You edited item successfully', 'success');
    } else {
      let icon = iconGenerator(value);
      let id = uuidv4();
      setList(() => {
        return [{ id, name: value, url: icon }, ...list]
      });
      setValue('');
      showAlert(true, 'You added new item', 'success');
    }
  }

  const showAlert = (show = false, message = '', type = '') => {
    setAlert({ show, message, type });
  }
  const removeAlert = () => {
    showAlert(false);
  }

  const deleteProduct = useCallback(
    (itemId) => {
    showAlert(true, 'You removed choosing item', 'danger');
    setList(list.filter(elem => elem.id !== itemId));
  },[isEditing]);
  const clearList = () => {
    showAlert(true, 'Your list is clear now', 'danger');
    setList([]);
  }

  const editProduct = useCallback((itemId) => {
    setEditID(itemId);
    setIsEditing(true);
    const editElem = list.find(elem => elem.id === itemId);
    setValue(`${editElem.name}`);
  },[isEditing]);

  return (
    <div className="wrapper">
      {alert.show && <Alert {...alert} list={list} removeAlert={removeAlert} />}
      <div className="title">
        <h1>Shopping list</h1>
      </div>
      <Field
        handleSubmit={handleSubmit}
        value={value}
        setValue={setValue}
        isEditing={isEditing}
      />
      <ProductsList
        list={list}
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      />
      {
        list.length > 1 ? <p className="clear" onClick={() => clearList()}>Clear all</p> : null
      }
      <SpeechTransformer
        setValue={setValue}
        value={value}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
