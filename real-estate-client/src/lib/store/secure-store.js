
import secureLocalStorage from "react-secure-storage"

const setItem = (key, value) => {
    const data = {
        value: value,
        timestamp: new Date().getTime()
    };
    secureLocalStorage.setItem(key, JSON.stringify(data));
}

const getItem = (key) => {
    const data = JSON.parse(secureLocalStorage.getItem(key));
    if (data) {
        return data;
    }
    return null;
}

const removeItem = (key) => {
    secureLocalStorage.removeItem(key)
}

const clearAll = () => {
    secureLocalStorage.clear()
}

const getList = (key) => {
    const tempData = JSON.parse(secureLocalStorage.getItem(key));
    return tempData ? tempData : [];
}

const SecureStorageService = {
    setItem,
    getItem,
    getList,
    removeItem,
    clearAll
}

export default SecureStorageService