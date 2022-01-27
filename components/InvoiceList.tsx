import { FC, useContext } from "react";
import { LoaderContext } from "./LoaderProvider";
import Invoice from "./Invoice";
import { ACTION_LOAD_INVOICES } from "../data/constants";
import IInvoice from "../interfaces/interface";
import Loader from "./Loader";
import NoContent from "./NoContent";

interface InvoiceListProps {
  invoices: Array<IInvoice>;
}

const InvoiceList: FC<InvoiceListProps> = ({ invoices }) => {
  const { isLoading } = useContext(LoaderContext);

  if (isLoading(ACTION_LOAD_INVOICES)) return <Loader />;
  if (invoices.length === 0) return <NoContent />;

  return (
    <ul>
      {invoices.map((invoice) => {
        return <Invoice key={invoice._id} invoice={invoice} />;
      })}
    </ul>
  );
};

export default InvoiceList;
