import Invoice from "./Invoice";

const InvoiceList = ({ invoices }) => {
  invoices = [0, 1];

  return (
    <ul>
      {invoices.map((invoice) => {
        return <Invoice invoice={invoice} />;
      })}
    </ul>
  );
};

export default InvoiceList;
