const endpoint = "https://invoice-app-zil.herokuapp.com/api/";

export const getAllInvoices = async () => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("invoice_app_token"),
  });

  const response = await fetch(`${endpoint}invoices/`, {
    headers: headers,
  });
  const data = await response.json();
  return data;
};

export const addInvoice = async (invoiceData) => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("invoice_app_token"),
  });

  const response = await fetch(`${endpoint}invoices/add`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(invoiceData),
  });

  return response;
};

export const getInvoiceById = async (invoiceId) => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("invoice_app_token"),
  });

  const response = await fetch(`${endpoint}invoices/${invoiceId}`, {
    headers: headers,
  });

  const data = await response.json();

  return data;
};

export const deleteInvoiceById = async (invoiceId) => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("invoice_app_token"),
  });

  const response = await fetch(`${endpoint}invoices/delete/${invoiceId}`, {
    method: "POST",
    headers: headers,
  });

  return response;
};

export const markAsPaidById = async (invoiceId) => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("invoice_app_token"),
  });

  const response = await fetch(`${endpoint}invoices/paid/${invoiceId}`, {
    headers: headers,
  });

  const data = await response.json();
  return data;
};

export const editInvoiceById = async (data, invoiceId) => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("invoice_app_token"),
  });

  const response = await fetch(`${endpoint}invoices/edit/${invoiceId}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  return response;
};

export const demoLogin = async () => {
  const response = await fetch(`${endpoint}user/demo`);
  const data = await response.json();
  return data;
};
