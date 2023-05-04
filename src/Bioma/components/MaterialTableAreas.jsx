import * as React from 'react'; 
import PropTypes from 'prop-types';

//MATERIAL UI
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
//
import { useEffect } from 'react';
import { useAreaStore } from '../../hooks/useAreaStore';
import { useUiStore } from '../../hooks/useUiStore';
import { motion } from 'framer-motion';
import '../styles/MaterialTable.css'


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Descripcion',
  },
  {
    id: 'amenities',
    numeric: false,
    disablePadding: true,
    label: 'Amenidades',
  },
  {
    id: 'pricePerHour',
    numeric: false,
    disablePadding: true,
    label: 'Precio/Hr',
  },
  {
    id: 'capacity',
    numeric: false,
    disablePadding: true,
    label: 'Capacidad',
  },
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Imagen',
  },
];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'email';
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  
};

function EnhancedTableToolbar(props) {
  const { numSelected, onIconEdit, onIconDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Usuario Seleccionado
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', marginLeft: 3 }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Areas
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
        <Tooltip title="Edit">
          <IconButton onClick={onIconEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={onIconDelete}>
            <DeleteIcon sx={{color: 'red'}} />
          </IconButton>
        </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onIconEdit: PropTypes.func.isRequired,
  onIconDelete: PropTypes.func.isRequired,
};

export function MaterialTableAreas() {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [tablePage, setTablePage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [areaId , setAreaId] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [deleteClick, setDeleteClick] = React.useState(false);
  const [isLoadingArea, setIsLoadingArea] = React.useState(false);
  
  const { areas, startLoadingAreas, changeIsEditing, loadArea, startDeletingArea} = useAreaStore();
  const { isAreaModalOpen, closeAreaModal, openAreaModal, page } = useUiStore();


  const onCloseModal = () => {
    closeAreaModal();
  }
  const onOpenEditModal = (id) => {
    const area = areas.find((element) => element.id === id);
    changeIsEditing(true);
    loadArea(area);  
    openAreaModal();
  }

  const onDeleteButton = async (id) => {
    const area = areas.find((element) => element.id === id);
    const areaIndex = areas.findIndex((element) => element.id === id);
    const areaDelete = {...area}
    setVisibleRows([]);
    setSelected([]);
    await startDeletingArea(areaDelete,areaIndex); 
    deleteClick ? setDeleteClick(false) : setDeleteClick(true);
  }

  useEffect(() => {
  
    handleChangePage(undefined, tablePage, areas);
    // console.log('Se renderizo');
    // console.log(areas);

  },[areas]);


  useEffect(() => {
      setIsLoadingArea(true);
      const fetchData = async () =>{
        const result = startLoadingAreas();
        result.then(value => {  
      let rowsOnMount = stableSort(
      value,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );
    
    setVisibleRows(rowsOnMount);
    // changeInformation(page,setInformationTable);
    setIsLoadingArea(false);
        });
      }
      fetchData();
  },[] );



  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(areas, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        tablePage * rowsPerPage,
        tablePage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, tablePage, rowsPerPage],
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = areas.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
        console.log(id)
    if (selectedIndex === -1) {
      newSelected.push(id);
      setSelected(newSelected);
      setAreaId(id);
      }
    else if(selectedIndex === 0){
      setSelected([]);
      setAreaId(0);
      }
  };
  

  const handleChangePage = React.useCallback(
    (event, newPage, rows) => {
      setTablePage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );
      // console.log(rows);  
      setSelected([]);
      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage],
  );


  const handleChangeRowsPerPage = React.useCallback(
    (event, rows) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy],
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <motion.div 
    className='zonaTable'
    initial={{y: 500}}
    animate={{y: 0}}
    exit={{y: 5, transition: {duration: 0.1}}}
    >
    {/* {console.log(isLoadingArea)} */}
    {visibleRows.length == 0 
    ?     <Stack sx={{ width: '100%',mt: 30, color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
              <LinearProgress color="success" />
              <LinearProgress color="inherit" />
              <LinearProgress color="success" />
              <LinearProgress color="inherit" />
          </Stack>
     
     
    : <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
            numSelected={selected.length} 
            onIconEdit={() => onOpenEditModal(areaId)} 
            onIconDelete={() => onDeleteButton(areaId)} 
            
          />
        <TableContainer>
          <Table 
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={areas.length}
             
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer'}}

                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                        >
                          {row.name}
                        </TableCell> */}
                        
                        <TableCell align="center" id={labelId} >{row.name}</TableCell>
                        <TableCell align="center" >{row.description}</TableCell>
                        <TableCell align="center" >{row.amenities}</TableCell>
                        <TableCell align="center" >{row.pricePerHour}</TableCell>
                        <TableCell align="center" >{row.capacity}</TableCell>
                        <TableCell align="center" ><img src={row.image} alt="areaImage" style={{width: 80, height: 80}} /></TableCell> 
                       
                      </TableRow>
                    );
                  })
                : null}
              {paddingHeight > 0 && (
                <TableRow
                  style={{
                    height: paddingHeight,
                  }}
                >

                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={areas.length}
          rowsPerPage={rowsPerPage}
          page={tablePage}
          onPageChange={ (event,tablePage) => handleChangePage(event, tablePage, areas) }
          onRowsPerPageChange={ (event) => handleChangeRowsPerPage(event, areas) }
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
    } 
    {/* //////////////////////////sfgaf */}
    </motion.div>
    
  );
}