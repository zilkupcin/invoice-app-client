import { useContext } from "react";
import { LoaderContext } from "./LoaderProvider";
import Invoice from "./Invoice";
import { ACTION_LOAD_INVOICES } from "../data/constants";
import Loader from "./Loader";
import NoContent from "./NoContent";

const InvoiceList = ({ invoices }) => {
  const { isLoading } = useContext(LoaderContext);

  if (isLoading(ACTION_LOAD_INVOICES)) return <Loader />;
  if (invoices.length === 0) return <NoContent />;

  return (
    <ul>
      {invoices.map((invoice) => {
        return <Invoice invoice={invoice} />;
      })}
    </ul>
  );
};

export default InvoiceList;
