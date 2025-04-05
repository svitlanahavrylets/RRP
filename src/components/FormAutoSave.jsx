import { useEffect } from "react";
import { useFormikContext } from "formik";

const STORAGE_KEY = "orderServiceFormData";

const saveToStorage = (values) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
};

const FormAutoSave = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    saveToStorage(values);
  }, [values]);

  return null;
};

export default FormAutoSave;
