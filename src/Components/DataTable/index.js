import React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import {
  getRealGridData,
  getCommodityColumns,
} from "@mui/x-data-grid-generator";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function DataTable({ rows, columns, hideFooter }) {
  const [loadedRows, setLoadedRows] = React.useState([]);

  const mounted = React.useRef(true);

  const loadServerRows = async (newRowLength) => {
    setLoading(true);
    const newData = await getRealGridData(newRowLength, getCommodityColumns());
    // Simulate network throttle
    await sleep(Math.random() * 500 + 100);

    if (mounted.current) {
      setLoadedRows(loadedRows.concat(newData));
    }
  };

  const handleOnRowsScrollEnd = (params) => {
    if (loadedRows.length <= 5) {
      loadServerRows(params.viewportPageSize);
    }
  };

  React.useEffect(() => {
    return () => {
      mounted.current = true;
    };
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        hideFooter={hideFooter}
        onRowsScrollEnd={handleOnRowsScrollEnd}
        checkboxSelection
      />
    </div>
  );
}

DataTable.propTypes = {
  rows: PropTypes.any.isRequired,
  columns: PropTypes.any.isRequired,
  hideFooter: PropTypes.any,
};
