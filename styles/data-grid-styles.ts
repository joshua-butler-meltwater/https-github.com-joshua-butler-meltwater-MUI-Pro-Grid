import { SxProps, Theme } from "@mui/material/styles";

// Color constants
const colors = {
  teal: {
    main: "#1D9F9F",
    dark: "#00726E",
    light: "#E0F1F2",
    lightHover: "#d0e8e9",
  },
  border: "#e0e0e0",
  headerBackground: "#f5f5f5",
  pinnedDivider: "#9e9e9e", // Darker color for better visibility
};

// Reusable styles for components
export const styles = {
  // Main container styles
  paperContainer: {
    width: "100%",
    overflow: "hidden",
    fontFamily: "Helvetica, Arial, sans-serif",
    position: "relative",
    boxShadow: "0px 8px 30px -15px rgba(0,0,0,0.15), 0px 15px 40px -20px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  },
  
  // Selection header styles
  selectionHeader: {
    position: "absolute", 
    top: 0, 
    left: 0, 
    right: 0, 
    zIndex: 2,
    backgroundColor: colors.teal.light,
    display: "flex",
    alignItems: "center",
    px: 2,
    height: "52px",
    borderBottom: `1px solid ${colors.teal.main}`,
    borderRadius: "4px 4px 0 0"
  },
  
  // Action buttons (close, edit, delete, etc.)
  actionButton: {
    color: colors.teal.dark
  },

  // Main header toolbar
  toolbar: {
    p: 1,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid ${colors.border}`,
    height: "52px",
    minHeight: "52px !important",
  },
  
  // Header typography
  headerTitle: {
    fontWeight: 700,
    fontSize: "16px",
    fontFamily: "Helvetica, Arial, sans-serif",
  },
  
  // Search & Filter action buttons
  actionIconButton: (active: boolean): SxProps<Theme> => ({
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(active && {
      backgroundColor: colors.teal.light,
      color: colors.teal.dark,
      "&:hover": {
        backgroundColor: colors.teal.lightHover,
      },
    }),
  }),
  
  // Filter badge
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    bgcolor: colors.teal.dark,
    color: "white",
    width: 16,
    height: 16,
    borderRadius: "50%",
    fontSize: "11px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid white",
  },
  
  // Search bar container
  searchContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    px: 2,
    height: "100%",
  },
  
  // DataGrid cell truncation styles
  cellTruncation: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.3em',
    maxHeight: '2.6em' // Approximately 2 lines
  },
  
  // DataGrid main container
  dataGridContainer: {
    height: 600, 
    width: "100%", 
    position: "relative"
  },
  
  // Checkbox custom styles
  checkbox: {
    '&.Mui-checked': { color: colors.teal.main },
    '&.MuiCheckbox-indeterminate': { color: colors.teal.main },
    padding: 0,
  },
  
  // Checkbox container in cells
  checkboxContainer: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
    height: '100%'
  },

  // MUI DataGrid root styles
  dataGridRoot: {
    fontFamily: "Helvetica, Arial, sans-serif",
    height: "100%", 
    width: "100%",
    boxSizing: "border-box",
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: colors.headerBackground,
      position: "sticky",
      top: 0,
      zIndex: 1,
      height: "52px !important",
      minHeight: "52px !important",
      maxHeight: "52px !important",
      lineHeight: "52px",
      borderBottom: `1px solid ${colors.border} !important`, 
      "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: "bold",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: "14px",
      },
    },
    // Column separators
    "& .MuiDataGrid-columnSeparator": {
      visibility: "visible",
    },
    "& .MuiDataGrid-iconSeparator": {
      color: colors.border,
    },
    "& .MuiDataGrid-columnSeparator--sideRight::after": {
      display: "unset",
    },
    // Cell styling
    "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
      border: "none",
      borderBottom: `1px solid ${colors.border}`,
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
      lineHeight: "normal",
      margin: 0,
    },
    "& .MuiDataGrid-cell": {
      overflow: "hidden !important",
      whiteSpace: "normal",
      borderBottom: `1px solid ${colors.border}`,
      borderTop: "none",
      fontFamily: "Helvetica, Arial, sans-serif",
      padding: 1,
      height: "auto !important",
      maxHeight: "72px !important",
      display: "flex",
      alignItems: "center", 
      justifyContent: "flex-start",
      margin: 0,
      "& .MuiBox-root": {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
      },
      "& p, & span, & div:not(.MuiBox-root)": {
        margin: 0,
        alignSelf: "center",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
      }
    },
    // Virtual scroller
    "& .MuiDataGrid-virtualScroller": {
      marginTop: "0 !important",
      "& .MuiDataGrid-virtualScrollerContent": {
         marginBottom: 0,
      },
      "& .MuiDataGrid-virtualScrollerRenderZone": {
        gap: 0,
      }
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },
    border: "none",
    // Pagination
    "& .MuiTablePagination-root": {
      fontFamily: "Helvetica, Arial, sans-serif",
      borderTop: `1px solid ${colors.border}`,
    },
    "& .MuiTablePagination-selectLabel": {
      marginBottom: 0,
      display: "flex",
      alignItems: "center",
    },
    "& .MuiTablePagination-select": {
      marginLeft: 1,
      marginRight: 1,
    },
    "& .MuiTablePagination-displayedRows": {
      marginBottom: 0,
      marginLeft: 8,
    },
    "& .MuiTablePagination-spacer": {
      flex: 1,
      minWidth: 80,
    },
    "& .MuiTablePagination-toolbar": {
      display: "flex",
      justifyContent: "space-between",
      "& > div:first-of-type": {
        marginRight: 4,
      }
    },
    // Pinned columns
    "& .MuiDataGrid-pinnedColumnHeaders, & .MuiDataGrid-pinnedColumns": {
      position: "relative",
      zIndex: 50,
      "&.MuiDataGrid-pinnedColumns--left": {
        borderRight: `1px solid ${colors.border}`,
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.04), 0px 1px 18px 0px rgba(0,0,0,0.02)",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "1px",
          backgroundColor: colors.border,
          zIndex: 100,
          pointerEvents: "none"
        }
      },
      "&.MuiDataGrid-pinnedColumns--right": {
        borderLeft: `1px solid ${colors.border}`,
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.04), 0px 1px 18px 0px rgba(0,0,0,0.02)",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "1px",
          backgroundColor: colors.border,
          zIndex: 100,
          pointerEvents: "none"
        }
      }
    },
    // More pinned column styles
    "& .MuiDataGrid-pinnedColumnHeaders": {
      position: "relative",
      zIndex: 50,
      "&.MuiDataGrid-pinnedColumnHeaders--left": {
        borderRight: `1px solid ${colors.border}`,
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.04), 0px 1px 18px 0px rgba(0,0,0,0.02)",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "1px",
          backgroundColor: colors.border,
          zIndex: 100,
          pointerEvents: "none"
        }
      },
      "&.MuiDataGrid-pinnedColumnHeaders--right": {
        borderLeft: `1px solid ${colors.border}`,
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.04), 0px 1px 18px 0px rgba(0,0,0,0.02)",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "1px",
          backgroundColor: colors.border,
          zIndex: 100,
          pointerEvents: "none"
        }
      }
    },
    // Important overrides for pinned columns
    ".MuiDataGrid-pinnedColumns--left": {
      borderRight: `1px solid ${colors.border} !important`,
    },
    ".MuiDataGrid-pinnedColumns--right": {
      borderLeft: `1px solid ${colors.border} !important`,
    },
    ".MuiDataGrid-pinnedColumnHeaders--left": {
      borderRight: `1px solid ${colors.border} !important`,
    },
    ".MuiDataGrid-pinnedColumnHeaders--right": {
      borderLeft: `1px solid ${colors.border} !important`,
    },
    // Additional pinned border elements
    "& .MuiDataGrid-pinnedColumns--left::after, & .MuiDataGrid-pinnedColumnHeaders--left::after": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%", // Extended to full height
      width: "2px", // Increased from 1px to 2px for visibility
      backgroundColor: colors.pinnedDivider,
      boxShadow: "1px 0 3px rgba(0,0,0,0.1)", // Enhanced shadow
      zIndex: 10000, // Increased z-index to ensure it's on top
      pointerEvents: "none"
    },
    "& .MuiDataGrid-pinnedColumns--right::before, & .MuiDataGrid-pinnedColumnHeaders--right::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%", // Extended to full height
      width: "2px", // Increased from 1px to 2px for visibility
      backgroundColor: colors.pinnedDivider,
      boxShadow: "-1px 0 3px rgba(0,0,0,0.1)", // Enhanced shadow
      zIndex: 10000, // Increased z-index to ensure it's on top
      pointerEvents: "none"
    },
  },
  
  // SelectableList styles
  selectableList: {
    container: {
      padding: '8px 0',
    },
    divider: {
      height: '1px',
      backgroundColor: '#E0E0E0',
      margin: '7px 0 2px 0',
    },
    header: {
      height: '36px',
      padding: '0 16px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: '16px',
      textTransform: 'uppercase',
      color: '#616161',
    },
    item: {
      base: {
        minHeight: '36px',
        padding: '8px 16px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#212121',
        cursor: 'pointer',
      },
      selected: {
        borderLeft: `3px solid ${colors.teal.main}`,
        backgroundColor: colors.teal.light,
        fontWeight: 'bold',
      },
      unselected: {
        backgroundColor: 'white',
        fontWeight: 'normal',
        '&:hover': {
          backgroundColor: 'rgba(33,33,33,0.04)',
        },
      },
    },
  },
};

// Types for the component props
export interface FilterProps {
  active: boolean;
}

// Export color constants for use elsewhere
export { colors };