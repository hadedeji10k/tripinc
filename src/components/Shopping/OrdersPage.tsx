import { useState, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IOrderDetails, IPagination } from "../../api/interfaces";
import { getUserOrder } from "../../api";
import { currencySymbolHelper, localGetUserId } from "../../utils/helpers";
import { Link } from "react-router-dom";

const Row = (props: { row: IOrderDetails }) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="td" scope="row">
          <Link
            style={{ color: "inherit" }}
            to={
              row.status.toLowerCase() === "pending"
                ? `/shopping/order/${row.id}`
                : `/shopping/order/${row.id}`
            }
          >
            {row.orderReference}
          </Link>
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">
          {currencySymbolHelper(row.currency)}
          {row.totalAmount}
        </TableCell>
        <TableCell align="right">{row.paid ? "Paid" : "Not Paid"}</TableCell>
        <TableCell align="right">
          {currencySymbolHelper(row.currency)}
          {row.amountPaid}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items In Order
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((itemInOrder) => (
                    <TableRow key={itemInOrder.itemName}>
                      <TableCell component="th" scope="row">
                        {itemInOrder.itemName}
                      </TableCell>
                      <TableCell>{itemInOrder.quantity}</TableCell>
                      <TableCell align="right">
                        {itemInOrder.unitPrice}
                      </TableCell>
                      <TableCell align="right">
                        {itemInOrder.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const Orders = () => {
  const [pagination, setPagination] = useState<IPagination | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newRows, setNewRows] = useState<IOrderDetails[]>([]);
  const [userId] = useState<number | null>(() => localGetUserId());

  useEffect(() => {
    getUserOrder(userId).then((res) => {
      setNewRows(res.data.items);
      console.log(res.data);

      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
    });
  }, [userId]);

  const handlePaginationPrev = async () => {
    setIsLoading(true);
    const query = `PageNumber=${pagination?.currentPage - 1}&PageSize=${
      pagination?.pageSize
    }`;
    await getUserOrder(17, query).then((res) => {
      setNewRows(res.data.items);

      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
    });
    setIsLoading(false);
  };

  const handlePaginationNext = async () => {
    setIsLoading(true);
    const query = `PageNumber=${pagination?.currentPage + 1}&PageSize=${
      pagination?.pageSize
    }`;
    await getUserOrder(17, query).then((res) => {
      setNewRows(res.data.items);

      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
    });
    setIsLoading(false);
  };

  return (
    <div className="order_page_table">
      <h3 className="basic_details_header">Orders</h3>
      <br />
      {newRows && newRows.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Order Reference</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Total Amount</TableCell>
                  <TableCell align="right">Paid</TableCell>
                  <TableCell align="right">Amount Paid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newRows.map((row, index) => (
                  <Row key={index} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <div className="explore_page_number">
            <span>
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </span>
            <span>
              {(pagination?.currentPage - 1) * pagination?.pageSize + 1} -
              {pagination?.hasNext
                ? pagination?.pageSize * pagination?.currentPage
                : pagination?.totalCount}
            </span>
          </div>
          <div className="scroll_button">
            {pagination?.hasPrevious ? (
              <button
                className={
                  pagination?.hasPrevious
                    ? "explore_navigation_button_active"
                    : "explore_navigation_button"
                }
                onClick={handlePaginationPrev}
                disabled={!pagination?.hasPrevious}
              >
                Prev
              </button>
            ) : null}
            {pagination?.hasNext ? (
              <button
                className={
                  pagination?.hasNext
                    ? "explore_navigation_button_active"
                    : "explore_navigation_button"
                }
                onClick={handlePaginationNext}
                disabled={!pagination?.hasNext}
              >
                Next
              </button>
            ) : null}
          </div>
        </>
      ) : (
        <h3 className="basic_details_title">You have no orders yet.</h3>
      )}
    </div>
  );
};

export default Orders;
